<template>
   <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="localCodeList"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
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
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    등록
                  </v-btn>
                </template>
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
                            v-model="editedItem.localgwid"
                            label="LOCAL_GW_ID"
                            
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="서버명"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.serverurl"
                            label="서버URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.socketurl"
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
                            v-model="editedItem.ecurl"
                            label="EC URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ldms"
                            label="LDMS URL"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.stmcnt"
                            label="STM 최대 수용 카메라 수"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.vacnt"
                            label="VA서버 최대 분석 채널 수"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.intcode"
                            label="INT 배포버전 코드"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.mqurl"
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
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
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

      </div>
      
    </v-app>
  </div>
</template>

<script>

import axios from "axios"
// import { eventBus } from '../../../../../main'
import EventBus from '../../../../../EventBus';

export default {
    props: ['localCodeList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Local_GW_ID',
            align: 'start',
            sortable: false,
            value: 'localgwid',
          },
          { 
            text: '서버명', 
            value: 'name',
          },
          { 
            text: '서버URL', 
            value: 'serverurl',
          },
          { 
            text: '웹소켓URL', 
            value: 'socketurl',
          },
          { text: '국사판단 패턴', value: 'pattern' },
          { text: 'EC서버 URL', value: 'ecurl' },
          { text: 'LDMS URL', value: 'ldms' },
          { text: 'STM 최대 수용 카메라 수', value: 'stmcnt' },
          { text: 'VA서버 최대 분석 채널 수', value: 'vacnt' },
          { text: 'INT 배포버전 코드', value: 'intcode' },
          { text: 'MQ URL', value: 'mqurl' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          localgwid: '',
          name: '',
          serverurl: '',
          socketurl: '',
          pattern: '',
          ecurl: '',
          ldms: '',
          stmcnt: 0,
          vacnt: 0,
          intcode: '',
          mqurl: '',
          editor: '82095586',
          editDate: '2021-01-06 10:20:30'
        },
        // defaultItem: {
        //   codeClass: '',
        //   code: '',
        //   name: '',
        //   type: '',
        //   useYn: '',
        //   orderby: '',
        //   desc: '',
        //   editor: '',
        //   editDate: '2021-01-06 10:20:30'
        // },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '등록' : '수정'
      },
    },
    methods: {
      editItem (item) {
        console.log('editItem method call : ',item)
        this.editedIndex = this.localCodeList.indexOf(item)
        console.log('editItem method call : ',this.editedIndex)
        this.editedItem = Object.assign({}, item)

        console.log('editItem method call : ',this.editedItem)

        this.dialog = true
      },

      deleteItem (item) {
        console.log('deleteItem method call : ',item)
        this.editedIndex = this.localCodeList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //서버 측 delete 처리
        const deleteItem = this.editedItem
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/delete`, deleteItem)
            .then((result) => {
              console.log(result)
              // this.list = JSON.parse(result.data.menu)
              // this.list = result.data
              this.localCodeList.splice(this.editedIndex, 1)
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })

        // this.localCodeList.splice(this.editedIndex, 1)
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
          const editedItem = this.editedItem
          console.log("111111111 : ", editedItem)
          EventBus.$emit('editedItem', editedItem, this.editedIndex)
          // update 
            // axios
            // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/update`, editedItem )
            // .then((result) => {
            //   console.log(result)
            //   // this.list = JSON.parse(result.data.menu)
            //   // this.list = result.data
            //   // Object.assign(this.localCodeList[this.editedIndex], this.editedItem)
            // })
            // .catch((ex) => {
            //   console.log('조회 실패',ex)
            // })
        } else {
          // this.desserts.push(this.editedItem)
          // create
          const createItem = this.editedItem
          console.log("2222222222222")
          EventBus.$emit('createItem', createItem)

          // axios
          //   .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`, createItem)
          //   .then((result) => {
          //     console.log(result)
          //     // this.list = JSON.parse(result.data.menu)
          //     // this.list = result.data
          //   })
          //   .catch((ex) => {
          //     console.log('조회 실패',ex)
          //   })

        }
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
