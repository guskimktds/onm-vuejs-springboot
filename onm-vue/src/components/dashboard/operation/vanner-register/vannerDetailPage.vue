<template>   
    <v-container fluid>
        <v-row>
            <v-col cols="auto">
                <h1 style="margin-left: 10px">배너 상세</h1>
            </v-col>
           
        </v-row>
        <v-row>
            <v-col>
            <h3 style="margin-left: 10px; padding-top:30px; margin-bottom: -25px">· 배너 내용</h3>
            </v-col>
             <v-col>
                <v-btn @click="checkYn" 
                right 
                absolute
                color="black"
                >
                    저장
                </v-btn>
            </v-col>
        </v-row>
    <v-card fluid >
        <v-row style="margin-left:30px; padding-top:25px">
            <v-col cols="auto" style="padding-top:25px;"><span style="color:red;">*</span>배너 타입</v-col>
            <v-col><v-text-field 
            v-model="bannerType"
            solo
            style="width: 200px;"
            readonly
            ></v-text-field></v-col>
        </v-row>
        <v-row style="margin-left:30px;">
            <v-col cols="auto" style="padding-top:35px; margin-right:30px;"><span style="color:red;">*</span>제목</v-col>
            <v-col>
                <v-text-field label="입력" style="width: 500px" v-model="editedItem.title"></v-text-field>
            </v-col>
        </v-row>
        <v-row style="margin-left:30px; padding-top:35px;">
            <v-col cols="auto" style="padding-top:25px;"><span style="color:red;">*</span>노출 여부</v-col>
            <v-col cols="auto"><v-select 
            :items="items2"
            v-model="typedate"
            solo
            style="width: 100px;"
            ></v-select></v-col>
            <v-col cols="auto" style="padding-top:25px; padding-left:150px"><span style="color:red;">*</span>OS 타입</v-col>
            <v-col cols="auto"><v-select 
            label="All"
            :items="items3"
            v-model="editedItem.os_type"
            solo
            style="width: 100px;"
            
            ></v-select></v-col>
        </v-row>
        <v-row style="margin-left:30px; padding-top:20px;">
            <v-col cols="auto" style="padding-top:25px;"><span style="color:red;">*</span>노출 기간</v-col>
            <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="dispdate"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="시작일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:180px"
                        
                        ></v-text-field>
                    </template>
                     <v-date-picker v-model="dispdate" no-title scrollable type="date">
                    </v-date-picker> 
                    </v-menu>
                </v-col>
                 <span style="padding-top:35px">~</span>
                <v-col cols="auto">
                    <v-menu
                    offset-y
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="dispdate2"
                        prepend-icon="mdi-calendar"
                        readonly
                        label="종료일"
                        v-bind="attrs"
                        v-on="on"
                        style="width:180px"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="dispdate2" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>
        </v-row>
        <v-row style="margin-left:30px; padding-top:20px;">
            <v-col cols="auto" style="padding-top:15px;" ><span style="color:red;">*</span>배너 파일</v-col>
            <v-col cols="6">
            <!-- <input type="file"  @change="onFileSelected" accept="image/png, image/gif, image/jpeg, image/jpg"> -->
            <div class="filebox">
                <input class="upload-name" v-model="editedItem.img_name" readonly placeholder="파일명">
                <!-- <label for="file" >파일찾기</label> -->
                <input type="file" id="file" @change="onFileSelected" accept="image/png, image/gif, image/jpeg, image/jpg">
            </div>
            </v-col>
        </v-row>
        <v-row style="margin-left:30px;">
            <v-col cols="auto" style="padding-top:35px;" >
                <span style="color:red;">*</span>Link URL
            </v-col>
            <v-col>
                <v-text-field label="입력" style="width: 520px" v-model="editedItem.img_url" maxlength="200"></v-text-field>
            </v-col>
        </v-row>
            <v-container 
            style="width:550px; height: 450px; margin-left: 125px; border:1px solid #999999; margin-top: 10px;"
            id="file">
            <div v-if="istf" style="width: 400px; height: 300px; margin-left: -15px;">
               <span v-if="istf" style="margin-left:20px"> 배너 이미지 미리보기 영역</span></div>
          
            <div v-if="vitem.tem1" style="height:300px;width:200px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem1" style='height:100%;width:100%; '></v-img></div>

            <div v-if="vitem.tem2" style="height:150px;width:500px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem2" style='height:100%;width:100%to;'></v-img></div>

            <div v-if="vitem.tem3" style="height:150px;width:500px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem3" style='height:100%;width:100%;'></v-img></div>
            <!-- <v-img :src="images"></v-img> -->
            </v-container>
        <v-row style="margin-left:30px; padding-top:20px;">
            
        </v-row>
                <v-dialog v-model="dialogNum1" max-width="290">
                        <v-card >
                            <v-toolbar
                            color="black"
                            height="30px"
                            dark
                            >배너 등록</v-toolbar>
                        <v-card-title style="margin-top:20px; font-size:17px">배너를 수정 하시겠습니까?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white" text @click="dialogMsgType" style=" background-color:black;margin-top:50px; width:120px; margin-right:10px;">확인</v-btn>
                            <v-btn color="white darken-1" text @click="close" style=" background-color:gray;margin-top:50px; width:120px;">취소</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
                <div>
                    <v-dialog v-model="dialogNum2" max-width="290" >
                        <v-card >
                            <v-toolbar
                            color="black"
                            height="30px"
                            dark
                            >{{toolMsg}}</v-toolbar>
                        <v-card-title style="margin-top:20px; font-size:17px">{{ dialogMsg }}</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white" text @click="close" v-if="closeT" style=" background-color:black;margin-top:50px; width:120px; margin-right:10px;">닫기</v-btn>
                            <v-btn color="white" text @click="close2" v-if="closeF" style=" background-color:black;margin-top:50px; width:120px; margin-right:10px;">닫기</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
                </div>
    </v-card>
    </v-container>
</template>

<script>
//  import dateInfo from '../../../utils/common';
 import axios from "axios"
//  import EventBus from '../../../../EventBus';
export default {
    props:['param','localGwOptions'],
    data() {
        return{
            pList: [],
            images: '',
            reqPagingInfo: {
                page_no: 1,
                view_cnt: 10
                },
            gw_id: '',
            resPagingInfo: {},
            istf: true,
            items: ["로그아웃 (300 X 200 px)", "왼쪽공지 (500 X 150 px)", "오른쪽공지 (500 X 150 px)"],
            items2: ["노출", "미노출"],
            items3: ["All", "Android", "IOS", "PC", "PCAPP"],
            vvitem:'',
            vitem: 
                {
                    tem1: false,
                    tem2: false,
                    tem3: false
                }
            ,
            // start_date: dateInfo().currentDateDashFormat,
            // end_date: dateInfo().oneMonthDashFormat,
            currentDateDashFormat2: Date(),
            imageName:'',
            bannerType: '',
            typedate:'',
            dispdate:'',
            dispdate2:'',
            editedItem: {
                bannerImage: {},
                title: '',
                // img_type: '',
                img_name: '',
                disp_yn: '',
                disp_start_date: '',
                disp_end_date: '',
                mod_id: '',
                mod_date: '',
                os_type:'',
                img_url:'',
                // reg_id: '',
                // cmd_type: '',
                // local_gw_id: '0',
            },
            dialogNum1: false,
            dialogMsg: '',
            toolMsg: '',
            dialogNum2: false,
            closeT:true,
            closeF:false,
        }
    },
    created(){
           this.$route.params.val.bannerImage
        //    this.$route.params.val.images
           this.editedItem.os_type = this.$route.params.val.os_type
           this.editedItem.title = this.$route.params.val.title
           this.$route.params.val.img_type
           this.editedItem.mod_id = this.$store.state.onmUserId
           this.editedItem.img_url = this.$route.params.val.img_url
           this.editedItem.img_name = this.$route.params.val.img_name
           this.typedate = this.$route.params.val.disp_yn
           this.dispdate = this.$route.params.val.disp_start_date.substring(0,10)
        //    .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
           this.dispdate2 = this.$route.params.val.disp_end_date.substring(0,10)
        //    .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        //    this.editedItem.mod_id = this.$route.params.val.reg_id
           if(this.$route.params.val.img_type == '로그아웃'){
               this.bannerType = '로그아웃 (300 X 200 px)'
           }
           if(this.$route.params.val.img_type == '왼쪽공지'){
               this.bannerType = '왼쪽공지 (500 X 150 px)'
           }
           if(this.$route.params.val.img_type == '오른쪽공지'){
               this.bannerType = '오른쪽공지 (500 X 150 px)'
           }
           if(this.$route.params.val.disp_yn == 'Y'){
               this.typedate = "노출"
           }
           if(this.$route.params.val.disp_yn == 'N'){
               this.typedate = "미노출"
           }
            this.selectType();
            this.istf = false
            console.log(this.editedItem);
            console.log(this.$route.params.val);
            this.images = process.env.VUE_APP_IMG_URL + this.$route.params.val.img_name
    },
    computed: {
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
        close () {
            this.dialogNum1 = false
            this.dialogNum2 = false
        },
        close2(){
            
            this.dialogNum1 = false
            this.dialogNum2 = false
            this.$router.push('/operation/vanner-management');
        },
        //미리보기
        onFileSelected(event){ 
            var input = event.target;
            console.log(input.files[0]);
                this.editedItem.img_name = input.files[0].name
                if (input.files && input.files[0]) { 
                var reader = new FileReader(); 
                    reader.onload = (e) => {
                        this.images = e.target.result;
                        
                    } 
                    reader.readAsDataURL(input.files[0]);
                    this.editedItem.bannerImage = input.files[0]
                    
                } 
                
            },
            selectType(){
                if(this.items[0]==this.bannerType){
                    this.vitem.tem1 = true
                    this.vitem.tem2 = false
                    this.vitem.tem3 = false
                }
                if(this.items[1]==this.bannerType){
                    this.vitem.tem1 = false
                    this.vitem.tem2 = true
                    this.vitem.tem3 = false
                }
                if(this.items[2]==this.bannerType){
                    this.vitem.tem1 = false
                    this.vitem.tem2 = false
                    this.vitem.tem3 = true
                }
            },
         saveItems(){
           var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15123/update_banner`
           console.log('서버에 전송되는 값') 
           console.log(this.editedItem)
            this.editedItem.disp_start_date = this.dispdate.substring(0,10).replace(/-/g,'')
            this.editedItem.disp_end_date = this.dispdate2.substring(0,10).replace(/-/g,'')
            if(this.typedate == this.items2[0]){
                this.editedItem.disp_yn = 'Y'
            }else{
                this.editedItem.disp_yn = 'N'
            }
           axios.post(url, this.editedItem, this.$store.state.headers)
            .then((response)=>{
                var resCode=response.data.res_code;
                var resMsg=response.data.res_msg;
                if(resCode==200){
                    this.pList.unshift(this.editedItem)
                        this.dialogNum2 = true
                        this.toolMsg = '배너 수정 완료'
                        this.dialogMsg = '배너가 수정 되었습니다'
                        this.closeT = false
                        this.closeF = true
                    // this.$fire({
                    //     title: "수정 되었습니다.",
                    //     type: "success"})
                }else{
                    this.$fire({
                        title: "등록 실패하였습니다123.",
                        html: resMsg,
                        type: "error"})
                        this.dialogNum1 = false
                }
            })
            .catch((ex)=>{
                this.$fire({
                    title: "등록 실패하였습니다.!!!",
                    text: ex,
                    type: "error"
                })
            })
        },
        checkYn(){
           this.dialogNum1 = true
        },
        dialogMsgType(){
           if(this.editedItem.img_type == ''){
               this.dialogNum2 = true
               this.toolMsg = '필수값 확인'
               this.dialogMsg = '배너 타입을 선택 해주세요'
               return 
            }else if(this.editedItem.title == ''){
                this.dialogNum2 = true
                this.toolMsg = '필수값 확인'
                this.dialogMsg = '제목을 입력 해주세요'
                return
            }else if(this.editedItem.bannerImage == ''){
                this.dialogNum2 = true
                this.toolMsg = '필수값 확인'
                this.dialogMsg = '배너 파일을 확인 해주세요'
                return
            }else{
            this.saveItems()
            }
        },
        test(){
            console.log(this.editedItem)
        }
        
    },  
}
</script>
<style>
 /* .size{
    width:500px;
    
}  */

.border-black {
  border: 1px solid black;
}
.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
}
.filebox label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    height: 40px;
    margin-left: 10px;
}
.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
</style>