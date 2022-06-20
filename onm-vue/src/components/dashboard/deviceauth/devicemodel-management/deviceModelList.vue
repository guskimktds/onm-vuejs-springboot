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
      title="단말모델 목록"
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
            <!-- <v-toolbar
              flat
            > -->
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
                                <v-col cols="12">
                                    <v-select 
                                    :items="devType"
                                    label="단말유형" 
                                    v-model="editedItem.term_type"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                               <v-text-field
                                    v-model="editedItem.model_name"
                                    label="모델명"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select 
                                    item-text="server_name" 
                                    :items="mfcList"
                                    label="제조사" 
                                    v-model="editedItem.mfc_id"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                <v-text-field
                                    v-model="editedItem.product_code"
                                    label="제품코드"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                <v-text-field
                                    v-model="editedItem.conn_id"
                                    label="CONN ID"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                <v-text-field
                                    v-model="editedItem.model_desc"
                                    label="참고사항"
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
            <!-- </v-toolbar> -->
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

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

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
            text: '단말모델',
            align: 'start',
            sortable: false,
            value: 'term_type',
          },
          { text: '모델명', value: 'model_name' },
          { text: '모델코드', value: 'model_code' },
          { text: '제품코드', value: 'product_code' },
          { text: 'CONN ID', value: 'conn_id' },
          { text: '제조사', value: 'mfc_id' },
        //   { text: '비고', value: 'use_yn' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          term_type: '',
          term_name: '',
          model_name: '',
          model_cd: '',
          mfc_id: '',
          model_desc: '',
          product_code: '',
          conn_id: '',
          reg_date:'',
          mod_date:''
        },
        defaultItem: {
          term_type: '',
          term_name: '',
          model_name: '',
          model_cd: '',
          mfc_id: '',
          model_desc: '',
          product_code: '',
          conn_id: '',
          reg_date:'',
          mod_date:''
        },
        newPlist: [],
        devType: [
                {text:'IP Camera', value:'Ip Camera'},
                {text:'GIB', value:'GIB'},
                {text:'IoT GW', value:'IoT GW'}
            ],
        mfcList: ["업체코드", "CELLINX", "Cisco", "DELL", "DWTE", "포티넷", "하나마이크론", "HAZON", "에이치디프로", 
                  "(주)HP", "Juniper", "머큐리", "노바투스", "펜타시큐리티", "Radware", "삼성전자", "유비쿼스", "비젼하이텍", "윈스"]
      }
    },
    computed: {
      formTitle () {
        return '신규장비 모델정보 수정'
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
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15007/set_code`
                            axios.post(url, params, headers)
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
                          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15007/set_code`
                          axios.post(url, params, headers)
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

}
</script>

<style scoped>
</style>>
