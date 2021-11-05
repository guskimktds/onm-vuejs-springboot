<template>
 <v-container fluid>
      <v-card>
            <div class="title">
                <h3>
                <span v-bind:style="option_css">{{status_code_title}}</span>
                {{receivedValue.site_name}}
                <span v-show="isShowBtn === 1" style="margin-left:10px; padding:5px; ">
                <!-- <button @click="rejectRequest" style="margin-right:15px; margin-bottom:5px; background:darkGray;color:white; width:80px;border-radius:3px; padding:7px; font-size:12px; margin-top:1px;">반려</button> 
                <v-dialog
                v-model="dialog"
                max-width="500px"
                v-show="showAuth()"
                >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="black"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                    승인
                </v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline" >승인</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-radio-group
                            label="사용여부"
                            v-model="receivedValue.control_type"
                            row
                            mandatory>
                            <v-radio
                            label="NONE"
                            value="NONE"
                            checked
                            ></v-radio>  
                            <v-radio
                            label="API"
                            value="API">
                            </v-radio>
                            <v-radio
                            label="SITE"
                            value="SITE">
                            </v-radio>
                            <v-radio
                            label="BOTH"
                            value="BOTH">
                            </v-radio>
                        </v-radio-group>
                    </v-row>
                    <v-row>
                        <v-radio-group
                            label="사용여부"
                            v-model="receivedValue.control_yn"
                            row
                            mandatory
                            >
                            <v-radio
                            label="Y"
                            value="Y"
                            ></v-radio>  
                            <v-radio
                            label="N"
                            value="N">
                            </v-radio>
                        </v-radio-group>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="acceptRequest"
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
                </v-dialog> -->
            </span>
            </h3>
            </div>
            <v-tabs >
            <v-tab @click="passPageInfo(1,receivedValue.site_id)">서비스 업체 정보</v-tab>
            <v-tab @click="passPageInfo(2,receivedValue.site_id)">매장 관리</v-tab>
            <v-tab @click="passPageInfo(3,receivedValue.site_id)">API 호출 현황</v-tab>
            </v-tabs>
      </v-card>
        
      <v-card>
        <p style="width: 97%; text-align:right; margin-top: 10px;" v-show="getApi && isShowSeq === 1 && apiBtnDetail === 2">
            <button @click.prevent="reissueCert" style="margin-right:15px; background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">재발행</button>
            <button @click.prevent="deleteCert" style="background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">키삭제</button>        
        </p> 
        <p style="width: 97%; text-align:right; margin-top: 10px;" v-show="isShowSeq === 1 && apiBtnDetail === 3">
            <button disabled style="margin-right:15px; background:lightGray;color:white; width:80px;border-radius:3px; margin-top:15px;">재발행</button>
            <button disabled style="margin-right:15px; background:lightGray;color:white; width:80px;border-radius:3px; margin-top:15px;">키삭제</button>
            <button @click.prevent="reissueCert" style="background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">키생성</button>        
        </p> 
       <v-form v-show="getApi && isShowSeq === 1">    
            <v-row style="margin-top: -30px;">
                <v-col cols="2" style="padding:39px 0px; margin-left: 35px; flex: 0 0 7%; font-size:12px;">
                    <label id ="cert_key">
                        인증키:
                    </label>
                </v-col>
                <v-col cols="3" style="padding-top:30px; margin-left:21px;">
                    <v-text-field
                    v-model="apiInfo.cert_key"
                    id="cert_key"
                    disabled
                    >
                    </v-text-field>
                </v-col>
            </v-row>
                <v-row style="margin-top: -20px;">
                <v-col cols="2" style="padding:39px 0px; margin-left: 35px; flex: 0 0 7%; font-size:12px;">
                        <label id ="cert_start_date">
                            인증시작시간:
                        </label>
                </v-col>
                <v-col cols="2" style="padding: 30px; margin-left:-5px;">
                    <v-text-field
                    v-model="apiInfo.cert_start_date"
                    id="cert_start_date"
                    disabled
                    >
                    </v-text-field>
                </v-col>
                    <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 7%; font-size:12px;">
                    <label id ="cert_end_date">
                        인증종료시간:
                    </label>
                </v-col>
                <v-col cols="2" style="padding: 30px;">
                    <v-text-field
                    v-model="apiInfo.cert_end_date"
                    id="cert_end_date"
                    disabled
                    >
                    </v-text-field>
                </v-col> 
            </v-row>
        </v-form>
        <service-com-info v-show="isShowSeq==1"
            v-bind:receivedValue="receivedValue"
        >
        </service-com-info>  
        <store-management v-show="isShowSeq==2">
        </store-management>
      </v-card>
 </v-container>
</template>
<script>

import serviceComInfo from './serviceComInfo.vue';
import storeManagement from './storeManagement.vue';
//mport EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}
    export default{
        created(){
            const site_id = this.$route.params.site_id;
            const status_code = this.$route.params.status_code;
            const site_name = this.$route.params.site_name;
            this.receivedValue.site_id = site_id;
            this.receivedValue.site_name = site_name;
            this.receivedValue.status_code = status_code;
            if(status_code === 'U'){
                this.getApi = true;
                this.getApiInfo();
                this.apiBtnDetail = 2;
            }else if(status_code==='D'){
                this.getApi = false;
                this.apiBtnDetail = 3;
            }
            this.checkStatus(status_code);
            this.passPageInfo(1,site_id);
        },
        methods:{
            passPageInfo(isShowSeq,site_id){  //넘어온 값에 대한 확인 여부
                this.isShowSeq = isShowSeq;
                if(!site_id){
                    alert("데이터 정보가 존재하지 않습니다.");
                    this.$router.push({name: "approval-store"})
                    return;
                }
            },
            checkStatus(status_code){   //업체 상태에 따른 css
                if(status_code === 'A'){
                    this.status_code_title = '신청';
                    this.receivedValue.status_code = 'A';
                    this.option_css.background = 'red';
                    //this.isShowBtn = 1; //승인 및 반려 버튼 
                }else if(status_code ==='R'){
                    this.status_code_title = '반려';
                    this.option_css.background = 'lightgray';
                    this.receivedValue.status_code = 'R';
                }else if(status_code ==='U'){
                    this.status_code_title = '사용중';
                    this.receivedValue.status_code = 'U';
                    this.option_css.background = 'green';
                }else if(status_code ==='D'){
                    this.status_code_title = '미사용';
                    this.receivedValue.status_code = 'D';
                    this.option_css.background = '#ffd400';
                }
            },
            // rejectRequest(){  //승인신청 거절하는 method
            //     var vm = this;
            //     var result = confirm("신청을 반려하시겠습니까?");
            //     if(result){
            //         var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`;// 다시 만들기
    
            //         axios.post(url,this.receivedValue.site_id,headers) 
            //         .then((response) => {
            //             alert("신청이 반려되었습니다.");
            //             console.log(response);
            //             //this.receivedValue.status_code= response.data.data.status_code;
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //             alert("반려 신청 중 오류가 생겼습니다.");
            //             vm.isShowBtn = 0;
            //             vm.option_css.background = 'lightGray';
            //             vm.status_code_title = "반려";
            //         })
            //         .finally(function () {
            //             // always executed
            //         });
            //     }else{
            //         alert("반려진행이 취소되었습니다.")
            //         return;
            //     }
            // },
            // acceptRequest(){ //승인요청을 받아주는 method
            //     var result = confirm("신청을 승인하시겠습니까?");
            //     if(result){
            //         var vm = this;
            //         var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`;
            //         axios.post(url,this.receivedValue.site_id,headers) // 다시 만들기
            //         .then((response) => {
            //             alert("신청이 승인되었습니다.");
            //             //this.receivedValue.status_code= response.data.data.status_code;
            //             console.log(response);
            //             this.dialog = false;   
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //             alert("승인 신청 중 오류가 생겼습니다.");
            //             vm.isShowBtn = 0;
            //             vm.option_css.background = 'green';
            //             vm.status_code_title = "사용중";
            //             vm.getApi = true;
            //             vm.apiBtnDetail =2;
            //             vm.getApiInfo();
            //             vm.dialog = false;
            //             vm.receivedValue.control_yn = 'N';  //추후에 지우지 않기
            //             vm.receivedValue.control_type = 'NONE'; //추후에 지우지 않기
            //         })
            //         .finally(function () {
            //             // always executed
            //         });
            //     }else{
            //         alert("승인진행이 취소되었습니다.");
            //         this.receivedValue.control_yn = 'N';  //추후에 지우지 않기
            //         this.receivedValue.control_type = 'NONE'; //추후에 지우지 않기
            //         this.dialog = false;
            //         return;
            //     }
            // },
            getApiInfo(){ //키 정보 가져오는 method
                 var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`;
                 var vm  = this;
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {  
                        console.log(response);   
                        const cert_key = response.data.data.apiNo;
                        const cert_start_date = response.data.data.cert_start_date;
                        const cert_end_date = response.data.data.cert_end_date;
                        this.apiInfo.cert_key = cert_key;
                        this.apiInfo.cert_start_date = cert_start_date;
                        this.apiInfo.cert_end_date = cert_end_date;
                    })
                    .catch(function (error) {
                        console.log(error);
                        const cert_key = 'abc30448390ccc0303030k0c789';
                        const cert_start_date = '202111021348';
                        const cert_end_date = '202111021348';
                        vm.apiInfo.cert_key = cert_key;
                        vm.apiInfo.cert_start_date = cert_start_date;
                        vm.apiInfo.cert_end_date = cert_end_date;
                    })
                    .finally(function () {
                        // always executed
                    });
            },
            reissueCert(){
                var result = confirm("키를 생성하시겠습니까?");
                if(result){
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`;
                    var vm  = this;
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {  
                        console.log(response);
                        if(response.data.data.res_code === 'S'){
                            vm.getApiInfo();
                        }else{
                            alert("키 발생 중 문제가 생겼습니다.");
                            return;
                        }   
                    })
                    .catch(function (error) {
                        alert("오류가 발생했습니다.");
                        vm.getApiInfo();
                        vm.getApi = true;
                        vm.option_css.background = "green";
                        vm.status_code_title = "사용중";
                        vm.apiBtnDetail = 2;
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
                }else{
                    alert("재발행 진행을 취소했습니다.")    
                }
            },
            deleteCert(){
                var result = confirm("키를 삭제하시겠습니까?");
                if(result){
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`;
                    var vm  = this;
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {  
                        console.log(response);
                        if(response.data.data.res_code === 'S'){
                            vm.apiBtnDetail = 3;
                            vm.option_css.background = "#ffd400";
                            vm.status_code_title = "미사용";
                            vm.getApi = false;
                        }else{
                            alert("키 삭제 중 문제가 생겼습니다.");
                            return;
                        }   
                    })
                    .catch(function (error) {
                        alert("오류가 발생했습니다.");
                        vm.apiBtnDetail = 3;
                        vm.option_css.background = "#ffd400";
                        vm.status_code_title = "미사용";
                        vm.getApi = false;

                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
                }
            },
            // showAuth(){
            //     return true;
            // },
            // closeSure(){
            //     this.receivedValue.control_yn = 'N';
            //     this.receivedValue.control_type = 'NONE';
            //     this.dialog = false
            // }
        },
        data(){
            return{
                receivedValue:{
                    site_id: '',
                    site_name: '',
                    status_code:'',
                    changeInfo: 'N',
                    // control_yn:'N',
                    // control_type:'NONE',
                },
                isShowSeq: 1,
                //isShowBtn: 0,
                status_code_title:'',
                option_css:{
                    background: '',
                    color: 'white',
                    padding: '5px',
                },
                getApi: '',
                apiInfo:{
                    cert_key:'',
                    cert_start_date:'',
                    cert_end_date:'',
                },
                apiBtnDetail:'',
                //dialog : false,
            }
        },
        components:{
            serviceComInfo,
            storeManagement,
        },
    }
</script>
<style scoped>
*{margin:0; padding:0;}
ul{list-style:none;}
a{text-decoration:none; color:#333;}
.wrap{padding:15px; letter-spacing:-0.5px;}
.tab_menu{position:relative;}
.tab_menu .list{overflow:hidden;}
.tab_menu .list li{float:left; margin-right:14px;}
.tab_menu .list .btn{font-size:13px;}
.tab_menu .list .cont{display:none; position:absolute; top:25px; left:0; background:#555; color:#fff; text-align:center; width:250px; height:100px; line-height:100px;}
.tab_menu .list li.is_on .btn{font-weight:bold; color:green;}
.tab_menu .list li.is_on .cont{display:block;}

.title h3{
    margin-left: 25px;
    padding-top: 15px;
    font-size : 15px;
};
.regular-tables{
    background-color: yellow;
}
.d-flex grow flex-wrap{
    background-color: yellow;
}

</style>