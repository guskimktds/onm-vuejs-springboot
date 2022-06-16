<template>

    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="영상송출 메인정보"
        class="px-5 py-3"
        >


            <v-row>
                <v-col cols="3">
                    <v-text-field 
                        label="카메라ID" 
                        v-model="param.cam_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field 
                        label="송출제목" 
                        v-model="param.srs_title"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>    
                <v-col cols="3">
                    <v-text-field 
                        label="사용자 ID" 
                        v-model="param.user_id
                        "
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>            
                <v-col cols="3">
                     <v-select 
                        item-text="status_name" 
                        item-value="status_code" 
                        :items="statusData"
                        label="상태코드" 
                        v-model="param.status_code"
                        ></v-select>
                </v-col>
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
                        max-width="40%"
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
                                    v-model.trim="editedItem.user_id"
                                    label="사용자 ID"
                                    counter
                                    maxlength="10"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                               <v-text-field
                                    v-model.trim="editedItem.cam_id"
                                    label="카메라 ID"
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
                                    v-model.trim="editedItem.target_stream_key"
                                    label="스트림 키"
                                    counter
                                    maxlength="512"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model.trim="editedItem.target_stream_url"
                                    label="스트림 URL"
                                    counter
                                    maxlength="512"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.srs_title"
                                    label="송출제목"
                                    counter
                                    maxlength="200"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.start_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="editedItem.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
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
import axios from "axios";
export default {
 props:['param'],
    data() {
        return {
            dialog: false,    
            editedItem: {
                user_id: '',
                cam_id: '',
                target_stream_key: '',
                target_stream_url : '',
                srs_title : '',
                start_date: '',
                end_date : '',
                paging : false
            },
            statusData: [
                {status_name :'전체' , status_code : ''},
                {status_name :'등록' , status_code : 'A'},
                {status_name :'송출 준비' , status_code : 'P'},
                {status_name :'송출중' , status_code : 'S'},
            ],
            localGwOptions: ''
        }
            
    },
    computed: {
        formTitle () {
            // return this.editedIndex === -1 ? '등록' : '수정'
            return '등록'
        },

        localCode(){
            let str = new Array();
    
            for(let i =0; i<this.localGwOptions.length; i++){
                str[i] += this.localGwOptions[i].local_gw_id;
            }
            return str;
        }
    },

     beforeCreate() {  
      axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
      .then((response) => {
        this.localGwOptions = response.data.data.local_gw_list;
      })
      .catch(function (error) {
          console.log(error);
          // alert("국사정보 조회실패")
        })
        .finally(function () {
          // always executed
        });
    },
    methods: {
    regexMethod(){
        const regex = /^1(\d{3})/;
        const userId = this.editedItem.cam_id.substr(1,10);
        const camIdNum =  this.editedItem.cam_id.substr(11,4);
        // const code = this.editedItem.cam_id.substr(0,1);
        // for(let i = 0; i<this.localCode().length; i++){
        //          code == this.localCode().str[i];
        //          alert('확인');
        // }
         if(!(this.editedItem.user_id == userId)){
             alert("사용자ID 와 카메라ID 값이 일치하지 않습니다.");
             this.dialog = false;
         }else if(!regex.test(camIdNum)){
            alert('카메라 ID 장치 식별 4자리가 맞지 않습니다.');
             this.dialog = false;
         }else if(this.editedItem.cam_id.match(/\s/g)){
             alert('카메라 ID 공백을 제거해주세요.');
             this.dialog = false;
         }

         
     },
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
            if(this.editedItem.end_date==null||this.editedItem.end_date==''||this.editedItem.start_date==null||this.editedItem.start_date==''){
                alert('날짜값은 반드시 기입하셔야 합니다.')
                this.close()
            }else{    
            this.$emit('Items',this.editedItem)
            this.close()
            }
        },

        saveSure(){
            this.regexMethod();
            if(this.dialog == true){

                this.$fire({
                    title: "정말 등록 하시겠습니까?",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '예',
                    cancelButtonText: '아니오',
                    html: "사용자 ID : "+this.editedItem.user_id+"<br/>카메라ID : "+this.editedItem.cam_id+"<br/>스트림 키 :"+this.editedItem.target_stream_key+"<br>스트림 url : "+this.editedItem.target_stream_url+
                    "<br>송출제목: "+this.editedItem.srs_title+"<br/>송출 시작일시 :"+this.editedItem.start_date+"<br>송출 종료일시 : "+this.editedItem.end_date
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
                       type : "error",     
                   })
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            //   this.editedIndex = -1
            })
        }, 
        regTest(){
            // this.editedItem.cam_id.test(str);
            var regex = new RegExp(this.str);
            this.editedItem.cam_id.match(regex, "cam_id, user_id 값을 확인하세요");
        } 
  },
};
</script>
<style>
    
</style>