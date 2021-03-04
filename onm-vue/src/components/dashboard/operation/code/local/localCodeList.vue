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
      title="로컬 국사 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        >
          <template v-slot:top>
            <!-- <v-toolbar
              flat
            > -->
              <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
              <!-- <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider> -->
              <!-- <v-spacer></v-spacer> -->
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
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.local_gw_id"
                            label="LOCAL_GW_ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.server_name"
                            label="서버명"
                            counter
                            maxlength="50"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.server_url"
                            label="서버URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ws_url"
                            label="웹소켓URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.pattern"
                            label="국사판단패턴"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ec_url"
                            label="EC URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ldms_url"
                            label="LDMS URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.max_cam_cnt"
                            label="STM 최대 수용 카메라 수"
                            counter
                            maxlength="4"
                            oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.max_va_cnt"
                            label="VA서버 최대 분석 채널 수"
                            counter
                            maxlength="4"
                            oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.version_code"
                            label="INT 배포버전 코드"
                            counter
                            maxlength="4"
                            oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.mq_url"
                            label="MQ URL"
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

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
    props: ['pList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '국사코드',
            align: 'start',
            sortable: false,
            value: 'local_gw_id',
          },
          { text: '서버명', value: 'server_name' },
          { text: '서버URL', value: 'server_url' },
          { text: '웹소켓URL', value: 'ws_url' },
          { text: '국사판단 패턴', value: 'pattern' },
          { text: 'EC서버 URL', value: 'ec_url' },
          { text: 'LDMS URL', value: 'ldms_url' },
          { text: 'STM 최대 수용 카메라 수', value: 'max_cam_cnt' },
          { text: 'VA서버 최대 분석 채널 수', value: 'max_va_cnt' },
          { text: 'INT 배포버전 코드', value: 'version_code' },
          { text: 'MQ URL', value: 'mq_url' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          local_gw_id: '',
          server_name: '',
          server_url: '',
          ws_url: '',
          pattern: '',
          ec_url: '',
          ldms_url: '',
          max_cam_cnt: 0,
          max_va_cnt: 0,
          version_code: '',
          mq_url: '',
          cmd_type:''
        },
        defaultItem: {
          local_gw_id: '',
          server_name: '',
          server_url: '',
          ws_url: '',
          pattern: '',
          ec_url: '',
          ldms_url: '',
          max_cam_cnt: 0,
          max_va_cnt: 0,
          version_code: '',
          mq_url: '',
          cmd_type:''
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
      editItem (item) {
        this.editedIndex = this.pList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // 수정
        this.editedItem.cmd_type = 'U'
      

        this.dialog = true
      },

      deleteItem (item) {
        console.log('deleteItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // 삭제
        this.editedItem.cmd_type = 'D'
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedIndex > -1) {
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15009/set_local_gw`

          // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
          var params = this.editedItem
          var deleteIndex = this.editedIndex
          console.log('삭제값')
          console.log(params)
          var headers = this.$store.state.headers
          console.log(headers)
          axios.post(url, params, headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                //현재 목록에서 선택한 Item을 삭제한다.
                this.pList.splice(deleteIndex, 1)
              }else{
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('변경 실패',ex)
            })

        // this.pList.splice(this.editedIndex, 1)
        }
        this.closeDelete()
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
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)

          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15009/set_local_gw`
          var params=this.editedItem
          var updateIndex=this.editedIndex

          console.log('파람 '+params.local_gw_id+'업데이트 인덱스'+updateIndex)
          
          axios.post(url,params,this.$store.state.headers)
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
        }
     
        //   // update 
        //     // axios
        //     // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/update`, editedItem )
        //     // .then((result) => {
        //     //   console.log(result)
        //     //   // this.list = JSON.parse(result.data.menu)
        //     //   // this.list = result.data
        //     //   // Object.assign(this.pList[this.editedIndex], this.editedItem)
        //     // })
        //     // .catch((ex) => {
        //     //   console.log('조회 실패',ex)
        //     // })
        // } else {
        //   // this.desserts.push(this.editedItem)
        //   // create
        //   const createItem = this.editedItem
        //   console.log("2222222222222")
        //   EventBus.$emit('createItem', createItem)

        //   // axios
        //   //   .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`, createItem)
        //   //   .then((result) => {
        //   //     console.log(result)
        //   //     // this.list = JSON.parse(result.data.menu)
        //   //     // this.list = result.data
        //   //   })
        //   //   .catch((ex) => {
        //   //     console.log('조회 실패',ex)
        //   //   })

        // }
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
