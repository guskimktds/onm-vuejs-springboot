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
        title="카메라 제품정보 LIST"
        class="px-5 py-3"
      >
      <!--//resPagingInfo.total_cnt -->
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="10" 
        class="elevation-1"
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
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="editedItem.cam_prod_id"
                                label="카메라 제품 ID"
                                counter
                                maxlength="20"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="editedItem.cam_prod_name"
                                label="카마레 제품명"
                            ></v-text-field>
                        </v-col>
                      </v-row>
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
        { text: '카메라 제품 ID', value: 'cam_prod_id' },
        { text: '카메라 제품명', value: 'cam_prod_name' },
        { text: '등록일', value: 'reg_date' },
      ],
      editedItem: {
        cam_type: 'C',
        cam_prod_id: '',
        cam_prod_name: '',
        chg_cam_prod_name: '',
        reg_date: '',
        mod_date:'',
        cmd_type: 'U',
      },
      defaultItem: {
        cam_type: 'C',
        cam_prod_id: '',
        cam_prod_name: '',
        chg_cam_prod_name: '',
        reg_date: '',
        mod_date:'',
        cmd_type: '',
      },
      newPlist: [],
      // last: 0,
      // options: {},
      // totalList: 0,
      // loading: true,
    }
  },
  computed: {
    formTitle () {
      return '카메라 제품정보 수정'
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
        this.editedItem.cmd_type = 'U'
        console.log('update Item value : ',this.editedItem)
        this.dialog = true
    },

    deleteItem (item) {
      console.log(this.gw_id)
      this.editedIndex = this.pList.indexOf(item)
      console.log('Delte Item Index : ',this.editedIndex)
      this.editedItem = Object.assign({}, item)
      this.editedItem.cmd_type = 'D'
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
        this.editItem.chg_cam_prod_name = this.editItem.cam_prod_name;
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