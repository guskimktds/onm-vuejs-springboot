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
      title="APP(Client) 단말 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
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
                    등록
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
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.app_version_id"
                            label="앱버전ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.os_type"
                            label="OS타입"
                            counter
                            maxlength="1"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.update_version"
                            label="업데이트 버전"
                            counter
                            maxlength="20"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.version_code"
                            label="버전코드"
                            counter
                            maxlength="4"
                            oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.download_url"
                            label="다운로드 URL"
                          ></v-text-field>
                        </v-col>
                       
                          <v-radio-group
                                    label="필수 업데이트"
                                    v-model="editedItem.required_yn"
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
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.title"
                            label="타이틀"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" sm="6" md="6"
                        >
                          <v-text-field
                            v-model="editedItem.content"
                            label="내용"
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
                      완료
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
       
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

import axios from "axios"
// import { eventBus } from '../../../../../main'

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    props: ['pList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          { text: '앱버전ID', align: 'start',
            sortable: false, value: 'app_version_id' },
          { text: 'OS타입', value: 'os_type'},
          { text: '업데이트버전', value: 'update_version'},
          { text: '버전코드', value: 'version_code'},
          { text: '다운로드URL', value: 'download_url' },
          { text: '필수업데이트', value: 'required_yn' },
          { text: '등록일시', value: 'reg_date' },
          { text: '수정일시', value: 'mod_date' },
          { text: '타이틀', value: 'title' },
          { text: '내용', value: 'content' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          appversion: '',
          ostype: '',
          updateversion: '',
          versioncode: '',
          downloadurl: '',
          updateyn: '',
          createDate: '',
          updateDate: '',
          title: '',
          content: '',
          editor: '82095586',
          editDate: '2021-01-06 10:20:30'
        },
        defaultItem: {
          appversion: '',
          ostype: '',
          updateversion: '',
          versioncode: '',
          downloadurl: '',
          updateyn: '',
          createDate: '',
          updateDate: '',
          title: '',
          content: '',
          editor: '82095586',
          editDate: '2021-01-06 10:20:30'
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '등록' : '수정'
      },
    },
    methods: {
      editItem (item) {
        console.log('editItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        console.log('editItem method call : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        this.editedItem.cmd_type = 'U'
        this.editedItem.local_gw_id = '0' 

        console.log('editItem method call : ',this.editedItem)

        this.dialog = true
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
        console.log('save method call : ',this.editedIndex)
        if (this.editedIndex > -1) {
          var params=this.editedItem
          var updateIndex=this.editedIndex
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
                          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15011/set_app_info`
                          axios.post(url,params,headers)
                            .then((response)=>{
                              var resCode=response.data.res_code;
                              var resMsg=response.data.res_msg;
                              if(resCode==200){
                                this.pList.splice(updateIndex,1,params)
                              }else{
                                alert(resCode+" / "+resMsg);
                              }
                            })
                            .catch((ex)=>{
                              console.log('변경 실패', ex)
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
    }

}
</script>

<style scoped>
</style>>
