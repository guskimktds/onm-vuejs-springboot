<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="카메라 정보 조회 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="dcList"
        :options.sync="options"
        :server-items-length="dcPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      
      <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
      </template>
      <template v-slot:item.mgt_status="{item}">
              <span>{{ switchString2(item.mgt_status) }}</span>
      </template>
      <template v-slot:item.save_method="{item}">
              <span>{{ switchString3(item.save_method) }}</span>
      </template>

      <template v-slot:top>
        <v-dialog v-model="dialogSend" max-width="500px">
          <v-card>
            <v-card-title>유튜브 영상 송출 정보 등록</v-card-title>
                <v-card-text>
                    <v-container>
                      <v-row>
                         <v-col cols="6">
                          <v-text-field
                            v-model="selectItems.user_id"
                            label="사용자 ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="selectItems.cam_id"
                            label="카메라 ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="editedItem.target_stream_key"
                            label="스트림 키"
                            counter
                            maxlength="512"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="editedItem.target_stream_url"
                            label="스트림 URL"
                            counter
                            maxlength="512"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.srs_title"
                            label="송출제목"
                            counter
                            maxlength="200"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
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

      <template v-slot:item.send="{ item }">
              <v-icon
                small
                @click="sendItem(item)"
              >
                mdi-send
              </v-icon>
      </template>

      <template v-slot:item.delete="{ item }">
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
  props: ["dcList", "dcPagingInfo"],
  data() {
    return {
      last: 0,
      dialog: false,
      editedItem: {
        user_id: '',
        cam_id: '',
        target_stream_key: '',
        target_stream_url : '',
        srs_title : '',
        start_date: '',
        end_date : '',
        paging : false },
      dialogDelete: false,
      dialogSend:false,
      deleteIndex: -1,
      sendIndex:-1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        { text: "카메라 ID", value: "cam_id", align: "start", sortable: false,},
        { text: "카메라 IP", value: "cam_ip" },
        { text: "카메라명", value: "cam_name" },
        { text: "MAC ID", value: "mac_id" },
        { text: "모델명", value: "model_name" },
        { text: "펌웨어 버전 정보", value: "firmware" },
        { text: "제조사", value: "vendor" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "관리상태코드", value: "mgt_status" },
        { text: "해상도", value: "resolution" },
        { text: "카메라 수정일자", value: "mod_date" },
        { text: "개통일", value: "open_date" },
        { text: "영상저장방식", value: "save_method" },
        { text: '삭제', value: 'delete', sortable: false },
        { text: '유튜브 송출 등록', value: 'send', sortable: false }
      ],
      saidItem:{
        said: ''
      },
      tempItems:{},
      selectItems: {
          cam_id: '',    
          user_id: ''
        },
      defaultItem: {
          cam_id: '',    
          user_id: ''
        },
      settingItems:{
        said:'',
        mac_id:'',
        mgt_status:''
      }
    };
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='A'){
        return '접수'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='F'){
        return '실패'
      }else if(values==='P'){
        return '진행중'
      }else if(values==='S'){
        return '성공'
      }else if(values==='Z'){
        return '카메라 장애'
      }
    },
    switchString2(values){
      if(values==='S'){
        return '정상'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='X'){
        return '삭제대기'
      }else if(values==='A'){
        return '등록'
      }
    },
    switchString3(values){
      if(values==='A'){
        return '상시'
      }else if(values==='E'){
        return '스마트'
      }else{
        return '-'
      }
    },

    setUserId(param){
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15029/get_said`
      this.saidItem.user_id=param
      axios.post(url,this.saidItem, this.$store.state.headers)
        .then((response) => {
           console.log('SAID')
           console.log(response)
           var resCode = response.data.res_code;
           var resMsg = response.data.res_msg;

            if(resCode == 200){
               this.settingItems.said=response.data.data.said
               this.settingItems.mac_id=this.tempItems.mac_id
               this.settingItems.mgt_status=this.tempItems.mgt_status
               console.log('said응답')
                console.log(this.settingItems)
                var setUrl =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15026/update_delete_cam`
                                  var setParam = this.settingItems
                                  console.log('보정 파라미터')
                                  console.log(setParam)

                                  axios.post(setUrl, setParam, this.$store.state.headers)
                                    .then((setResponse) => {
                                      console.log(setResponse)
                                      var resCode = setResponse.data.res_code;
                                      var resMsg = setResponse.data.res_msg;
                           if(resCode == 200){
                               console.log(resCode+resMsg);
                           }else{
                           console.log(resCode+resMsg);
                     }
                 })
               }else{
                 console.log(resCode+resMsg);
                  }
                })
    },
    
    sendItem(item){
        this.sendIndex = this.dcList.indexOf(item)
        console.log('Send Item Index : ',this.sendIndex)
        this.editedItem = Object.assign({},item)
        this.selectItems.user_id=this.editedItem.user_id
        this.selectItems.cam_id=this.editedItem.cam_id

        this.dialogSend = true
    },

    deleteItem (item) {
        this.deleteIndex = this.dcList.indexOf(item)
        console.log('Delte Item Index : ',this.deleteIndex)
        this.tempItems = Object.assign({},item)
        this.selectItems.user_id=this.tempItems.user_id
        this.selectItems.cam_id=this.tempItems.cam_id

        this.dialogDelete = true
    },

    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.selectItems = Object.assign({}, this.defaultItem)
          this.deleteIndex = -1
        })
    },

    save(){
       console.log(this.editedItem)
      if (this.sendIndex > -1) {
          let params = this.editedItem;
          this.handleDate(params);
          const url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15154/set_srs_main_info`
            axios.post(url, params, this.$store.state.headers)
              .then((response) => {
                console.log(response)
                var resCode = response.data.res_code;
                  
                if(resCode == 200){
                  console.log('성공!')
                  this.$router.push('srs-main')
                }else{
                  alert("Error");
                }
              })
              .catch((ex) => {
                console.log('변경 실패',ex)
              })
            }
        this.close()
    },

    handleDate(params){
        params.start_date == null ? this.editedItem.start_date = '' : this.editedItem.start_date = params.start_date.replace(/-/g,"").substr(0,8);
         params.end_date == null ? this.editedItem.end_date = '' : this.editedItem.end_date = params.end_date.replace(/-/g,"").substr(0,8);
      },

    deleteItemConfirm () {
        if (this.deleteIndex > -1) {
          var params = this.selectItems
          var deleteCol = this.deleteIndex
          console.log(this.tempItems)
        
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
            }).then(result=>{
              if(result.value){
                var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
                var login = {
                    login_id: this.$store.state.onmUserId,
                    login_pwd: result.value
                  }
                  console.log(login)
                  axios.post(url, login, this.$store.state.headers)
                    .then((response) => {
                      console.log(response)
                      var resCode = response.data.res_code;

                      if(resCode == 200){
                        console.log('테스트')
                        console.log(this.tempItems.user_id)
                        this.setUserId(this.tempItems.user_id)

                        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15022/delete_cam`
                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                
                                console.log('응답코드'+resCode)
                                if(resCode == 200){
                                  //현재 목록에서 선택한 Item을 삭제한다.
                                  this.dcList.splice(deleteCol, 1)
                                  
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
                console.log('취소')
              }
            })
        
        }
        this.closeDelete() //다이얼로그를 닫는다.
      },
      close () {
        this.dialogSend= false
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
      if(this.last!==this.dcPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dcPagingInfo.total_cnt!==undefined){
      this.last=this.dcPagingInfo.total_cnt
      }
  },
};
</script>
<style>
</style>