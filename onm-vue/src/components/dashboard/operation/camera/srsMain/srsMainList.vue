<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="영상송출 메인정보 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      > 
       <template v-slot:top>
            
              <v-dialog
                v-model="dialog"
                max-width="40%"
              >

                <v-card>
                  <v-card-title>
                    <span class="headline">영상송출 메인정보 수정</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.srs_seq"
                            label="영상송출 일련번호"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                        
                          <v-text-field
                            v-model="editedItem.cam_id"
                            label="카메라 ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-row>
                         <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.target_stream_key"
                            label="스트림 키"
                            counter
                            maxlength="512"
                          ></v-text-field>
                        </v-col>
                         <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.target_stream_url"
                            label="스트림 url"
                            counter
                            maxlength="512"
                          ></v-text-field>
                        </v-col>
                        </v-row>
                         <v-row>
                         <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.srs_title"
                            label="송출제목"
                            counter
                            maxlength="512"
                          ></v-text-field>
                        </v-col>
                    <v-col cols="6">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.start_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                        </v-row>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      저장
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      취소
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">삭제 하시겠습니까?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </template>

       <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
       </template>                
      </v-data-table>
  </base-material-card>

  </v-container>
</template>

<script>
import axios from "axios"
export default {
    props: ['pList', 'resPagingInfo', 'gwNow'],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          {
            text: '영상송출 일련번호',
            sortable: false, value: 'srs_seq',
          },
          { text: '카메라 ID', value: 'cam_id' },
          { text: '사용자 ID', value: 'user_id' },
          { text: '송출지 스트림 키', value: 'target_stream_key' },
          { text: '송출지 스트림 url', value: 'target_stream_url' },
          { text: '입력영상 URL', value: 'input_stream_url' },
          { text: '관리코드', value: 'status_code' },
          { text: '카메라 상태코드', value: 'mgt_status' },
          { text: '송출지명', value: 'target_name' },
          { text: '송출제목', value: 'srs_title' },
          { text: '등록일시', value: 'reg_date' },
          { text: '송출 시작일시', value: 'start_date' },
          { text: '송출 종료일시', value: 'end_date' },
          { text: '수정일시', value: 'mod_date' },
          { text: '변경', value: 'actions', sortable: false}
        ],
        editedItem: {
          srs_seq : '',
          cam_id : '',
          target_stream_key : '',
          target_stream_url : '' ,
          srs_title : '',
          start_date : '',
          end_date : '',
          paging : false 
        },
        updatedItem : {
          srs_seq : '',
          cam_id : '',
          target_stream_key : '',
          target_stream_url : '',
          srs_title : '',
          start_date : '',
          end_date : ''
         }
      }
    },

methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    editItem (item) { 
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // this.editedItem.srs_seq = this.pList[this.editedIndex].srs_seq;
        // this.editedItem.cam_id = this.pList[this.editedIndex].cam_id;
        // this.editedItem.target_stream_key = this.pList[this.editedIndex].target_stream_key;
        // this.editedItem.target_stream_url = this.pList[this.editedIndex].target_stream_url;
        // this.editedItem.srs_title = this.pList[this.editedIndex].srs_title;
        // this.editedItem.start_date = this.pList[this.editedIndex].start_date;
        // this.editedItem.end_date = this.pList[this.editedIndex].end_date;
        // 수정
        console.log('update Item value : ',this.editedItem)
        this.dialog = true
      },
      handleDate(params){
        params
        params.start_date == null ? this.editedItem.start_date = '' : this.editedItem.start_date = params.start_date.replace(/-/g,"");
         params.end_date == null ? this.editedItem.end_date = '' : this.editedItem.end_date = params.end_date.replace(/-/g,"");
      },
      deletedItem(item){
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        // this.editedItem = Object.assign({}, item)
        this.editedItem.srs_seq = this.pList[this.editedIndex].srs_seq;
        this.editedItem.cam_id = this.pList[this.editedIndex].cam_id;
      },
      save () {
        if (this.editedIndex > -1) {
          let params = this.editedItem;
          this.handleDate(params);
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15155/update_srs_main_info`

            axios.post(url, params, this.$store.state.headers)
              .then((response) => {
                console.log(response)
                var resCode = response.data.res_code;
                  
                if(resCode == 200){
                  //현재 목록에서 선택한 item 을 변경해준다.
                  this.$emit('reset')
                }else{
                  alert("Error");
                }
              })
              .catch((ex) => {
                console.log('변경 실패',ex)
                this.$emit('reset')
              })
        }else{
          alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
        }
        this.close()
      } ,
      deleteItem (item) {
        console.log("++++++++++++++")
        // console.log('deleteItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        console.log('Delte Item Index : ',this.editedIndex)
        // this.editedItem = Object.assign({}, item)
        // 삭제

        // if(this.local_gw_id==''){
        //   delete this.editedItem.local_gw_id
        // }else{
        // this.editedItem.local_gw_id = this.local_gw_id    
        // }

        this.dialogDelete = true
      },
      deleteItemConfirm () {

        if (this.editedIndex > -1) {
          var params = this.deleteItem(this.editedItem)
          var deleteIndex = this.editedIndex

          this.$fire({
            title: "비밀번호를 입력해주세요.",
            input: 'password',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 20,
                autocapitalize: 'off',
                autocorrect: 'off'
              }
            }).then(result => {
               if(result.value){
                 console.log('보내는 파라미터')
                 console.log(params)
                  var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
                  var login = {
                    login_id: this.$store.state.onmUserId,
                    login_pwd: result.value
                  }
                  axios.post(url, login, this.$store.state.headers)
                    .then((response) => {
                      console.log(response)
                      var resCode = response.data.res_code;
                      if(resCode == 200){
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15156/delete_srs_main_info`

                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                console.log(response)
                                var resCode = response.data.res_code;
                                
                                if(resCode == 200){
                                  //현재 목록에서 선택한 Item을 삭제한다.
                                  this.pList.splice(deleteIndex, 1)
                                }else{
                                  alert("Error");
                                }
                              })
                              .catch((ex) => {
                                console.log('변경 실패',ex)
                              })
                      }else{
                        alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
                      }
                    })
                
               }else{
                alert('비밀번호를 입력해주세요.')
               }
            });
        
        }
        this.closeDelete() //다이얼로그를 닫는다.
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
    
</style>