<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="광고배너 등록"
            class="px-5 py-3"
        >
                        <!-- max-width="500px" -->
                <v-col cols="12" sm="6" md="2">
                    <v-dialog
                        v-model="dialog"
                        width="620px"
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
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-subtitle style="font-size: 13px; height: 20px;">
                            <v-col>
                            <span style="font-weight: bold">주의!!</span> JPG, PNG 파일만 등록해주세요.
                            </v-col>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-container size>
                                <v-row style="height: 70px">
                                    <v-col>
                                        <div style="padding-top: 20px;">파일업로드 : </div>
                                    </v-col>
                                    <v-col cols="7">
                                        <v-file-input id="input"  label="Search..." v-model="images" accept=".jpg, .png" multiple="multiple"></v-file-input>
                                    </v-col>
                                    <v-col>
                                        <v-btn>찾기</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn btn1>
                                            -
                                        </v-btn>
                                        <v-btn btn1>
                                            +
                                        </v-btn>
                                    </v-col>
                                    <v-col  align="right">
                                        <v-btn style="height: 30px; width: 40px;" @click="xbtn">
                                            삭제
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <input type="submit" value="x" @click="xbtn">
                                   <v-col v-for="(name , index) in images" :key="index">
                                   {{images[index].name}} </v-col>
                                </v-row>
                                
                                <v-row style="height: 150px;">
                                    <div style="padding-top: 10px;">위치 : </div>
                                    <v-col cols="5" style="height: 110px">
                                    <v-btn 
                                    style="width: 100px; height: 30px;"
                                    color="none"
                                    >
                                        메인화면1
                                    </v-btn>
                                    <v-btn style="width: 100px; height: 30px;">
                                        메인화면2
                                    </v-btn>
                                    <v-btn style="width: 100px; height: 30px;">
                                        로그오프
                                    </v-btn>
                                    </v-col>
                                    <v-col>
                                        test
                                    </v-col>
                                </v-row>
                                <v-row>
                                    
                                    <v-col cols="5">
                                        게시기간 : 
                                    <v-menu
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        v-model="param.start_date"
                                        label="시작일"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        style="width: 20px ;height: 25px"
                                        >달력</v-btn>
                                    </template>
                                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
                                    </v-date-picker>
                                    </v-menu>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text> 

                        <v-card-actions>
                            <!-- <v-spacer></v-spacer> -->
                         
                            <v-col align="left"> 
                            <v-btn
                            color="blue darken-1"
                            @click="closeSure"
                            >
                            취소
                            </v-btn>
                            </v-col>
                            <v-col align="right">
                            <v-btn
                            color="blue darken-1"
                            @click="saveSure"
                            >
                            저장
                            </v-btn>
                            </v-col>  
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
            
       </base-material-card>       
    </v-container>
</template>

<script>
// import dateInfo from '../../../../utils/common';
export default {
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
            images: [],
            input: "<v-file-input></v-file-input>"
        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '배너등록'
      },
      // select box => center 국사정보와 version_code가 1302이상인 
      // 국사정보만 노출하도록 추가(21.06.03)
      filteredData(){
        return this.localGwOptions.filter(function(param){
            return (Number(param.version_code) > 1301 || param.local_gw_id == '');
        });
      }
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
            this.images = ""
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
         uploadImage: function() {
            let form = new FormData()
            let image = this.$refs['image'].files[0]
            
            form.append('image', image)

            // axios.post('/upload', form, {
            //     header: { 'Content-Type': 'multipart/form-data' }
            // }).then( ({data}) => {
            // this.images = data
            // })
            // .catch( err => console.log(err))
        },
            clickInputTag: function() {
            this.$refs['image'].click()
        },
        imgUpload(){
            console.log(this.images.name)
            console.log(this.images[0])
            console.log(this.input)
            this.input
            
        },
        xbtn(){
            this.images = ""
        }
        
    },  
}
</script>
<style>
 /* .size{
    width:500px;
    
}  */

.btn1{
    color: blue;
    background: white;
    width: 1px;
    height: 1px;
}
</style>