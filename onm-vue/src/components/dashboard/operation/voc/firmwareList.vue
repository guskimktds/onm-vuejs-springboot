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
        title="단말 펌웨어 정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="fList"
        :options.sync="options"
        :server-items-length="fPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >

       <template v-slot:top>
                <v-dialog v-model="dialogUpdate" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">펌웨어 수정 페이지</v-card-title>
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
                              v-model="selectItems.firmware_version"
                              label="펌웨어 버전"
                              readonly
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="selectItems.chg_version"
                              label="수정할 펌웨어 버전"
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
        @click="updateItem(item)">
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
  props: ['fList','fPagingInfo'],
  data() {
    return {
      last:0,
      dialogDelete: false,
      dialogUpdate: false,
      deleteIndex: -1,
      updateIndex: -1,
      options:{},
      headers: [
        {
          text: "단말구분",
          align: "start",
          sortable: false,
          value: "dev_type",
        },
        { text: "제품코드", value: "product_code" },
        { text: "펌웨어 버전", value: "firmware_version" },
        { text: '  ', value: 'actions', sortable: false }
      ],
      tempItems: {},
      selectItems: {
          dev_type: '',
          product_code: '',
          firmware_version: '',
          chg_version: ''
        },
      defaultItem: {
          dev_type: '',
          product_code: '',
          firmware_version: '',
          chg_version: ''
        },
    };
  },
   methods:{
     getDataFromApi() {
      this.loading = true;
      this.$emit("subPagination", this.options);
    }, 
    updateItem (item) {
        this.updateIndex = this.fList.indexOf(item)
        this.tempItems = Object.assign({},item)
        this.selectItems.dev_type=this.tempItems.dev_type
        this.selectItems.product_code=this.tempItems.product_code
        this.selectItems.firmware_version=this.tempItems.firmware_version
        this.selectItems.chg_version=this.tempItems.chg_version
        this.selectItems.cmd_type='U'

        this.dialogUpdate = true
    },

    deleteItem (item) {
        this.deleteIndex = this.fList.indexOf(item)
        this.tempItems = Object.assign({},item)
        this.selectItems.dev_type=this.tempItems.dev_type
        this.selectItems.product_code=this.tempItems.product_code
        this.selectItems.firmware_version=this.tempItems.firmware_version
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
        

         var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15031/set_cam_firmware_info`

                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  console.log(response)
                                }else{
                                  console.log(response)
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
                        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15031/set_cam_firmware_info`
                            axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  //현재 목록에서 선택한 Item을 삭제한다.
                                  this.fList.splice(deleteCol, 1)
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
      if(this.last!==this.fPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.fPagingInfo.total_cnt!==undefined){
      this.last=this.fPagingInfo.total_cnt
      }
  },
}

</script>
<style>
</style>