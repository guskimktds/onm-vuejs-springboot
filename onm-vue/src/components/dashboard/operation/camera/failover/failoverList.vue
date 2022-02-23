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
      title="Failover LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      > 
       <template v-slot:top>
            
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >

                <v-card>
                  <v-card-title>
                    <span class="headline">Thread 개수 설정</span>
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
                            v-model="editedItem.proc_name"
                            label="프로세스명"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                        
                          <v-text-field
                            v-model="editedItem.thread_count"
                            label="thread_count"
                          ></v-text-field>
                        </v-col>
                        <v-row>

                         <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.subscribe_start_idx"
                            label="스트리머 인덱스"
                            readonly
                          ></v-text-field>
                        </v-col>
                         <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.local_gw_id"
                            label="국사코드"
                            readonly
                          ></v-text-field>
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
    props: ['pList', 'resPagingInfo'],
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
            text: '스트리머 번호',
            sortable: false, value: 'streamer_idx',
          },
          { text: '프로세스 명', value: 'proc_name' },
          { text: 'Thread  개수', value: 'thread_count' },
          { text: '카메라 이름', value: 'reg_datetime' },
          { text: '등록일자', value: 'mod_datetime' },
          { text: '변경', value: 'actions', sortable: false}
        ],
        editedItem: {
          proc_name : '',
          thread_count : '',
          streamer_idx : '',
          local_gw_id: '',
          cmd_type: ''  
        },
      }
    },

methods: {
    handleClick: function(value){
      this.$emit("child", value);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    editItem (item) { 
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        // this.editedItem = Object.assign({}, item)
        this.editedItem.proc_name = this.pList[this.editedIndex].proc_name;
        this.editedItem.local_gw_id = this.pList[this.editedIndex].local_gw_id;
        this.editedItem.thread_count = this.pList[this.editedIndex].thread_count;
        this.editedItem.streamer_idx = this.pList[this.editedIndex].streamer_idx;
        this.editedItem.cmd_type = 'U';
        // 수정
  
        console.log('update Item value : ',this.editedItem)
        this.dialog = true
      },
      save () {
        if (this.editedIndex > -1) {
          var params = this.editedItem;
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15152/set_failover`

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
              })
        }else{
          alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
        }
        this.close()
      } ,
      deleteItem (item) {
        console.log(this.gw_id)
        // console.log('deleteItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        console.log('Delte Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 삭제
        this.editedItem.cmd_type = 'D'

        if(this.gw_id==''){
          delete this.editedItem.local_gw_id
        }else{
        this.editedItem.local_gw_id = this.gw_id    
        }

        this.dialogDelete = true
      },
      deleteItemConfirm () {

        if (this.editedIndex > -1) {
          var params = this.editedItem
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
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15152/set_failover`

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