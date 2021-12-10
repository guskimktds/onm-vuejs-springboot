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
      title="서비스 공지 목록"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
          v-show="showAuth()"
        >
        <template v-slot:item.board_cate_cd="{item}">
          <span>{{ switchString(item.board_cate_cd) }}</span>
        </template>
        <template v-slot:item.pop_up_yn="{item}">
          <span>{{ switchString2(item.pop_up_yn) }}</span>
        </template>
          <template v-slot:top>    
            <!-- <v-toolbar
              flat
            > -->
              <v-dialog
                v-model="dialog"
                max-width="70%"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.board_id"
                            label="게시판"
                          ></v-text-field>
                        </v-col>
                            <v-row>
                                                <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.title"
                            label="제목"
                          ></v-text-field>
                        </v-col>
                            </v-row>
                                                         <v-row>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.disp_start_date"
                        label="노출기간 시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.disp_start_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        label="종료일"
                        v-model="editedItem.disp_end_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    
                    <v-date-picker v-model="editedItem.disp_end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col>
                   <v-select 
                  item-text="state" 
                  item-value="abbr" 
                  :items="osType"
                  label="OS 타입" 
                  v-model="editedItem.os_type"
                  ></v-select>
                </v-col>
                                    </v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-radio-group
                                    label="공지사항 노출 여부(Y/N)"
                                    v-model="editedItem.disp_yn"
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
                        </v-col>
                      <v-row>
                        <v-col
                          cols="6">
                          <vue-editor
                            v-model="editedItem.content_html"
                          ></vue-editor>
                        </v-col>
                         <v-col cols="6"
                        >
                          <v-textarea
                            outlined
                            v-model="editedItem.content"
                            label="공지사항 내용 html"
                          ></v-textarea>
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
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from 'quill-image-drop-module'

Quill.register('modules/imageDrop', ImageDrop)
// import vueEditor from '../../../utils/vueEditor.vue'
// import { eventBus } from '../../../../../main'
// import EventBus from '../../../../../EventBus';

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: { VueEditor },
    props: ['pList','resPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
        headers: [
           { text: '게시판 id', value: 'board_id' },
          { text: '공지사항 타입', value: 'board_cate_cd' },
          { text: '제목', value: 'title' },
          { text: '공지사항 노출 유무', value: 'pop_up_yn'},
          { text: '등록일자', value: 'reg_date' },
          { text: '수정일자', value: 'mod_date' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          boarrd_id: '',
           disp_start_date :'',
           disp_end_date : '',
          disp_yn: '',
          title: '',
          content: '',
          content_html: '',
          os_type:''
        },
        defaultItem: {
          boarrd_id: '',
          disp_start_date: '',
          disp_end_date: '',
          disp_yn: '',
          title: '',
          content: '',
          content_html: '',
           os_type:''
        },
        newPlist: [],
         osType:[
              {state: 'All'     , abbr: 'ALL'},
              {state: 'Android'     , abbr: 'Android'},
              {state: 'iOS'     , abbr: 'iOS'},
              {state: 'PC'     , abbr: 'PC'},
              {state: 'PCAPP'     , abbr: 'PCAPP'},
            ],
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '등록' : '수정'
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
      switchString(values){
        if(values==='CATE01'){
          return '일반공지'
        }else if(values==='CATE02'){
          return '긴급공지'
        }else{
          return ''
        }
      },
      switchString2(values){
        if(values==='Y'){
          return '노출'
        }else if(values==='N'){
          return '미노출'
        }else{
          return ''
        }
      },

      editItem (item) {  
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 수정
        // if(this.gw_id==''){
        //   delete this.editedItem.local_gw_id
        // }else{
        // this.editedItem.local_gw_id = this.gw_id    
        // }

      this.editedItem.disp_start_date = this.editedItem.disp_start_date.substring(0,10)
      this.editedItem.disp_end_date = this.editedItem.disp_end_date.substring(0,10)
        console.log('update Item value : ',this.editedItem)

        this.dialog = true
      },

      deleteItem (item) {
        // console.log('deleteItem method call : ',item)
        this.editedIndex = this.pList.indexOf(item)
        console.log('Delte Item Index : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)
        // 삭제
         if(this.gw_id==''){
          delete this.editedItem.local_gw_id
        }else{
        this.editedItem.local_gw_id = this.gw_id    
        }
        this.dialogDelete = true
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
          var params = {
            board_id : this.editedItem.board_id,
            disp_start_date : this.editedItem.disp_start_date,
            disp_end_date : this.editedItem.disp_end_date,
            disp_yn : this.editedItem.disp_yn,
            title : this.editedItem.title,
            content : this.editedItem.content,
            content_html : this.editedItem.content_html,
             os_type : this.editedItem.os_type
          }
          var reqParams = params
          reqParams.disp_end_date = params.disp_end_date.replace(/-/g,"").split(' ', 1)[0]
          reqParams.disp_start_date = params.disp_start_date.replace(/-/g,"").split(' ', 1)[0]
          // repParams.disp_end_date = repParams.disp_end_date.split
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
                          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15133/update_notice`
                          axios.post(url, params, headers)
                            .then((response) => {
                              console.log(response)
                              var resCode = response.data.res_code;
                              var resMsg = response.data.res_msg;
                              if(resCode == 200){
                                //현재 목록에서 선택한 item 을 변경해준다.
                                this.$emit('reset')
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
            });
        } 
        this.close()
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
                  axios.post(url, login, this.$store.state.headers)
                    .then((response) => {
                      console.log(response)
                      var resCode = response.data.res_code;
                      if(resCode == 200){
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15134/delete_notice`
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

<style scoped>
</style>>
