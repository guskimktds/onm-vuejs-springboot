<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="서비스 공지 목록 검색"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols="12" sm="6" md="3">
                 <v-select 
                    label="분류" 
                    v-model="param.board_cate_cd"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                    <v-text-field 
                        label="제목" 
                        v-model="param.title"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>  
                <v-col cols="12" sm="6" md="3">
                 <v-select 
                    label="노출여부" 
                    v-model="param.disp_yn"
                    :items="dispItems"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>
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
                        v-model="param.disp_start_date"
                        label="노출기간 시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_start_date" no-title scrollable>
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
                        v-model="param.disp_end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_end_date" no-title scrollable>
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
                        v-model="param.reg_start_date"
                        label="등록일자 시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.reg_start_date" no-title scrollable>
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
                        v-model="param.reg_end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.reg_end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-dialog
                        v-model="dialog"
                        width="70%"
                        v-show="showAuth()"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="indigo"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            등록
                        </v-btn>
                        </template>


                        <!-- 등록 모달창 -->
                        <v-card>
                        <v-card-title>
                            <span class="headline" >{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                 <v-col cols="12" sm="6" md="3">
                 <v-select 
                  item-text="state" 
                  item-value="abbr" 
                  :items="modalItems"
                  label="분류" 
                  v-model="editedItem.board_cate_cd"
                  ></v-select>
                  <v-select 
                  item-text="state" 
                  item-value="abbr" 
                  :items="osType"
                  label="OS 타입" 
                  v-model="editedItem.os_type"
                  ></v-select>
                </v-col>
                <v-text-field
                    v-model="editedItem.title"
                    label="제목"
                    counter
                    maxlength="20"
                ></v-text-field>
                <v-col cols="12">
                <v-col cols="12" sm="6" md="3">
                 <v-select 
                  item-text="state" 
                  item-value="abbr" 
                  :items="modalDispItems"
                  label="노출유무" 
                  v-model="editedItem.disp_yn" 
                  ></v-select>
                </v-col>     
                                </v-col>
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
                        v-model="editedItem.disp_end_date"
                        label="종료일"
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
                                    </v-row>
                                <v-row>
                                    <v-col cols="6"
                                    >
                                <vue-editor
                                :editorOptions="editorSettings"
                                v-model="editedItem.content_html"
                                ></vue-editor>
                                    </v-col >
                                    <v-col cols="6">
                                <v-textarea
                                outlined
                                 v-model="editedItem.content"
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
                            @click="saveSure"
                            >
                            저장
                            </v-btn>
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="closeSure"
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
                </v-col>
            </v-row>       

       </base-material-card>       
    </v-container>
</template>

<script>
import dateInfo from '../../../utils/common';
// import vueEditor from '../../../utils/vueEditor.vue';
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from 'quill-image-drop-module'

Quill.register('modules/imageDrop', ImageDrop)
export default {
    props:['param'],
    data() {
        return{     
        htmlForEditor: "",
        content:"",
        editorSettings: {
          modules: {
              imageDrop: true,
            // imageResize: {}
              }
          },
          
            dialog: false,
            dialogDelete: false,
            items:[
              {state: '전체'     , abbr: ''},
              {state: '왼쪽공지'     , abbr: 'CATE01'},
              {state: '오른쪽공지'     , abbr: 'CATE02'}],
            dispItems:[
              {state: '전체'     , abbr: ''},
              {state: '노출'     , abbr: 'Y'},
              {state: '미노출'     , abbr: 'N'}],
            modalItems:[
              {state: '왼쪽공지'     , abbr: 'CATE01'},
              {state: '오른쪽공지'     , abbr: 'CATE02'}],
            modalDispItems:[
              {state: '노출'     , abbr: 'Y'},
              {state: '미노출'     , abbr: 'N'}],
            osType:[
              {state: 'All'     , abbr: 'ALL'},
              {state: 'Android'     , abbr: 'Android'},
              {state: 'iOS'     , abbr: 'iOS'},
              {state: 'PC'     , abbr: 'PC'},
              {state: 'PCAPP'     , abbr: 'PCAPP'},
            ],
            editedItem: {
                board_type: 'NOTICE',
                board_cate_cd: 'CATE01',
                title: '',
                content_html: '',
                content: '',
                disp_yn: 'Y',
                disp_start_date:dateInfo().currentDateDashFormat,
                disp_end_date:dateInfo().oneMonthDashFormat,
                os_type: '',

            },
            defaultItem: {
                board_type: 'NOTICE',
                board_cate_cd: 'CATE01',
                title: '',
                content_html: '',
                content: '',
                disp_yn: 'Y',
                disp_start_date: dateInfo().currentDateDashFormat,
                disp_end_date:dateInfo().oneMonthDashFormat ,
                os_type: '',
            },
        }
    },
    components: {
        VueEditor

    },
    computed: {
      formTitle () {
        return '등록'
      },
      // select box => center 국사정보와 version_code가 1302이상인 
      // 국사정보만 노출하도록 추가(21.06.03)
    },
    methods: {
        showAuth(){
            var auth=this.$store.state.authGroupId
            if(auth=='G100'){
            return true;
            }else{
            alert('접근권한이 없습니다.')
            return false;
            }
        },
        searchMethod: function() {
            console.log("DFFFFFFFFFFFFF"+JSON.stringify(this.param))
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)     

            this.$emit("Items",this.editedItem)
            
            this.close()
        },

        saveSure(){
            console.log(222)
            console.log(this.editedItem.content_html)
            if(this.editedItem.title == '' || this.editedItem.content_html == ''|| this.editedItem.content == ''){
            alert('제목 | 내용을 입력하세요')
            this.dialog =false
            }else{

                
                this.$fire({
                    title: "정말 등록 하시겠습니까?",
            type: "question",

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
            }).then(result => {
                if(result.value){
                    this.save()
               }else{
                   this.closeSure()
               }
            });
            
            
            }
        },
    
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            // this.editedIndex = -1
            })
        },

        closeSure(){
            
            this.close()
            this.$fire({
                title: "등록이 취소되었습니다.",
                       type : "error"
                   })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            //   this.editedIndex = -1
            })
        },
        deleteItemConfirm () {
            // this.pList.splice(this.editedIndex, 1)
            this.closeDelete()
        },

    },  
}
</script>
<style>

</style>