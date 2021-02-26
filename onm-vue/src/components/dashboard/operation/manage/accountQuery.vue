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
           <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일(생성일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=regOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>

                     <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일(수정일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=modOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
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
                        v-model="param.end_date"
                        label="종료일(생성일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=regOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                    
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일(수정일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=modOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
                
              <v-col cols="12" sm="6" md="3">
                    <v-radio-group
                        row
                        v-on:change="handleRadio"
                        v-model="optionType"
                    >
                        <v-radio
                            label="생성일"
                            value="reg_date"
                        ></v-radio>
                        <v-radio
                            label="수정일"
                            value="mod_date"
                        ></v-radio>                        
                    </v-radio-group>
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
                    <!-- <v-col cols="12" sm="6" md="2">
                        <v-text-field 
                        dense 
                        label="이름" 
                        v-model="param.name" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col>  -->
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

import dateInfo from '../../../utils/common';
import axios from "axios"

export default {
    props:['param'],
    data() {
        return{
            dialog: false,
            regOption:true,
            modOption:false,
            optionType: 'reg_date',
            editedItem: {
                onm_user_id: '',     
                access_ip: '',
                auth_group_id: '',
                cmd_type: 'I'
            },
            defaultItem: {
                onm_user_id: '',     
                access_ip: '',
                auth_group_id: '',
                cmd_type: '' 
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
            console.log('date ',dateInfo().current )     
            // 등록
            this.editedItem.cmd_type = 'I'

            var params = this.editedItem;
            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`
            var changeParams=this.changeIp(params)

            axios.post(url, changeParams, this.$store.state.headers)
            .then((response) => {
                console.log(response)
                var resCode = response.data.res_code;
                var resMsg = response.data.res_msg;
                if(resCode == 200){
                //현재 목록에서 선택한 Item을 삭제한다.
                this.pList.unshift(params)
                this.$fire({
                        title: "등록 되었습니다.",
                        type : "success"})
                }else{
                console.log('오류메세지')
                console.log(resMsg)
                this.$fire({
                        title: "등록 실패하였습니다.",
                        html: resMsg,
                        type : "error"})
                }
            })
            .catch((ex) => {
                this.$fire({
                        title: "등록 실패하였습니다.",
                        text: ex,
                        type : "error"})
            })

            this.close()
        },

        changeIp(values){
            let newParams={}
            newParams.onm_user_id=values.onm_user_id
            newParams.auth_group_id=values.auth_group_id
            newParams.cmd_type=values.cmd_type
            newParams.access_ip=values.access_ip.split(',')
            return newParams
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

        handleRadio:function(value){
            console.log(value)
            this.optionType=value
            if(value=='reg_date'){
                this.regOption=true
                this.modOption=false
            }else if(value=='mod_date'){
                this.regOption=false
                this.modOption=true
            }
        }
    },  
}
</script>

<style>
</style>