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
        @click:row="handleClick" item-key="product_code" single-select
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
       <template v-slot:top>
                <v-dialog v-model="dialogUpdate" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">카메라 모델 수정 페이지</v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="selectItems.dev_type"
                              label="제품타입"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="selectItems.product_code"
                              label="제품코드"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="selectItems.vendor_name"
                              label="제조사명"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="selectItems.model_name"
                              label="모델명"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="selectItems.conn_id"
                              label="단말접속ID"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeUpdate">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="updateItemConfirm">OK</v-btn>
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
              @click="updateItem(item)"
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
  props: ["cmList", "cmPagingInfo"],
  data() {
    return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      dialogUpdate: false,
      deleteIndex: -1,
      updateIndex: -1,
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
        { text: "제조사명", value: "vendor_name" },
        { text: "모델명", value: "model_name" },
        { text: "단말 접속 ID", value: "conn_id" },
        { text: "등록 일시", value: "reg_date" },
        { text: "수정 일시", value: "mod_date" },
        { text: '  ', value: 'actions', sortable: false }
      ],
      tempItems: {},
      selectItems: {
          dev_type: '',
          product_code: '',
          vendor_name: '',
          model_name: '',
          conn_id:'',
          cmd_type:''
        },
      defaultItem: {
          dev_type: '',
          product_code: '',
          vendor_name: '',
          model_name: '',
          conn_id:'',
          cmd_type:''
        },
        selectId:-1
    };
  },
  methods: {
    handleClick:function (value, row){
        row.select(true);
        this.$emit("child", value);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    }, 
    updateItem (item) {
        this.updateIndex = this.cmList.indexOf(item)
        this.tempItems = Object.assign({},item)
        this.selectItems.dev_type=this.tempItems.dev_type
        this.selectItems.product_code=this.tempItems.product_code
        this.selectItems.vendor_name=this.tempItems.vendor_name
        this.selectItems.model_name=this.tempItems.model_name
        this.selectItems.conn_id=this.tempItems.conn_id
        this.selectItems.cmd_type='U'

        this.dialogUpdate = true
    },

    deleteItem (item) {
        this.deleteIndex = this.cmList.indexOf(item)
        this.tempItems = Object.assign({},item)
        this.selectItems.dev_type=this.tempItems.dev_type
        this.selectItems.product_code=this.tempItems.product_code
        this.selectItems.vendor_name=this.tempItems.vendor_name
        this.selectItems.model_name=this.tempItems.model_name
        this.selectItems.conn_id=this.tempItems.conn_id
        this.selectItems.cmd_type='D'

        this.dialogDelete = true
    },

    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.selectItems = Object.assign({}, this.defaultItem)
          this.deleteIndex = -1
        })
    },

    closeUpdate () {
        this.dialogUpdate = false
        this.$nextTick(() => {
          this.selectItems = Object.assign({}, this.defaultItem)
          this.updateIndex = -1
        })
    },

    updateItemConfirm (){ 
      if(this.updateIndex>-1){
        var params = this.selectItems
        

         var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15041/set_cam_model_info`

                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  console.log(response)
                                }else{
                                  console.log("Error");
                                }
                              })
                              .catch((ex) => {
                                console.log('변경 실패',ex)
                              })
                      }else{
                        alert('요청 중 에러가 발생하였습니다.');
                      }
      this.closeUpdate()
      this.$emit('reset')
    },

    deleteItemConfirm () {
        if (this.deleteIndex > -1) {
          var params = this.selectItems
          var deleteCol = this.deleteIndex
        
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

                  axios.post(url, login, this.$store.state.headers)
                    .then((response) => {
                      console.log(response)
                      var resCode = response.data.res_code;

                      if(resCode == 200){
                        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15041/set_cam_model_info`
                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  //현재 목록에서 선택한 Item을 삭제한다.
                                  this.cmList.splice(deleteCol, 1)
                                }else{
                                  console.log("Error");
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
tr.v-data-table__selected {
  background: #616161 !important;
}
</style>