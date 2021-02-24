<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="계정 정보 조회"
            class="px-5 py-3"
        >
                <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
                </v-row>
                <v-row >
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field 
                        dense 
                        label="사번" 
                        v-model="param.onm_user_id" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col>         
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field 
                        dense 
                        label="이름" 
                        v-model="param.name" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col> 
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field 
                        dense 
                        label="권한그룹ID" 
                        v-model="param.auth_group_id" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col>
                    <v-col cols="auto" >
                        <v-btn 
                            elevation="2" 
                            medium
                            color="primary"
                            v-on:click="searchMethod"
                            >
                            검색
                        </v-btn>
                    </v-col>  
                    
                    <v-col cols="12" sm="6" md="2">
                        <v-dialog
                            v-model="dialog"
                            max-width="400px"
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
                                <span class="headline" >{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="12"
                                        >
                                        <v-text-field
                                            v-model="editedItem.onm_user_id"
                                            counter
                                            maxlength="10"
                                            label="계정(사번)"
                                        ></v-text-field>
                                        </v-col>
                                    <!-- </v-row>
                                    <v-row> -->
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="12"
                                        >
                                        <v-text-field
                                            v-model="editedItem.access_ip"
                                            label="접속 IP"
                                        ></v-text-field>
                                        </v-col>
                                    <!-- </v-row>
                                    <v-row> -->
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="12"
                                        >
                                        <v-text-field
                                            v-model="editedItem.auth_group_id"
                                            counter
                                            maxlength="4"
                                            label="권한그룹id"
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
                    </v-col>
                     <v-col cols="auto" >
                        <v-btn 
                            elevation="2" 
                            medium
                            color="secondary"
                            v-on:click="searchToAuthMenu"
                            >
                            권한 메뉴 목록
                        </v-btn>
                    </v-col> 
                </v-row>
        </base-material-card>       
    </v-container>
</template>
<script>

import EventBus from '../../../../EventBus'
import dateInfo from '../../../utils/common';


export default {
    props:['param'],
    data() {
        return{
            dialog: false,
            editedItem: {
                onm_user_id: '',     
                access_ip: '',
                auth_group_id: '',
                cmd_type: 'I',
                reg_date: '',
                mod_date: '',
                rgistrant:'',
                modifier:''
            },
            defaultItem: {
                onm_user_id: '',     
                access_ip: '',
                auth_group_id: '',
                cmd_type: '',
                reg_date: '',
                mod_date: '',
                rgistrant:'',
                modifier:''
            }

        }
    },
    computed: {
      formTitle () {
        return '계정등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },

        searchToAuthMenu: function() {
            this.$emit('searchToAuthMenu', this.param)
        },
        // registUser: function() {
        //     console.log("사용자 등록 화면으로 이동한다. -> 완료 또는 취소되면 이전화면으로 이동")
        // },
        // handleClickButton(){
        //     this.visible = !this.visible
        // },

        save () {
            console.log('save method call : ',this.editedItem)        
            // 등록
            this.editedItem.cmd_type = 'I'
            this.editedItem.reg_date = dateInfo().current 
            EventBus.$emit('createItemAccount', this.editedItem)
            this.$fire({
                       title: "등록 되었습니다.",
                       html: "계정(사번) : "+this.editedItem.onm_user_id+"<br/>접속 IP : "
                       +this.editedItem.access_ip+"<br/>권한 그룹 ID : "+this.editedItem.auth_group_id,
                       type : "success"})
            this.close()
        },

        saveSure(){
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            html: "계정(사번) : "+this.editedItem.onm_user_id+"<br/>접속 IP : "
            +this.editedItem.access_ip+"<br/>권한 그룹 ID : "+this.editedItem.auth_group_id,
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
                       html: "계정(사번) : "+this.editedItem.onm_user_id+"<br/>접속 IP : "
                        +this.editedItem.access_ip+"<br/>권한 그룹 ID : "+this.editedItem.auth_group_id,
                       type : "error"
                   })
        },
    },  
}
</script>

<style>
</style>