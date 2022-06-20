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
        title="단말인증결과 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt" 
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[10,20,50,100]}"
        :header-props="{ sortIcon: null }"
        v-show="showAuth()"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        { text: '인증일시', value: 'auth_date', sortable: true },
        { text: '청약SAID', value: 'said' },
        { text: '회선SAID', value: 'psaid' },
        { text: '장비타입', value: 'termalias' },
        { text: '바코드', value: 'termbarcode' },
        { text: '단말MAC', value: 'mac_id' },
        { text: 'IP', value: 'ip_addr' },
        { text: '제조사', value: 'mfcname' },
        { text: '모델명', value: 'modelname' },
        { text: '인증결과', value: 'termauthcode' },
        { text: '상세메세지', value: 'detail_msg', sortable: false }
      ],
    }
  },
  computed: {
    formTitle () {
      return '단말인증결과 조회'
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
      this.editedItem.cmd_type = 'U';
      this.editedItem.cam_type = 'C';
      this.editedItem.chg_cam_prod_name = this.editedItem.cam_prod_name;
      console.log('=======chg_cam_prod_name=======',this.editedItem.chg_cam_prod_name);
      console.log('update Item value : ',this.editedItem)
      this.dialog = true
    },

    deleteItem (item) {
      console.log(this.gw_id)
      this.editedIndex = this.pList.indexOf(item)
      console.log('Delte Item Index : ',this.editedIndex)
      this.editedItem = Object.assign({}, item)
      this.editedItem.cmd_type = 'D'
      this.editedItem.cam_type = 'C'
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
                axios
                  .post(url, login, this.$store.state.headers)
                  .then((response) => {
                    console.log(response)
                    var resCode = response.data.res_code;
                    if(resCode == 200){
                      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15033/set_cam_prod_info`
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

    save () {
      if (this.editedIndex > -1) {
        // this.editItem.chg_cam_prod_name = this.editItem.cam_prod_name;
        // console.log('chg_cam_prod_name' + this.editItem.chg_cam_prod_name);
        this.editItem.cmd_type = 'C'
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
                      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15033/set_cam_prod_info`

                      axios
                        .post(url, params, this.$store.state.headers)
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

<style>

</style>