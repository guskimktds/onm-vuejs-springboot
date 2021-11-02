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
      title="코드 마스터 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
          v-show="showAuth()"
        >
          <template v-slot:top>
            
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <!-- <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    등록2
                  </v-btn>
                </template> -->
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
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
                            v-model="gw_id"
                            label="국사코드"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.code_master_id"
                            label="코드구분"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.code_master_name"
                            label="코드구분명"
                          ></v-text-field>
                        </v-col>
                        
                     
                         <v-radio-group
                                    label="사용여부"
                                    v-model="editedItem.use_yn"
                                    row>
                                    <v-radio
                                    label="Y"
                                    value="Y"
                                    ></v-radio>
                                    <v-radio
                                    label="N"
                                    value="N">
                                    </v-radio>
                        </v-radio-group>
                                            
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.description"
                            label="설명"
                          ></v-text-field>
                        </v-col>
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
// import { eventBus } from '../../../../../main'
// import EventBus from '../../../../../EventBus';

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
    props: ['pList','resPagingInfo','gw_id'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
        headers: [
          {
            text: '코드구분',
            align: 'start',
            sortable: false,
            value: 'code_master_id',
          },
          { text: '구분코드명', value: 'code_master_name' },
          { text: '설명', value: 'description' },
          { text: '사용여부', value: 'use_yn' },
          // { text: '등록일시', value: 'reg_date' },
          { text: '수정일', value: 'mod_date' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          code_master_id: '',
          code_master_name: '',
          description: '',
          use_yn: '',
          cmd_type: 'U',
          local_gw_id: '0',
          reg_date:'',
          mod_date:''
        },
        defaultItem: {
          code_master_id: '',
          code_master_name: '',
          description: '',
          use_yn: '',
          cmd_type: '',
          local_gw_id: '0',
          reg_date:'',
          mod_date:''
        },
        newPlist: []
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '등록' : '수정'
      },
    },
    methods: {
      getDataFromApi(){
        this.$emit("pagination",this.options)
      },
      showAuth(){
        var auth=this.$store.state.authGroupId
        if(auth=='G100'){
          return true;
        }else{
          alert('접근권한이 없습니다.')
          return false;
        }
      },
      editItem (item) { 
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 수정
        this.editedItem.cmd_type = 'U'
        
        if(this.gw_id==''){
          delete this.editedItem.local_gw_id
        }else{
        this.editedItem.local_gw_id = this.gw_id    
        }

        // this.editedItem.mod_date = getDate 
        // this.editedItem.reg_date = getDate     

        console.log('update Item value : ',this.editedItem)

        this.dialog = true
      },

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
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15016/set_code_master`

                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                console.log(response)
                                var resCode = response.data.res_code;
                                var resMsg = response.data.res_msg;
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

      save () {
        if (this.editedIndex > -1) {
          var params = this.editedItem
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
                          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15016/set_code_master`

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
                    })
                
               }else{
                alert('비밀번호를 입력해주세요.')
               }
            });
         
        } 
        this.close()
      }

          // saveToData: function(){
    //   console.log('saveToData Method call : ',process.env);
    //   axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone/query`, {       
    //               params
    //         })
    //         .then((result) => {
    //           console.log(result)
    //           // this.list = JSON.parse(result.data.menu)
    //           this.list = result.data
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    },
    watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },


}
</script>

<style scoped>
</style>>
