<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="고객이전 조회"
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
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable>
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
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                
                <v-col cols="3">
                <v-radio-group
                    row
                    v-on:change="handleRadio"
                    v-model="param.order_category"
                >
                    <v-radio
                        label="이전 시작일"
                        value="S"
                    ></v-radio>
                    <v-radio
                        label="이전 종료일"
                        value="E"
                    ></v-radio>                        
                </v-radio-group>
                </v-col>
                
                <v-col cols="3">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.user_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">                   
                    <v-select 
                    label="상태코드" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>    
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

                <v-col>
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="indigo darken-3"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                고객이전 실행
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
                                    v-model="editedItem.user_id"
                                    label="매장ID"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.to_local"
                                    label="이전할 국사코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.process_code"
                                    label="고객이전 처리코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-radio-group
                                    label="진행여부"
                                    v-model="editedItem.step"
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
            
            items:[
                    {state:'전체', abbr:'All'},
                    {state:'진행', abbr: 'P'},
                    {state:'성공', abbr:'S'},
                    {state:'실패', abbr:'F'},
                    {state:'등록', abbr:'A'}],
            dialog: false,
            editedItem: {
                user_id: '',
                to_local: '',
                process_code: '',
                step: '',
                // mod_date:'',
                // reg_date:''
            },
             defaultItem: {
                user_id: '',
                to_local: '',
                process_code: '',
                step: '',
                // mod_date:'',
                // reg_date:''
            },
            selected:'All'

        }
    },
    computed: {
        formTitle () {
            // return this.editedIndex === -1 ? '고객이전' : '수정'
            return '고객이전'
        }
    },
    methods: {
        searchMethod: function() {
            if(this.selected=='All'){
            this.param.status_code=''
            }else{
            this.param.status_code=this.selected
            }
            this.$emit('search', this.param)
        },
        handleRadio:function(value){
            if(value=='이전 시작일'){
                this.param.order_category="S"
            }else if(value=='이전 종료일'){
                this.param.order_category="E"
            }
        },

        save () {
            console.log('save method call : ',this.editedItem)        
            this.$emit('items',this.editedItem)
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
            html: "매장ID : "+this.editedItem.user_id+"<br>이전할 국사코드 : "+this.editedItem.to_local+
            "<br>고객이전 처리코드 : "+this.editedItem.process_code+"<br>진행여부 : "+this.editedItem.step 
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
                       html: "매장ID : "+this.editedItem.user_id+"<br>이전할 국사코드 : "+this.editedItem.to_local+
                        "<br>고객이전 처리코드 : "+this.editedItem.process_code+"<br>진행여부 : "+this.editedItem.step
                   })
        }

    },  
}
</script>
<style>

</style>