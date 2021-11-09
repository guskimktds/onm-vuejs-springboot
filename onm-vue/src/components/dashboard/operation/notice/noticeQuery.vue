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
                  item-text="server_name" 
                  item-value="board_type" 
                  :items=this.defaultItem.board_type
                  label="분류" 
                  v-model="param.board_type" 
                  v-on:change="searchMethod"
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
                  item-text="server_name" 
                  item-value="disp_yn" 
                  :items=this.defaultItem.disp_yn
                  label="분류" 
                  v-model="param.disp_yn" 
                  v-on:change="searchMethod"
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
                        <v-card>
                        <v-card-title>
                            <span class="headline" >{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-select 
                                    item-text="server_name" 
                                    item-value="board_type" 
                                    :items="board_type"
                                    label="국사코드" 
                                    v-model="editedItem.board_type"
                                    ></v-select>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                               <v-text-field
                                    v-model="editedItem.title"
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
            status: '센터',
            status_text:'',
            dialog: false,
            dialogDelete: false,        
            editedItem: {
                title: '',
                board_type: '',
                board_cate_cd: '',
                disp_yn: '',
                disp_start_date: '',
                disp_end_date: '',
                reg_start_date: '',
                reg_end_date: '',
                page_no: '',
                view_cnt:'',
            },
            defaultItem: {
                title: '',
                board_type: ['전체', '일반공지','긴급공지'],
                board_cate_cd: '',
                disp_yn: ['전체','노출','미노출'],
                disp_start_date: '',
                disp_end_date: '',
                reg_start_date: '',
                reg_end_date: '',
                page_no: '',
                view_cnt:'',
                // cmd_type: 'I',
                // board_type: '0',
            },
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록1'
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
            if(this.status=="센터"){
                this.param.process_status=''
            }else{
                this.param.process_status=this.status
            }
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)     
            // 수정
            this.editedItem.cmd_type = 'I'
            if(this.editedItem.board_type==''){
                delete this.editedItem.board_type
            }
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = getDate 
            // this.editedItem.reg_date = getDate 

            // console.log(this.editedItem.mod_date)

            this.$emit("Items",this.editedItem)
            
            this.close()
        },

        saveSure(){
            var index=this.editedItem.board_type
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].board_type==index){
                   indexNum=i
               }
            }
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.title+"<br/>코드 : "+this.editedItem.code_id+
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
           var index=this.editedItem.board_type
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].board_type==index){
                   indexNum=i
               }
            }
            this.close()
            this.$fire({
                       title: "등록이 취소되었습니다.",
                       html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.title+"<br/>코드 : "+this.editedItem.code_id+
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