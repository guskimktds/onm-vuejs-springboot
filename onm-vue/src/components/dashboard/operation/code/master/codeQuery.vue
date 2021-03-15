<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="코드 마스터 조회"
            class="px-5 py-3"
        >
            <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드구분" 
                        v-model="param.code_master_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드구분코드명" 
                        v-model="param.code_master_name"
                        placeholder=" " 
                    >                        
                    </v-text-field>
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
                        max-width="500px"
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
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.code_master_id"
                                    label="코드구분"
                                    counter
                                    maxlength="20"
                                ></v-text-field>
                                </v-col>
                                
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.code_master_name"
                                    label="코드구분코드명"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.description"
                                    label="설명"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-radio-group
                                    label="사용여부"
                                    v-model="editedItem.use_yn"
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
            </v-row>       

       </base-material-card>       
    </v-container>
</template>
<script>

import dateInfo from '../../../../utils/common';

export default {
    props:['param'],
    data() {
        return{            
            dialog: false,    
            editedItem: {
                code_master_id: '',     
                code_master_name: '',        
                use_yn: '',
                description: '',
                cmd_type: '',
                local_gw_id: '0',
                reg_date:'',
                mod_date:''
            },
            defaultItem: {
                code_master_id: '',     
                code_master_name: '',        
                use_yn: '',
                description: '',
                cmd_type: '',
                local_gw_id: '0',
                reg_date:'',
                mod_date:''
            }
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
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
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)     
            // 등록
            this.editedItem.cmd_type = 'I'
            this.editedItem.local_gw_id = '0'  
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = dateInfo().current 
            this.editedItem.reg_date = dateInfo().current 

            // console.log(this.editedItem.mod_date)
            this.$emit('Items',this.editedItem)
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
            html: "코드구분 :"+this.editedItem.code_master_id+"<br>코드구분코드명 : "+this.editedItem.code_master_name+
            "<br>설명 : "+this.editedItem.description+"<br>사용여부 : "+this.editedItem.use_yn
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
                       type : "error",
                       html: "코드구분 :"+this.editedItem.code_master_id+"<br>코드구분코드명 : "+this.editedItem.code_master_name+
                       "<br>설명 : "+this.editedItem.description+"<br>사용여부 : "+this.editedItem.use_yn
                   })
        }  

        // closeDelete () {
        //     this.dialogDelete = false
        //     this.$nextTick(() => {
        //     this.editedItem = Object.assign({}, this.defaultItem)
        //     //   this.editedIndex = -1
        //     })
        // },
        // deleteItemConfirm () {
        //     // this.pList.splice(this.editedIndex, 1)
        //     this.closeDelete()
        // },
    },  
}
</script>
<style>

</style>