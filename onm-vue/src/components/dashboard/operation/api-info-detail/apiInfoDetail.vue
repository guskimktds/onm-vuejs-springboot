<template>
<div>
    <v-container fluid
        style="margin-top: -30px;"
    >
      <v-card>
            <div class="title" v-show="mainBtn === 1">
                <h3>
                    <span v-bind:style="option_css">{{status_code_title}}</span>
                    {{receivedValue.site_name}}
                    <p style="float:right; margin-top: -8px;">
                        <button @click="rejectRequest" 
                        style="margin-right:15px; margin-bottom:5px; background:darkGray;color:white; 
                        width:80px;border-radius:3px; padding:7px; font-size:12px; margin-top:1px;"
                        >반려</button> 
                        <button @click="acceptRequest" 
                        style="margin-right:15px; margin-bottom:5px; background:black;color:white; 
                        width:80px;border-radius:3px; padding:7px; font-size:12px; margin-top:1px;"
                        >승인</button> 
                    </p> 
                </h3>
            </div>
            <div class="title" v-show="mainBtn === 0">
                <h3>
                    <span v-bind:style="option_css">{{status_code_title}}</span>
                    {{receivedValue.site_name}}
                    <p style="float:right; margin-top: -8px;">
                        <!-- <button @click="rejectRequest" 
                        style="margin-right:15px; margin-bottom:5px; background:darkGray;color:white; 
                        width:80px;border-radius:3px; padding:7px; font-size:12px; margin-top:1px;"
                        >반려</button>  -->
                        <button @click="acceptRequest" 
                        style="margin-right:15px; margin-bottom:5px; background:black;color:white; 
                        width:80px;border-radius:3px; padding:7px; font-size:12px; margin-top:1px;"
                        >저장</button> 
                    </p> 
                </h3>
            </div>
      </v-card>
      <v-card>
        <v-form>                   
            <v-row style="margin-left:5px;">
                <v-col  cols="2" style="padding:39px 0px; margin-left: 35px; flex: 0 0 8%; font-size:12px;">
                    <label id ="site_id">
                        업체ID:
                    </label>
                </v-col>
                <v-col cols="2" >
                    <v-text-field
                    v-model="getValue.site_id"
                    disabled
                    id="site_id"
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
                    <v-col  cols="auto" style="padding:39px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                    <label id ="site_name">
                            업체명:
                    </label>
                </v-col>
                <v-col cols="2" >
                    <v-text-field
                    v-model="getValue.site_name"
                    disabled
                    id="site_name"
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col  cols="2" style="padding:15px 0px; margin-left: 50px; flex: 0 0 8%; font-size:12px;">
                    <label id ="user_name">
                        고객명:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;" >
                    <v-text-field
                    v-model="getValue.user_name"
                    disabled
                    id="user_id"
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
                    <v-col  cols="auto" style="padding:15px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                    <label id ="tel_no">
                        연락처:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;">
                    <v-text-field
                    placeholder="(-)없이 번호만 입력"
                    v-model="getValue.tel_no"
                    disabled
                    id="tel_no"
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col  cols="2" style="padding:15px 0px; margin-left: 50px; flex: 0 0 8%; font-size:12px;">
                    <label id ="reg_date">
                        등록일자:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;">
                    <v-text-field
                    v-model="getValue.reg_date"
                    id="reg_date"
                    disabled
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
                <v-col  cols="auto" style="padding:15px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                <label id ="mod_date">
                        수정일자:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;" >
                    <v-text-field
                    v-model="getValue.mod_date"
                    id="mod_date"
                    disabled
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col  cols="2" style="padding:15px 0px; margin-left: 50px; flex: 0 0 8% ; font-size:12px;">
                    <label id ="adm_id">
                        승인자:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;" >
                    <v-text-field
                    v-model="getValue.adm_id"
                    id="adm_id"
                    disabled
                    style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
                <v-col  cols="auto" style="padding:15px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                        승인일자:
                    <label id ="adm_access_date">
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;" >
                    <v-text-field
                    v-model="getValue.adm_access_date"
                    id="adm_access_date"
                    disabled
                    style="font-size:15px;"
                    >
                    </v-text-field>
                    </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" style="padding:15px 0px; margin-left: 50px; flex: 0 0 8%; font-size:12px;">
                    <label id ="control_type">
                        제한종류:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;">
                    <v-select 
                        id = "controlType"
                        item-text="name" 
                        item-value="value" 
                        :items="access_limit_list"
                        label="제한 종류 " 
                        v-model="defaultSelected.value" 
                        v-on:change="chooseControlType"
                        style="font-size:15px;"
                    >
                </v-select>
                </v-col>
                <v-col cols="2" style="padding:15px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                    <label id ="limit_type">
                        제한 기간 타입:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;">
                    <v-select 
                    id = "controlType"
                    item-text="name" 
                    item-value="value" 
                    :items="access_limit_type_list"
                    v-model="defaultTypeSelected.value" 
                    v-on:change="chooseAccess_limit_type"
                    style="font-size:15px;"
                    >
                    </v-select>
                </v-col>
            </v-row>
            <v-row >
                <v-col  cols="2" style="padding:15px 0px; margin-left: 50px; flex: 0 0 8%; font-size:12px;">
                    <label id ="site_access_limit">
                        SITE제한량:
                    </label>
                </v-col>
                <v-col cols="2" style="margin-top:-25px;">
                    <v-text-field
                        v-model="getValue.site_access_limit"
                        id="site_access_limit"
                         v-on:keyup="checkNumber(getValue.site_access_limit,1)"
                         style="font-size:15px;"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <v-container
        id="regular-tables"
        tag="section">
            <base-material-card
            title="API 목록"
            class="px-5 py-3"
            >
                <table width=100% v-show="receivedValue.selectedApi.length > 0">
                    <tr>
                        <th >API No</th>
                        <th stlye="padding:3px;">Description</th>
                        <th stlye="padding:3px;">제한 단위/량</th>
                    </tr>
                    <tr v-for="(api,index) in receivedValue.selectedApi" :key="index">
                        <td > 
                            {{api.api_no}}
                        </td>
                        <td >
                            {{api.description}}
                        </td>
                        <td>
                            <v-text-field
                            v-model="api.api_access_limit"
                            v-on:keyup="checkNumber(api.api_access_limit,2,index)"
                            >
                            </v-text-field>
                        </td>
                    </tr>            
                </table>
                <p v-show="receivedValue.selectedApi.length === 0" style="margin-top:20px; font-size:15px;">
                    사용하는 API가 존재하지 않습니다.
                </p>    
                    </base-material-card>
                </v-container>
                 <p style="margin:-10px 0 0 10px; padding-bottom:10px;">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="backPage"
                        >
                        뒤로
                    </v-btn>
                 </p>
            </v-card>        
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import EventBus from '../../../../EventBus';
const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}
export default ({
        created(){

            const site_id = this.$route.params.site_id;
            this.receivedValue.site_id = site_id;
            this.receivedValue.site_name = this.$route.params.site_name;
            this.passPageInfo(site_id);
            this.getApiInfo();    
    },
    data(){
        return{
            receivedValue:{
                site_id: '',
                status_code:'',
                selectedApi:[],
                access_limit_type: '',
                site_access_limit: '',
                control_type: '',
            },
            getValue:{
                site_id:'',
                site_name: '',
                status_code:'',
                user_name:'',
                mod_date:'',
                reg_date:'',
                adm_id:'',
                tel_no:'',
                adm_access_date : '',
                control_type : '',
                site_access_limit:'',
                access_limit_type:'',
            },
            status_code_title:'',
            option_css:{
                background: '',
                color: 'white',
                padding: '5px',
            },
            access_limit_list:[
                {name:'제한없음', value:'NONE'},
                {name:'API 제한', value:'API'},
                {name:'SITE 제한', value:'SITE'},
                {name:'SITE + API 제한', value:'BOTH'},
            ],
            access_limit_type_list:[
                {name:'매년', value:'Y'},
                {name:'매월', value:'YM'},
                {name:'매일', value:'YMD'},
                {name:'제한없음', value:''},
            ],
            defaultSelected: {
                name: "",
                value: ""
            },
            defaultTypeSelected: {
                name: "",
                value: ""
            },
            api_list:[],
            limit_type:'',
            control_type_list:'',
            mainBtn: '',
          
        }
    },
    methods:{
        getApiInfo(){
               if(this.receivedValue.site_id){
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13036/get_siteInfoDetails`
                var tsJson = new Object();
                tsJson.site_id = this.receivedValue.site_id; 
                
                axios.post(url, tsJson, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                        this.getValue.site_id = response.data.data.site_info.site_id;  
                        this.getValue.site_name = response.data.data.site_info.site_name;
                        this.getValue.status_code = response.data.data.site_info.status_code;
                        this.getValue.user_name = response.data.data.site_info.mng_name;
                        this.getValue.mod_date = response.data.data.site_info.mod_date;
                        this.getValue.reg_date = response.data.data.site_info.reg_date;
                        this.getValue.adm_id = response.data.data.site_info.adm_id;
                        this.getValue.tel_no = response.data.data.site_info.mng_no;
                        this.getValue.adm_access_date = response.data.data.site_info.adm_access_date;
                        this.getValue.control_type = response.data.data.site_info.control_type;
                        this.getValue.site_access_limit = response.data.data.site_info.site_access_limit;
                        this.getValue.access_limit_type = response.data.data.site_info.access_limit_type;


                        this.receivedValue.site_id = this.getValue.site_id;
                        this.api_list=response.data.data.api_list;
                        this.checkStatus(this.getValue.status_code);
                     
                        if(this.getValue.access_limit_type === 'Y'){ // 사용 제한 타입 
                            this.limit_type = "매년";
                        }else if(this.getValue.access_limit_type === 'YM'){
                            this.limit_type = "매월";
                        }else if(this.getValue.access_limit_type === 'YMD'){
                            this.limit_type = "매일";
                        }else{
                            this.limit_type= "-";
                        }

                        
                        if(this.getValue.control_type === 'BOTH'){ // controltype 
                            this.control_type_list = 'SITE + API 제한';
                        }else if(this.getValue.control_type === 'API'){
                            this.control_type_list = 'API 제한';
                        }else if(this.getValue.control_type === 'SITE'){
                            this.control_type_list  = 'SITE 제한';
                        }else if(this.getValue.control_type === 'NONE'){
                            this.control_type_list  = '제한 없음';
                        }

                        this.defaultSelected.name = this.control_type_list;
                        this.defaultSelected.value = this.getValue.control_type;

                        this.defaultTypeSelected.name = this.limit_type;
                        this.defaultTypeSelected.value = this.getValue.access_limit_type;

                        if(this.getValue.status_code === 'A'){
                            this.mainBtn = 1;
                        }else {
                            this.mainBtn = 0;
                        }
                       this.receivedValue.selectedApi.length = 0;

                        for(var i = 0; i < this.api_list.length; i++){
                            if(this.api_list[i].use_yn === 'Y'){
                                this.receivedValue.selectedApi.push(this.api_list[i]);
                                 if(this.api_list[i].api_access_limit === ''){
                                    this.api_list[i].api_access_limit = 0;
                                }
                            } 
                        }
                        
                    }else if(resCode==204){
                    this.api_list =[];
                    console.log('매장 정보 데이터가 없습니다.');
                    }else if(resCode==410){
                    alert("로그인 세션이 만료되었습니다.");
                    EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }else{
                    //this.api_list = [];
                    console.log(resCode + " / " + resMsg);

                    }
                })
                .catch((ex) => {
                    console.log('조회 실패',ex);
                })
                .finally(function(){})
                }
            },
         passPageInfo(site_id){  //넘어온 값에 대한 확인 여부
            if(!site_id){
                alert("데이터 정보가 존재하지 않습니다.");
                this.$router.push({name: "approval-api"})
                return;
            }
        },
        checkStatus(status_code){   //업체 상태에 따른 css
            if(status_code === 'A'){
                this.status_code_title = '신청';
                this.option_css.background = 'red';
                this.mainBtn = 1;
            }else if(status_code ==='F'){
                this.status_code_title = '반려';
                this.option_css.background = 'lightgray';
                 this.mainBtn = 0;
            }else if(status_code ==='S'){
                this.status_code_title = '사용중';
                this.option_css.background = 'green';
                this.mainBtn = 0;
            }else if(status_code ==='D'){
                this.status_code_title = '미사용';
                this.option_css.background = '#ffd400';
                this.mainBtn = 0;
            }
        },
        chooseControlType(){
            this.getValue.control_type = this.defaultSelected.value;
            this.receivedValue.control_type = this.getValue.control_type; 
        },
        chooseAccess_limit_type(){
            this.getValue.access_limit_type = this.defaultTypeSelected.value;
            this.receivedValue.access_limit_type = this.getValue.access_limit_type;
        },
        rejectRequest(){  //승인신청 거절하는 method + 반려 거절 코드 넣기
            var result = confirm("신청을 반려하시겠습니까?");
            if(result){
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13040/reject_site`;// 다시 만들기

                axios.post(url,this.receivedValue,headers) 
                .then((response) => {
                    if(response.data.res_code === 200){
                            alert("신청이 반려되었습니다.");
                            this.mainBtn = 0;
                            this.checkStatus(response.data.data.status_code);
                         
                        }else{
                           alert("반려 중 오류가 발생했습니다.");
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
                       title: "반려신청이 취소되었습니다.",
                       type : "error",
                       html: ""
                })
            }
        },
        acceptRequest(){ //승인요청을 받아주는 method
            this.receivedValue.site_access_limit = this.getValue.site_access_limit;
            this.receivedValue.control_type = this.getValue.control_type;
          
            if(this.receivedValue.control_type === ''){
                this.$fire({
                    title: "제한종류 타입을 선택해주세요.",
                    type : "error",
                    html: ""
                })
                return;
                
            }
            
            if(this.receivedValue.control_type === 'BOTH' || this.receivedValue.control_type === 'SITE'){
                if(this.receivedValue.site_access_limit === ''){
                        this.$fire({
                       title: "SITE 제한량을 입력해주세요.",
                       type : "error",
                       html: ""
                })
                return;
                }
            }
            
            if(this.receivedValue.control_type === 'BOTH' || this.receivedValue.control_type === 'API'){
                
                for(var i = 0; i < this.receivedValue.selectedApi.length; i++){
                    if(this.receivedValue.selectedApi[i].api_access_limit === ''){
                        this.$fire({
                       title: "API 제한량을 입력해주세요.",
                       type : "error",
                       html: ""
                })
                return;
                    }
                }
            }

            var result = confirm("신청을 승인하시겠습니까?");   // api 에서 a 만 코드 변경해주기
            if(result){
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13041/accept_site`;
                axios.post(url,this.receivedValue,headers) // 다시 만들기
                .then((response) => {
                     if(response.data.res_code === 200){
                           alert("신청이 승인되었습니다.");
                            this.mainBtn = 0;
                            this.checkStatus(response.data.data.status_code);
                        }else{
                           alert("승인 중 오류가 발생했습니다.");
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
                       title: "승인 신청이 취소되었습니다.",
                       type : "error",
                       html: ""
                })
            }
        },
        checkNumber(info,num,index){
            if(isNaN(info)){
               this.$fire({
                       title: "숫자만 입력 가능합니다.",
                       type : "error",
                       html: ""
                })
                if(num === 1){
                    this.getValue.site_access_limit = '';
                    return;
                }else if(num ===2){
                    this.api_list[index].api_access_limit = '';
                }
            }
          
        },
        backPage(){
            this.$router.push({name:"approval-api"});
        }
       
    },
})
</script>
<style scoped>
.title h3{
    margin-left: 25px;
    padding: 10px 0 10px 0;
    font-size : 15px;
};
  table {
    width: 100%;
    border-top: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    border-bottom: 1px solid #444444;
    border-left: 1px solid #444444;
    padding-left: 10px;
  }
  th:first-child, td:first-child {
    border-left: none;
  }
</style>