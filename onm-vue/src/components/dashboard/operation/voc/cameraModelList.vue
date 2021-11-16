<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="카메라 모델 정보 조회 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="cmList"
        :options.sync="options"
        :server-items-length="cmPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >

      <template v-slot:top>
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
  props: ["cmList", "cmPagingInfo"],
  data() {
    return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      deleteIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "단말 구분",
          align: "start",
          sortable: false,
          value: "dev_type",
        },
        { text: "제품 코드", value: "product_code" },
        { text: "제조사명", value: "vender_name" },
        { text: "모델명", value: "model_name" },
        { text: "단말 접속 ID", value: "conn_id" },
        { text: "등록 일시", value: "reg_date" },
        { text: "수정 일시", value: "mod_date" },
        { text: '  ', value: 'actions', sortable: false }
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
    handleClick:function (value){
        this.$emit("child", value.product_code);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
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

    deleteItem (item) {
        this.deleteIndex = this.cmList.indexOf(item)
        console.log('Delte Item Index : ',this.editedIndex)
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
                                  this.cmList.splice(deleteCol, 1)
                                  
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
      if(this.last!==this.cmPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.cmPagingInfo.total_cnt!==undefined){
      this.last=this.cmPagingInfo.total_cnt
      }
  },
};
</script>
<style>
</style>