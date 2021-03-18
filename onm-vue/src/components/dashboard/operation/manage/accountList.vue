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
            title="계정 정보 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-1"
                :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
            >      
              <template v-slot:top>
              
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >

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
                              v-model="editedItem.onm_user_id"
                              label="계정(사번)"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.auth_group_id"
                              label="권한그룹ID"
                              counter
                              maxlength="4"
                            ></v-text-field>
                          </v-col>
                          
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.accept_ip"
                              label="접속IP"
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
            text: '사번',
            align: 'start',
            sortable: false,
            value: 'onm_user_id',
          },
          // { 
          //   text: '이름', 
          //   value: 'name',
          // },
          { text: '접속IP', value: 'accept_ip' },
          { text: '권한그룹ID', value: 'auth_group_id' },
          { text: '권한그룹명', value: 'auth_group_name' },
          { text: '생성일', value: 'reg_date' },
          { text: '수정일', value: 'mod_date' },
          { text: '생성자', value: 'reg_user' },
          // { text: '수정자', value: 'modifier' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          onm_user_id: '',    
          accept_ip: '',
          auth_group_id: '',
          cmd_type: 'U',
          reg_date: '',
          mod_date: '',
          reg_user:'',
          modifier:''
        },
        defaultItem: {
          onm_user_id: '',     
          accept_ip: '',
          auth_group_id: '',
          cmd_type: '',
          reg_date: '',
          mod_date: '',
          reg_user:'',
          modifier:''
        },
        newPlist: []
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '등록' : '계정수정'
      },
    },
    methods: {
      getDataFromApi(){
        this.$emit("pagination",this.options)
      },
      editItem (item) {
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 수정
        this.editedItem.cmd_type = 'U'
        this.editedItem.mod_date = dateInfo().current
        this.editedItem.modifier = this.$store.state.onm_user_id
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
        this.editedItem.mod_date = dateInfo().current
        this.editedItem.modifier = this.$store.state.onm_user_id
        delete this.editedItem.accept_ip
        this.dialogDelete = true
      },

      deleteItemConfirm () {

        if (this.editedIndex > -1) {

          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

          // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
          var params = this.editedItem
          var deleteIndex = this.editedIndex
          console.log(params)

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
        console.log('save method call : ',this.editedIndex)
        if (this.editedIndex > -1) {
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

          // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
          var params = this.editedItem
          var reqParams=this.changeIp(params)
          var updateIndex = this.editedIndex
          console.log(updateIndex)
          console.log(params)

          axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                //현재 목록에서 선택한 item 을 변경해준다.
                this.pList.splice(updateIndex, 1, params)
              }else{
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('변경 실패',ex)
            })
        } 
        this.close()
      },
      changeIp(values){
            let newParams={}
            newParams.onm_user_id=values.onm_user_id
            newParams.auth_group_id=values.auth_group_id
            newParams.cmd_type=values.cmd_type
            newParams.accept_ip=values.accept_ip.replace(" ", "").split(',')

            return newParams
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

  mounted() {
    this.getDataFromApi();
  },
}
</script>

<style>

</style>