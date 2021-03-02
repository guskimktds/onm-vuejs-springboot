<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="코드 조회"
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
                        label="코드" 
                        v-model="param.code_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드명" 
                        v-model="param.code_name"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드타입" 
                        v-model="param.code_type"
                        placeholder=" " 
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
                </v-col>
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
                                    v-model="editedItem.code_id"
                                    label="코드"
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
                                    v-model="editedItem.code_name"
                                    label="코드명"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.code_type"
                                    label="코드타입"
                                    counter
                                    maxlength="20"
                                ></v-text-field>
                                </v-col>
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
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.orderby_no"
                                    label="정렬순서"
                                    counter
                                    maxlength="4"
                                    oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="12"
                                >
                                <v-text-field
                                    v-model="editedItem.description"
                                    label="설명"
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
// import dateInfo from '../../../../utils/common';

export default {
    props:['param'],
    data() {
        return{            
            // param: {
            //     codeClass: '',
            //     code: '',
            //     name: '',
            //     type: ''
            // },
            dialog: false,
            dialogDelete: false,        
            editedItem: {
                code_master_id: '',
                code_id: '',
                code_name: '',
                code_type: '',
                use_yn: '',
                orderby_no: '',
                description: '',
                cmd_type: '',
                local_gw_id: '0',
                reg_date:'',
                mod_date:''
            },
            defaultItem: {
                code_master_id: '',
                code_id: '',
                code_name: '',
                code_type: '',
                use_yn: '',
                orderby_no: '',
                description: '',
                cmd_type: 'I',
                local_gw_id: '0',
                reg_date:'',
                mod_date:''
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
            // 수정
            this.editedItem.cmd_type = 'I'
            this.editedItem.local_gw_id = '0'  
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = getDate 
            // this.editedItem.reg_date = getDate 

            // console.log(this.editedItem.mod_date)

            this.$emit("Items",this.editedItem)
            
            this.close()
        },

        saveSure(){
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
            "<br/>코드명 : "+this.editedItem.code_name+"<br/>코드타입 : "+this.editedItem.code_type+
            "<br/>사용여부 : "+this.editedItem.use_yn+"<br/>정렬순서 : "+this.editedItem.orderby_no+
            "<br/>설명 : "+this.editedItem.description,
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
                       html: "코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
            "<br/>코드명 : "+this.editedItem.code_name+"<br/>코드타입 : "+this.editedItem.code_type+
            "<br/>사용여부 : "+this.editedItem.use_yn+"<br/>정렬순서 : "+this.editedItem.orderby_no+
            "<br/>설명 : "+this.editedItem.description,
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