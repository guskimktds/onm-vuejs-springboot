<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="APP(Client) 단말 정보 관리"
            class="px-5 py-3"
        >
            <v-row>
                <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="앱버전" 
                        v-model="param.appversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="OS타입" 
                        v-model="param.ostype"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="업데이터버전" 
                        v-model="param.updateversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>                
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                        color="primary"
                    >
                        검색
                    </v-btn>
                </v-col> -->
                <v-col cols="12" sm="6" md="10"></v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
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
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.app_version_id"
                                    counter
                                    maxlength="8"
                                    oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                                    label="앱버전ID"
                                    
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.os_type"
                                    counter
                                    maxlength="1"
                                    label="OS타입"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.update_version"
                                    counter
                                    maxlength="20"
                                    label="업데이트 버전"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.version_code"
                                    counter
                                    maxlength="4"
                                    oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                                    label="버전코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.download_url"
                                    label="다운로드 URL"
                                ></v-text-field>
                                </v-col>
                               
                                <v-radio-group
                                    label="필수 업데이트"
                                    v-model="editedItem.required_yn"
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
                                                               
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.title"
                                    label="타이틀"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.content"
                                    label="내용"
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
                            @click="saveSure"
                            >
                            완료
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
                </v-col>
            </v-row>
            
      </base-material-card>       
    </v-container>
</template>
<script>

import EventBus from '../../../../../EventBus';
import dateInfo from '../../../../utils/common';

export default {
    data() {
        return{
            // param: {
            //     appversion: '',
            //     ostype: '',
            //     updateversion: ''
            // },
            dialog: false,
            editedItem: {
                app_version_id: 0,
                os_type: '',
                update_version: '',
                version_code: '',
                download_url: '',
                required_yn:'',
                title: '',
                content: '',
                reg_date: '',
                mod_date: ''
            },
            defaultItem: {
                app_version_id: 0,
                os_type: '',
                update_version: '',
                version_code: '',
                download_url: '',
                required_yn:'',
                title: '',
                content: '',
                reg_date: '',
                mod_date: ''
            },

        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)       
            this.editedItem.cmd_type = 'I'
            this.editedItem.mod_date = dateInfo().current 
            this.editedItem.reg_date = dateInfo().current 
            EventBus.$emit('createItemApp', this.editedItem)
    
            this.close()
            
        },
        
        saveSure(){
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            html:"앱버전ID : "+this.editedItem.app_version_id+"<br>OS타입 : "+this.editedItem.os_type+
            "<br>업데이트 버전 : "+this.editedItem.update_version+"<br>버전코드 : "+this.editedItem.version_code+
            "<br>다운로드 URL : "+this.editedItem.download_url+"<br>필수 업데이트 : "+this.editedItem.required_yn+
            "<br>타이틀 : "+this.editedItem.title+"<br>내용 : "+this.editedItem.content 
            }).then(result => {
               if(result.value){
                   this.save()
               }else{
                   this.closeSure()
               }
            });
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeSure(){
            this.close()
            this.$fire({
                       title: "등록이 취소되었습니다.",
                       type : "error",
                       html:"앱버전ID : "+this.editedItem.app_version_id+"<br>OS타입 : "+this.editedItem.os_type+
                            "<br>업데이트 버전 : "+this.editedItem.update_version+"<br>버전코드 : "+this.editedItem.version_code+
                            "<br>다운로드 URL : "+this.editedItem.download_url+"<br>필수 업데이트 : "+this.editedItem.required_yn+
                            "<br>타이틀 : "+this.editedItem.title+"<br>내용 : "+this.editedItem.content 
                   })
        },

        // checkValue(param){
           
        //     if(param.app_version_id.length>8||param.app_version_id.length<0){
        //         param.app_version_id=""
        //     }
        //     if(param.os_type.length!==1){
        //         param.os_type=""
        //     }
        //     if(param.update_version.length>20||param.update_version.length<0){
        //         param.update_version=""
        //     }
        //     if(param.version_code.length>4||param.version_code.length<0||isNaN(param.version_code)){
        //         param.version_code=""
        //     }
        //     if(param.required_yn!=='Y'||param.required_yn!=='N'){
        //         param.required_yn=""
        //     }
        // }
    },  
}
</script>
<style>

</style>