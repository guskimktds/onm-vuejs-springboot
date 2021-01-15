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
      title="고객이전 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="codeList"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- <v-toolbar
              flat
            > -->
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
                <!-- <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    고객이전 실행
                  </v-btn>
                </template> -->

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
                            v-model="editedItem.codeClass"
                            label="코드구분"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.code"
                            label="코드"
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
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
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
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

import EventBus from '../../../../EventBus';

export default {
    props: ['codeList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '코드구분',
            align: 'start',
            sortable: false,
            value: 'codeClass',
          },
          { 
            text: '코드', 
            value: 'code',
          },
          { 
            text: '코드명', 
            value: 'name',
          },
          { text: '타입', value: 'type' },
          { text: '설명', value: 'desc' },
          { text: '정렬', value: 'orderby' },
          { text: '사용여부', value: 'useYn' },
          { text: '등록일시', value: 'createDate' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        editedItem: {
          codeClass: '',
          code: '',
          name: '',
          type: '',
          useYn: '',
          orderby: '',
          desc: '',
          editor: '82095586',
          editDate: '2021-01-06 10:20:30'
        },
        defaultItem: {
          codeClass: '',
          code: '',
          name: '',
          type: '',
          useYn: '',
          orderby: '',
          desc: '',
          editor: '82095586',
          editDate: '2021-01-06 10:20:30'
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '고객이전' : '수정'
      },
    },
    methods: {
      

      // deleteItem (item) {
      //   console.log('deleteItem method call : ',item)
      //   this.editedIndex = this.codeList.indexOf(item)
      //   this.editedItem = Object.assign({}, item)
      //   this.dialogDelete = true
      // },

      deleteItemConfirm () {
        this.codeList.splice(this.editedIndex, 1)
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
        
          // create
          const createItem = this.editedItem
          console.log("2222222222222")
          EventBus.$emit('createItem', createItem)
          this.close()
      }

    }

}
</script>

<style scoped>
</style>>
