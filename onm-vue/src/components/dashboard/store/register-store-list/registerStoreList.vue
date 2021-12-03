<template>
 <v-container fluid>
      <v-card>
            <div class="title">
                <h3>
                <span v-bind:style="option_css">{{status_code_title}}</span>
                {{receivedValue.site_name}}
                </h3>
            </div>
            <v-tabs >
            <v-tab @click="passPageInfo(1,receivedValue.site_id)">서비스 업체 정보</v-tab>
            <v-tab @click="passPageInfo(2,receivedValue.site_id)">매장 관리</v-tab>
            <v-tab @click="passPageInfo(3,receivedValue.site_id)">API 호출 현황</v-tab>
            </v-tabs>
      </v-card>
        
      <v-card>
        <p style="width: 99%; text-align:right; margin-top: 10px;" v-show="getApi && isShowSeq === 1 && apiBtnDetail === 2">
            <button @click.prevent="reissueCert" style="margin-right:15px; background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">재발행</button>
            <button @click.prevent="deleteCert" style="background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">키삭제</button>        
        </p> 
        <p style="width: 98%; text-align:right; height:50px; margin-top: 15px;" v-show="isShowSeq === 1 && apiBtnDetail === 3">
            <button @click.prevent="reissueCert" style="background:black;color:white; width:80px;border-radius:3px; margin-top:15px;">키생성</button>        
        </p> 
       <v-form v-show="getApi && isShowSeq === 1">    
            <v-row style="margin-top: -30px;">
                <v-col cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 5%; font-size:12px;">
                    <label id ="cert_key">
                        인증키:
                    </label>
                </v-col>
                <v-col cols="8"> 
                    <p style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; whdth:100px; height:20px; padding:35px; border-bottom-style : solid; ">
                        {{apiInfo.cert_key}}
                    </p>
                </v-col>
                <v-col  style="margin-left:30px; padding-top:20px; font-size:12px;">
                   <v-dialog
                        v-model="dialog"
                        max-width="900px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="indigo"
                            v-bind="attrs"
                            v-on="on"
                            class="certKeyDetails"
                        >
                            자세히 보기
                        </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline" >인증키</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <div style="padding:5px; ">
                                        <div style="width:95%; text-align:left">
                                            {{apiInfo.cert_key}}
                                        </div>
                                    </div>        
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="closeSure"
                                >
                                닫기
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>  
                </v-col>
            </v-row>
                <v-row style="margin-top: -20px;">
                <v-col cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 7%; font-size:12px;">
                        <label id ="cert_start_date">
                            인증시작시간:
                        </label>
                </v-col>
                <v-col cols="2" style="padding: 30px; margin-left:-5px; font-size:12px;">
                    <v-text-field   
                    v-model="apiInfo.cert_start_date"
                    id="cert_start_date"
                    disabled
                    >
                    </v-text-field>
                </v-col>
                    <v-col  cols="auto" style="padding:39px 0px; margin-left: 73px; flex: 0 0 7%; font-size:12px;">
                    <label id ="cert_end_date">
                        인증종료시간:
                    </label>
                </v-col>
                <v-col cols="2" style="padding: 30px; font-size:12px;">
                    <v-text-field
                    v-model="apiInfo.cert_end_date"
                    id="cert_end_date"
                    disabled
                    >
                    </v-text-field>
                </v-col> 
            </v-row>
        </v-form>
        </v-card>
        <v-card>
        <service-com-info v-show="isShowSeq==1"
            v-bind:receivedValue="receivedValue"
        >
        </service-com-info>  
        <store-management v-show="isShowSeq==2"
            v-bind:receivedValue="receivedValue"
        >
        </store-management>
      </v-card>
 </v-container>
</template>
<script>

import serviceComInfo from './serviceComInfo.vue';
import storeManagement from './storeManagement.vue';
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
            if(status_code === 'S'){
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
                }else if(status_code ==='F'){
                    this.status_code_title = '반려';
                    this.option_css.background = 'lightgray';
                    this.receivedValue.status_code = 'F';
                }else if(status_code ==='S'){
                    this.status_code_title = '사용중';
                    this.receivedValue.status_code = 'S';
                    this.option_css.background = 'green';
                }else if(status_code ==='D'){
                    this.status_code_title = '미사용';
                    this.receivedValue.status_code = 'D';
                    this.option_css.background = '#ffd400';
                }
            },
            getApiInfo(){ //키 정보 가져오는 method
                 var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13033/get_cert_info`;
              
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {    
                          if(response.data.res_code === 200){
                            this.apiInfo.cert_key = response.data.data.cert_key;
                            this.apiInfo.cert_start_date = response.data.data.cert_start_date;
                            this.apiInfo.cert_end_date = response.data.data.cert_end_date;

                        }else{
                            alert("키를 가져오는 중 문제가 발생하였습니다.");
                            return;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                });
            },
            reissueCert(){
                var result = confirm("키를 생성하시겠습니까?");
                if(result){
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13034/issue_certKey`; 
                 
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {  
                        if(response.data.res_code === 200){
                            alert("키 생성이 되었습니다.");
                            this.getApiInfo();
                            this.checkStatus('S');
                            this.getApi = true;
                            this.apiBtnDetail = 2;
                        }else{
                           alert("키 생성 중 문제가 생겼습니다.");
                            return;
                        }   
                    })
                    .catch(function (error) {
                        console.log(error);   
                    })
                    .finally(function () {
                        // always executed
                    });
                }else{
                     this.$fire({
                       title: "생성이 취소되었습니다.",
                       type : "error",
                       html: ""
                   })
                }
            },
            deleteCert(){
                var result = confirm("키를 삭제하시겠습니까?");
                if(result){
                    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13035/delete_certKey`;
                    // var vm  = this;
                    axios.post(url,this.receivedValue,headers) // 다시 만들기(상태코드랑 site_id)
                    .then((response) => {   
                        console.log(response);
                        if(response.data.res_code === 200){
                            alert("키가 삭제되었습니다.")
                            this.apiBtnDetail = 3;
                            this.getApi = false;
                            this.receivedValue.status_code = response.data.data.status_code;
                            this.checkStatus(this.receivedValue.status_code);
                         
                        }else{
                            alert("키 삭제 중 문제가 생겼습니다.");
                            return;
                        }   
                    })
                    .catch(function (error) {
                        alert("오류가 발생했습니다.");
                        console.log(error);
                        return;
                    })
                    .finally(function () {
                        // always executed
                    });
                }else{
                    this.$fire({
                       title: "삭제가 취소되었습니다.",
                       type : "error",
                       html: ""
                   })
                }
            },
            closeSure(){
                this.dialog = false;
            },
        },
        data(){
            return{
                receivedValue:{
                    site_id: '',
                    site_name: '',
                    status_code:'',
                    changeInfo: 'N',
                },
                isShowSeq: 1,
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
                dialog: false,
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
.certKeyDetails{ 
    width:90px;
    border-radius:3px;
    font-size:10px; 
    margin: 8px 0 0 -20px;

}

</style>