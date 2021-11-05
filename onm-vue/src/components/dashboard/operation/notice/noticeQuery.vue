<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="공지사항 등록"
            class="px-5 py-3"
        >

            <v-row>
           
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

                                <v-toolbar>
                                    <span>에디터</span>
                                    <span>직접</span>
                                </v-toolbar>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-select 
                                    item-text="server_name" 
                                    item-value="local_gw_id" 
                                  
                                    label="분류" 
                                    v-model="editedItem.local_gw_id"
                                    >
  
                                    </v-select>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                             
                                <v-text-field
                                    v-model="editedItem.code_id"
                                    label="제목"
                                    counter
                                    maxlength="20"
                                ></v-text-field>
             
                                </v-col>
                                <span>
                                    <v-row>

                                    <v-checkbox
                                    label="all"
                                    value="all"
                                    ></v-checkbox>
                                    <v-checkbox
                                    label="web"
                                    value="web">
                                    </v-checkbox> 
                                    <v-checkbox
                                    label="pcapp"
                                    value="pcapp"
                                    ></v-checkbox>
                                      <v-checkbox
                                    label="ios"
                                    value="ios"
                                    ></v-checkbox>
                                      <v-checkbox
                                    label="android"
                                    value="android"
                                    ></v-checkbox>
                                    </v-row>
                                </span>

                            </v-row>
                            </v-container>
                            <vue-editortool></vue-editortool>
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

import vueEditortool from '../../../utils/vueEditor.vue'

export default {
  components: { 
      vueEditortool,
    },
    props:['param','localGwOptions'],
    data() {
        return{            
            status: '센터',
            status_text:'',
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
            },
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        var dm = new Date();
        var lastMonthDashFormat =  ("00" + (dm.getMonth() + 1)).slice(-2) + "-" + ("00" + dm.getDate()).slice(-2) 
        console.log(lastMonthDashFormat+ "______")
        return '등록1'
      },
      // select box => center 국사정보와 version_code가 1302이상인 
      // 국사정보만 노출하도록 추가(21.06.03)
    //   filteredData(){
        // return this.localGwOptions.filter(function(param){
        //     return (Number(param.version_code) > 1301 || param.local_gw_id == '');
        // });
    //   }
      //
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
            if(this.editedItem.local_gw_id==''){
                delete this.editedItem.local_gw_id
            }
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = getDate 
            // this.editedItem.reg_date = getDate 

            // console.log(this.editedItem.mod_date)

            this.$emit("Items",this.editedItem)
            
            this.close()
        },

        saveSure(){
            var index=this.editedItem.local_gw_id
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
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
           var index=this.editedItem.local_gw_id
            if(index==undefined){
                index=0
            }
            var indexNum
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.close()
            this.$fire({
                       title: "등록이 취소되었습니다.",
                       html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 : "+this.editedItem.code_master_id+"<br/>코드 : "+this.editedItem.code_id+
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