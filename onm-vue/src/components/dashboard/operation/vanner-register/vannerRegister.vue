<template>   
    <v-container fluid>
        <v-row>
            <v-col cols="auto">
                <h1 style="margin-left: 10px">배너 등록</h1>
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
                    등록 완료
                </v-btn>
            </v-col>
        </v-row>
    <v-card fluid >
        <v-row style="margin-left:30px; padding-top:25px">
            <v-col cols="auto" style="padding-top:25px;"><span style="color:red;">*</span>배너 타입</v-col>
            <v-col><v-select 
            label="선택"
            :items="items"
            v-model="typedata"
            solo
            @change="selectType"
            style="width: 200px;"
            ></v-select></v-col>
        </v-row>
        <v-row style="margin-left:30px;">
            <v-col cols="auto" style="padding-top:35px; margin-right:30px;"><span style="color:red;">*</span>제목</v-col>
            <v-col>
                <v-text-field label="입력" style="width: 500px" v-model="editedItem.title" maxlength="200"></v-text-field>
            </v-col>
        </v-row>
        <v-row style="margin-left:30px; padding-top:35px;">
            <v-col cols="auto" style="padding-top:25px;"><span style="color:red;">*</span>노출 여부</v-col>
            <v-col cols="auto">
            <v-select
            :items="items2"
            v-model="typedata2"
            solo
            style="width: 100px;"
            ></v-select></v-col>
            <v-col cols="auto" style="padding-top:25px; padding-left:150px"><span style="color:red;">*</span>OS 타입</v-col>
            <v-col cols="auto">
            <v-select 
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
                        style="width:150px"
                        
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
                        style="width:150px"
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
            <div class="filebox">
                <input class="upload-name" v-model="editedItem.img_name" readonly placeholder="파일명">
                <label for="file">파일찾기</label> 
                <input type="file" id="file" @change="onFileSelected" accept="image/png, image/gif, image/jpeg, image/jpg">
            </div>
            </v-col>
        </v-row>
        <v-row style="margin-left:30px;">
            <v-col cols="auto" style="padding-top:35px;" >
                <span style="color:red;">*</span>Link URL
            </v-col>
            <v-col>
                <v-text-field label="입력" style="width: 520px; padding-left: 5px;" v-model="editedItem.img_url" maxl3ength="200"></v-text-field>
            </v-col>
        </v-row>
            <v-container 
            style="width:550px; height: 450px; margin-left: 132px; border:1px solid #999999; margin-top: 10px;"
            id="file">
            <div v-if="istf" style="width: 400px; height: 300px; margin-left: -15px;">
               <span v-if="istf" style="margin-left:20px"> 배너 이미지 미리보기 영역1</span></div>

            <div v-if="vitem.tem1" style="height:300px;width:200px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem1" style='max-height:100%;width:100%;'></v-img></div>

            <div v-if="vitem.tem2" style="height:150px;width:500px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem2" style='height:100%;width:100%;'></v-img></div>

            <div v-if="vitem.tem3" style="height:150px;width:500px; overflow: hidden">
            <v-img :src="images" v-if="vitem.tem3" style='height:100%;width:100%;'></v-img></div>
            
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
                        <v-card-title style="margin-top:20px; font-size:17px">배너를 등록 하시겠습니까?</v-card-title>
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
                            <v-btn color="white" text @click="close" style=" background-color:black;margin-top:50px; width:120px; margin-right:10px;" v-if="move">닫기</v-btn>
                            <v-btn color="white" text @click="close2" style=" background-color:black;margin-top:50px; width:120px; margin-right:10px;" v-if="move2">닫기</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
                </div>
    </v-card>
    </v-container>
</template>
PC PCAPP IOS ANDROID ALL
<script>
 import dateInfo from '../../../utils/common';
 import axios from "axios"
export default {
    props:['param', 'localGwOptions'],
    data() {
        return{
            pList: [],
            images: {},
            images2: '',
            reqPagingInfo: {
                page_no: 1,
                view_cnt: 10
                },
            gw_id: '',
            resPagingInfo: {},
            istf: true,
            items: ["로그아웃 (300 X 200 px)", "왼쪽배너 (500 X 150 px)","오른쪽배너 (500 X 150 px)"],
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
            move:true,
            move2:false,
            editedItem: {
                bannerImage: {},
                title: '',
                img_type: '',
                img_name: '',
                disp_yn: '노출',
                disp_start_date: dateInfo().currentDateDashFormat,
                disp_end_date: dateInfo().oneMonthDashFormat,
                reg_id: '',
                reg_date: dateInfo().currentDateDashFormat,
                os_type: 'All',
                mod_date: dateInfo().currentDateDashFormat,
                // origin_name: '',
                img_url: '',
                // img_path: '',
                // cmd_type: '',
                // local_gw_id: '0',
            },
            dialogNum1: false,
            dialogMsg: '',
            toolMsg: '',
            dialogNum2: false,
            typedata:'',
            typedata2:'노출',
            dispdate:dateInfo().currentDateDashFormat,
            dispdate2:dateInfo().oneMonthDashFormat,
             headers: {
            'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
            'Content-Type': 'multipart/form-data'
          },
        }
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
        close () {
            this.dialogNum1 = false
            this.dialogNum2 = false
            // this.$nextTick(() => {
            // this.editedItem = Object.assign({}, this.defaultItem)
            // // this.editedIndex = -1
            // })
        },
        close2(){
            this.dialogNum1 = false
            this.dialogNum2 = false
            this.$router.push('/operation/vanner-management');
        },
        //미리보기
        onFileSelected(event){ 
            var input = event.target;
                this.editedItem.img_name = input.files[0].name
                if (input.files && input.files[0]) { 
                var reader = new FileReader(); 
                    reader.onload = (e) => {
                        this.images = e.target.result;
                        this.selectType();
                    } 
                    reader.readAsDataURL(input.files[0]);
                    if(input.files){
                    this.editedItem.bannerImage = input.files[0]
                    // const formData = new FormData()
                    // formData.append('files', this.editedItem.banner_image)
                    }
                    this.istf = false
                }
            },
            selectType(){
            if(this.images != ''){
                if(this.items[0]==this.typedata){
                    this.vitem.tem1 = true
                    this.vitem.tem2 = false
                    this.vitem.tem3 = false
                }
                if(this.items[1]==this.typedata){
                    this.vitem.tem1 = false
                    this.vitem.tem2 = true
                    this.vitem.tem3 = false
                }
                if(this.items[2]==this.typedata){
                    this.vitem.tem1 = false
                    this.vitem.tem2 = false
                    this.vitem.tem3 = true
                }
            }
            },
         saveItems(){
           var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15121/upload_banner`
           console.log('서버에 전송되는 값') 
           console.log(this.editedItem)
           this.editedItem.reg_id = this.$store.state.onmUserId
           this.editedItem.disp_start_date = this.dispdate.replace(/-/g,'')
           this.editedItem.disp_end_date = this.dispdate2.replace(/-/g,'')
           this.editedItem.reg_date = this.editedItem.reg_date.replace(/-/g,'')
           this.editedItem.mod_date = this.editedItem.mod_date.replace(/-/g,'')
           if(this.typedata == this.items[0]){
               this.editedItem.img_type = 'LOGOUT'
           }
           if(this.typedata == this.items[1]){
               this.editedItem.img_type = 'CATE01'
           }
           if(this.typedata == this.items[2]){
               this.editedItem.img_type = 'CATE02'
           }
           if(this.typedata2 == this.items2[0]){
                this.editedItem.disp_yn = 'Y'
            }else{
                this.editedItem.disp_yn = 'N'
            }

            const formData = new FormData();
            formData.append('img_name', this.editedItem.img_name)
            formData.append('img_type', this.editedItem.img_type)
            formData.append('disp_start_date', this.editedItem.disp_start_date)
            formData.append('disp_end_date', this.editedItem.disp_end_date)
            formData.append('title', this.editedItem.title)
            formData.append('disp_yn', this.editedItem.disp_yn)
            formData.append('bannerImage', this.editedItem.bannerImage)
            formData.append('reg_id', this.editedItem.reg_id)
            formData.append('reg_date', this.editedItem.reg_date)
            formData.append('os_type', this.editedItem.os_type)
            formData.append('mod_date', this.editedItem.mod_date)
            formData.append('img_url', this.editedItem.img_url)
          
           axios.post(url, formData, this.headers)
            .then((response)=>{
                var resCode=response.data.res_code;
                var resMsg=response.data.res_msg;
                if(resCode==200){
                    this.pList.unshift(this.editedItem)
                        this.dialogNum2 = true
                        this.toolMsg = '배너 등록 완료'
                        this.dialogMsg = '배너가 등록 되었습니다'
                        this.move = false
                        this.move2 = true
                        
                    // this.$fire({
                    //     title: "등록 되었습니다.",
                    //     type: "success"})
                }else{
                    this.$fire({
                        title: "등록 실패하였습니다.",
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
           if(this.typedata == ''){
               this.dialogNum2 = true
               this.toolMsg = '필수값 확인'
               this.dialogMsg = '배너 타입을 선택 해주세요'
               return 
            }else if(this.editedItem.title == ''){
                this.dialogNum2 = true
                this.toolMsg = '필수값 확인'
                this.dialogMsg = '제목을 입력 해주세요'
                return
            // }else if(this.dispdate <= dateInfo().currentDateDashFormat){
            //     this.dialogNum2 = true
            //     this.toolMsg = '필수값 확인'
            //     this.dialogMsg = '노출 기간은 오늘 이후 날짜로 설정 가능합니다'
            //     return
            }else if(this.editedItem.img_name == ''){
                this.dialogNum2 = true
                this.toolMsg = '필수값 확인'
                this.dialogMsg = '배너 파일을 확인 해주세요'
                return
            }else{
            this.saveItems()
            }
        },
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