<template>

    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="Failover"
        class="px-5 py-3"
        >


            <v-row>
                <v-col cols="3">
                    <v-text-field 
                        label="스트리머 번호" 
                        v-model="param.streamer_idx"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field 
                        label="프로세스명" 
                        v-model="param.proc_name"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                     <v-select 
                        item-text="server_name" 
                        item-value="local_gw_id" 
                        :items="filteredData"
                        label="국사코드" 
                        v-model="param.local_gw_id"
                        ></v-select>
                </v-col>
                <v-col cols="2">
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
                                <v-col cols="12">
                                    <v-select 
                                    item-text="server_name" 
                                    item-value="local_gw_id" 
                                    :items="editedData"
                                    label="국사코드" 
                                    v-model="editedItem.local_gw_id"
                                    ></v-select>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                               <v-text-field
                                    v-model="editedItem.proc_name"
                                    label="프로세스 명"
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
                                    v-model="editedItem.thread_count"
                                    label="쓰레드 개수"
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
                                    v-model="editedItem.streamer_idx"
                                    label="스트리머 인덱스"
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
export default {
 props:['param','localGwOptions'],
    data() {
        return {
            dialog: false,    
            editedItem: {
                proc_name: '',
                thread_count: '',
                streamer_idx : '',
                local_gw_id: ''
            },
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
      filteredData(){ 
        return this.localGwOptions.filter(function(param){
            return (Number(param.version_code) > 1301 || param.local_gw_id == '');
        });   
      },
        editedData(){ 
        return this.localGwOptions.filter(function(param){
            return (Number(param.version_code) > 1301 || param.local_gw_id == '');
        });   
      },

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
    searchMethod: function () {
      this.$emit("search", this.param);
    },
         save () {
            console.log('save method call : ',this.editedItem)     
            // 등록
            this.editedItem.cmd_type = 'I'
            if(this.editedItem.local_gw_id==''){
                delete this.editedItem.local_gw_id
            }
            //this.editedItem.local_gw_id = this.status
            //this.editedItem.local_gw_id = '0'  
            // console.log(dateInfo().current)
            // this.editedItem.mod_date = dateInfo().current

            // console.log(this.editedItem.mod_date)
            this.$emit('Items',this.editedItem)
            this.close()
        },

        saveSure(){
            var index=this.editedItem.local_gw_id
            if(index==undefined){
                index=0
            }
            var indexNum = ''
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>프로세스 명 :"+this.editedItem.proc_name+"<br>쓰레드 개수 : "+this.editedItem.thread_count+
            "<br>스트리머 인덱스 : "+this.editedItem.streamer_idx
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
            var indexNum = ''
            for(var i=0;i<this.localGwOptions.length;i++){
               if(this.localGwOptions[i].local_gw_id==index){
                   indexNum=i
               }
            }
            this.close()
            this.$fire({
                       title: "등록이 취소되었습니다.",
                       type : "error",
                       html: "국사코드 : "+this.localGwOptions[indexNum].server_name+"<br/>코드구분 :"+this.editedItem.code_master_id+"<br>코드구분코드명 : "+this.editedItem.code_master_name+
                       "<br>설명 : "+this.editedItem.description+"<br>사용여부 : "+this.editedItem.use_yn
                   })
        }  
  },
};
</script>
<style>
    
</style>