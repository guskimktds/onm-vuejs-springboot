<template>
     <div>
        <v-form>
        <v-container            
            id="regular-tables"
            fluid
            tag="section"
            style="margin-top: -30px;"
            >
        </v-container>
        <v-container>               
            <p style="width: 100%; text-align:right; margin-top: 10px;"  v-show="changedInfo==='N'">
                <v-btn 
                    elevation="2" 
                    medium
                    v-on:click="infoModify"
                >
                수정
                </v-btn>
            </p>       
            <p style="width: 100%; text-align:right; margin-top: 10px;"  v-show="changedInfo==='Y'">
                <v-btn 
                    elevation="2" 
                    medium
                    v-on:click="updateInfo"
                    color="green"
                >
                저장
                </v-btn>
            </p>
                <v-row style="margin-top: -80px;">
                    <v-col  cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            업체ID:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;">
                        <v-text-field
                        v-model="infoObject.site_id"
                        id="site_id"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="2" style="padding:30px 0px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;" >
                        <label id ="site_id">
                            업체명:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.site_name"
                        id="site_name"
                        :disabled="validated == 0"
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            고객명:
                        </label>
                    </v-col>
            
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.user_name"
                        :disabled="validated == 0"
                        id="user_id"
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:30px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            연락처:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        placeholder="(-)없이 번호만입력"
                        v-model="infoObject.tel_no"
                        :disabled="validated == 0"
                        v-on:keyup="checkNumber(infoObject.tel_no)"
                        id="tel_no"
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="reg_date">
                            등록일자:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.reg_date"
                        id="reg_date"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col  cols="auto" style="padding:30px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                    <label id ="mod_date">
                            수정일자:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.mod_date"
                        id="mod_date"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8% ; font-size:12px;">
                        <label id ="adm_id">
                            승인자:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.adm_id"
                        id="adm_id"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:30px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                            승인일자:
                        <label id ="adm_access_date">
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                        v-model="infoObject.adm_access_date"
                        id="adm_access_date"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="control_type">
                            제한종류:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;">
                        <v-text-field
                        v-model="control_type"
                        id="control_type"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="2" style="padding:30px 0px; margin-left: 60px; flex: 0 0 8%; font-size:12px;">
                        <label id ="access_limit_type">
                            제한 기간 타입:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;">
                        <v-text-field
                        v-model="access_limit_type"
                        id="access_limit_type"
                        disabled
                        style="font-size:15px;"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col  cols="2" style="padding:30px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_access_limit">
                            SITE제한량:
                        </label>
                    </v-col>
                    <v-col cols="2" style="padding:0px;" >
                        <v-text-field
                            disabled
                            v-model="infoObject.site_access_limit"
                            id="site_access_limit"
                            style="font-size:15px;"

                        >
                        </v-text-field>
                    </v-col>
                </v-row>
      </v-container>
      </v-form>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        title="API 목록"
        class="px-5 py-3"
        >
         <button id = "apiSave" @click="apiSave">
            저장
        </button>
        <table width="100%;">
            <tr>
                <th style="padding:3px;"></th>
                <th style="padding:3px;">API No</th>
                <th style="padding:3px;">Description</th>
                <th style="padding:3px;">제한 단위/량</th>
            </tr>
            <tr v-for="(api,index) in api_list" :key="index" v-show="api_list.length > 0">
                <td style="text-align:center; padding:3px;">
                    <input type="checkbox" v-model="selectedApi" :value ="api">
                </td>
                <td style="padding:3px; padding-left:10px;">
                    {{api.api_no}}
                </td>
                 <td style="padding:3px; padding-left:10px;">
                    {{api.description}}
                </td>
                <td v-if="api.use_yn === 'Y' && api.api_access_limit > 0" style="padding:3px; padding-left:10px;">
                     &nbsp;&nbsp; {{api.api_access_limit}} 회
                </td>
                <td v-else style="padding:3px; padding-left:10px;">
                    &nbsp;&nbsp;-
                </td>
            </tr>
            <tr v-show="api_list.length == 0" >
                <td colspan="4" style="text-align:center">API가 존재하지 않습니다.</td>
            </tr>
        </table>
        </base-material-card>
      </v-container>
    
    <p style="margin-left:30px; padding-bottom:10px;">
    <v-btn 
        elevation="2" 
        medium
        v-on:click="backPage"
        >
        뒤로
    </v-btn>
    </p>
  </div>
</template>
<script>
import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}
    export default{
        props:['receivedValue'],
        created(){
            //정보값 가져오기     
            this.receivedInfo.site_id = this.receivedValue.site_id;
            this.getStoreApiInfo();  
           
        }, 
        methods:{
           getStoreApiInfo(){  
               if(this.receivedInfo.site_id){
                var tsJson = new Object();
                tsJson.site_id = this.receivedInfo.site_id; 

                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13036/get_siteInfoDetails`
                axios.post(url, tsJson, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){

                        this.infoObject.site_id = response.data.data.site_info.site_id;  
                        this.infoObject.site_name = response.data.data.site_info.site_name;
                        this.infoObject.status_code = response.data.data.site_info.status_code;
                        this.infoObject.user_name = response.data.data.site_info.mng_name;
                        this.infoObject.mod_date = response.data.data.site_info.mod_date;
                        this.infoObject.reg_date = response.data.data.site_info.reg_date;
                        this.infoObject.adm_id = response.data.data.site_info.adm_id;
                        this.infoObject.tel_no = response.data.data.site_info.mng_no;
                        this.infoObject.adm_access_date = response.data.data.site_info.adm_access_date;
                        this.infoObject.control_type = response.data.data.site_info.control_type;
                        this.infoObject.site_access_limit = response.data.data.site_info.site_access_limit;
                        this.infoObject.access_limit_type = response.data.data.site_info.access_limit_type;

                        this.api_list=response.data.data.api_list;
                        this.changedInfo = 'N';
                  
                        if(this.infoObject.access_limit_type === 'Y'){ // 사용 제한 타입 
                            this.access_limit_type = "매년";
                        }else if(this.infoObject.access_limit_type === 'YM'){
                            this.access_limit_type = "매월";
                        }else if(this.infoObject.access_limit_type === 'YMD'){
                            this.access_limit_type = "매일";
                        }else{
                            this.access_limit_type= "-";
                        }

                                            
                        if(this.infoObject.control_type === 'BOTH'){ // controltype 
                            this.control_type += 'SITE + API 제한';
                            this.site_access_limit =  this.infoObject.site_access_limit + "회"; 
                        }else if(this.infoObject.control_type === 'API'){
                            this.control_type = 'API 제한';
                            this.site_access_limit = "-";
                        }else if(this.infoObject.control_type === 'SITE'){
                            this.control_type = 'SITE 제한';
                        }else if(this.infoObject.control_type === 'NONE'){
                            this.control_type = '제한 없음';
                            this.site_access_limit = "-";
                        }
                        if(this.infoObject.site_access_limit === ''){
                            this.infoObject.site_access_limit = 0;
                        }
                        
                        this.selectedApi = [];
                       for(var i = 0; i < this.api_list.length; i++){ // 사용 api만 체크
                            if(this.api_list[i].use_yn === 'Y'){
                                this.selectedApi.push(this.api_list[i]);
                            } 
                        }
                 
                    }else if(resCode==204){
                    this.infoObject = {};                                   
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
                    this.api_list = [];
                    console.log(resCode + " / " + resMsg);
                    }
                })
                .catch((ex) => {
                    console.log('조회 실패',ex);
                })
                .finally(function(){})
                }
            },
            infoModify(){  // 수정 할 수 있게 disable 풀기
                this.changedInfo = 'Y';
                this.validated = 1;
            },

            updateInfo(){ // 업체 정보 수정
               
                var result = this.checkChangeValues();
                if(result){
                var params = this.infoObject;
                this.$fire({
                    title: "비밀번호를 입력해주세요.",
                    input: 'password',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '예',
                    cancelButtonText: '아니오',
                    inputPlaceholder: 'Enter your password',
                    inputAttributes: {
                        maxlength: 20,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                    }).then(result => {
                    if(result.value){
                        var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
                        var login = {
                            login_id: this.$store.state.onmUserId,
                            login_pwd: result.value
                        }
                        axios.post(url, login, this.$store.state.headers)
                        .then((response) => {
                        var resCode = response.data.res_code;
                        if(resCode == 200){
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13037/add_apiList`
                            axios.post(url, params, headers)
                            .then((response) => {
                            console.log(response)
                            var resCode = response.data.res_code;
                            var resMsg = response.data.res_msg;
                            if(resCode == 200){
                                alert("성공적으로 수정되었습니다.")
                                 this.changedInfo = 'N';
                                 this.validated = 0;
                                this.getStoreApiInfo();
                            }else{
                                alert(resCode + " / " + resMsg);
                                this.changedInfo = 'N';
                                this.validated = 0;
                            }
                            })
                            .catch((ex) => {
                            console.log('변경 실패',ex)
                            })
                        }else{
                            alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
                            
                         }
                        })
                    }else{
                        this.$fire({
                       title: "비밀번호를 입력해주세요.",
                       type : "error",
                       html: ""
                        })

                    }
                });
                }
            },
            checkChangeValues(){ // 수정시 validation
                if(this.infoObject.user_name === '' || this.infoObject.user_name === "undefined"){
                    this.$fire({
                       title: "고객명을 입력해주세요.",
                       type : "error",
                       html: ""
                    })
                  return;  
                }
                if(this.infoObject.site_name === '' || this.infoObject.site_name === "undefined"){
                   this.$fire({
                       title: "업체명을 입력해주세요.",
                       type : "error",
                       html: ""
                    })
                  return;  
                }
                if(this.infoObject.tel_no === '' || this.infoObject.tel_no === "undefined"){
                  this.$fire({
                       title: "전화번호를 입력해주세요.",
                       type : "error",
                       html: ""
                    })
                  
                  return;  
                }else{
                      const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
                    if (!regPhone.test(this.infoObject.tel_no)) {
                        this.$fire({
                       title: "올바른 전화번호 형식이 입력해주세요.",
                       type : "error",
                       html: ""
                    })
                        this.infoObject.tel_no = '';
                        return;
                    }
                }
                return true;
            },
            checkNumber(info){  // 숫자만 체크
               if(isNaN(info)){
                    this.$fire({
                       title: "숫자만 입력 가능합니다.",
                       type : "error",
                       html: ""
                    })
                    this.infoObject.tel_no = '';
                    return;
               }
            },
            apiSave(){ // api 선택 수정
             
                // if(this.selectedApi.length === 0){
                //    this.$fire({
                //        title: "API를 선택해주세요.",
                //        type : "error",
                //        html: ""
                //     })   
                //     return;
                // }


                for(var i = 0; i < this.selectedApi.length;i++){
                    var tsJson = new Object();
                    tsJson.api_no = this.selectedApi[i].api_no;
                    this.receivedInfo.selectedApi.push(tsJson);
                }
                
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13037/add_apiList`
                axios.post(url, this.receivedInfo, headers)
                .then((response)=>{
                    var resCode = response.data.res_code;
                    if(resCode === 200){
                        alert("성공적으로 수정되었습니다.");
                         this.$router.push({name: "approval-store"})
                    }else if(resCode===410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }
                })
                .catch(() => {
                    this.$fire({
                       title: "수정 중 오류가 발생했습니다.",
                       type : "error",
                       html: ""
                    })       
                })
            },
            backPage(){
                this.$router.push({name: "approval-store"});
            }
        },
        data(){
            return{
                infoObject:{
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
                api_list : [],
                changedInfo:'N',//수정 가능 여부
                dialog: true, 
                validated : 0, 
                receivedInfo:{
                    selectedApi:[], 
                    site_id: ''
                },
                selectedApi:[],
                access_limit_type:'',
                control_type:'',
                site_access_limit:''
            }
        },  
    }
</script>
<style scoped>
  table {
    width: 100%;
    border-top: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    border-bottom: 1px solid #444444;
    border-left: 1px solid #444444;
    padding: 10px;
  }
  th:first-child, td:first-child {
    border-left: none;
  }
#apiSave{
    color: white;
    background: black;
    padding: 5px;
    border-radius: 3px; 
    width: 100px;
    float: right;
    margin: 10px 10px 10px 10px;
}
</style>