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
            title="단말 인증 정보 조회 LIST"
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
import dateInfo from '../../../utils/common'
import axios from "axios"
export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        last: 0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
        headers: [
          {
            text: '매장ID',
            align: 'start',
            sortable: false,
            value: 'user_id',
          },
          { text: '카메라 ID', value: 'cam_id' },
          { text: '카메라 IP', value: 'cam_ip' },
          { text: '카메라명', value: 'cam_name' },
          { text: 'MAC ID', value: 'mac_id' },
          { text: '모델명', value: 'model_name' },
          { text: '펌웨어 버전 정보', value: 'perm_version' },
          { text: '제조사', value: 'company' },
          { text: '서비스 상태 코드', value: 'status_code' },
          { text: '관리상태 코드', value: 'reco_code' },
          { text: '해상도', value: 'visible' },
          { text: '카메라 수정일자', value: 'mod_date' },
          { text: '개통일', value: 'reg_date' },
          { text: '해지일', value: 'cancel_date' },
        ],
        editedItem: {
          cam_id: '',
          cam_ip: '',
          cam_name: '',
          mac_id: '',
          model_name: '',
        },
        defaultItem: {
          cam_id: '',
          cam_ip: '',
          cam_name: '',
          mac_id: '',
          model_name: '',
        },
        newPlist: []
      }
    },

    methods: {
      getDataFromApi(){
        this.$emit("pagination",this.options)
      },

      deleteItem (item) {
        // console.log('deleteItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        console.log('Delte Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 삭제
        this.editedItem.cmd_type = 'D'
        this.editedItem.mod_date = dateInfo().current
        this.editedItem.modifier = this.$store.state.onm_user_id
        delete this.editedItem.accept_ip
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedIndex > -1) {
          var params = this.editedItem
          var deleteIndex = this.editedIndex
          console.log(params)
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
                  console.log(params.login_id)
                  axios.post(url, login, this.$store.state.headers)
                    .then((response) => {
                      console.log(response)
                      var resCode = response.data.res_code;
                      if(resCode == 200){
                        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

                            axios.post(url, params, this.$store.state.headers)
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
                      }else{
                        alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
                      }
                    })
              }else{
                alert('비밀번호를 입력해주세요.')
              }
            })
        
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