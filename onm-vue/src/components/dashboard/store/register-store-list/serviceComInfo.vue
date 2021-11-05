<template>
     <div>
        <v-form>
        <v-container            
            id="regular-tables"
            fluid
            tag="section"
            style="margin-top: -30px;"
            >
           <div  v-show="changedInfo==='N'" >                 
            <p style="width: 100%; text-align:right; margin-top: 10px;">
                <v-btn 
                elevation="2" 
                medium
                v-on:click="infoModify"
                >
                수정
                </v-btn>
            </p>       
                <v-row style="margin-top: -80px;">
                    <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            업체ID:
                        </label>
                    </v-col>
                    <v-col cols="2" style="">
                        <v-text-field
                        v-model="infoObject.site_id"
                        id="site_id"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="2" style="padding:39px 0px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            업체명:
                        </label>
                    </v-col>
                    <v-col cols="2" style="">
                        <v-text-field
                        v-model="infoObject.site_name"
                        id="site_name"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            고객명:
                        </label>
                    </v-col>
            
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.user_name"
                        disabled
                        id="user_id"
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            연락처:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.tel_no"
                        disabled
                        id="tel_no"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="reg_date">
                            등록일자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.reg_date"
                        id="reg_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                    <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                    <label id ="mod_date">
                            수정일자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.mod_date"
                        id="mod_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8% ; font-size:12px;">
                        <label id ="adm_id">
                            승인자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.adm_id"
                        id="adm_id"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                            승인일자:
                        <label id ="access_date">
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.access_date"
                        id="access_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
             <div v-show="changedInfo==='Y'">
             <p style="width: 100%; text-align:right; margin-top: 10px;">
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
                    <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            업체ID:
                        </label>
                    </v-col>
                    <v-col cols="2" style="">
                        <v-text-field
                        v-model="infoObject.site_id"
                        id="site_id"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            업체명:
                        </label>
                    </v-col>
                    <v-col cols="2" style="">
                        <v-text-field
                        v-model="infoObject.site_name"
                        id="site_name"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            고객명:
                        </label>
                    </v-col>
            
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.user_name"
                        id="user_id"
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="user_name">
                            연락처:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.tel_no"
                        id="tel_no"
                        v-on:keyup="checkNumber(infoObject.tel_no)"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="reg_date">
                            등록일자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.reg_date"
                        id="reg_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                    <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                    <label id ="mod_date">
                            수정일자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.mod_date"
                        id="mod_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="adm_id">
                            승인자:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.adm_id"
                        id="adm_id"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                     <v-col  cols="auto" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                            승인일자:
                        <label id ="access_date">
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                        v-model="infoObject.access_date"
                        id="access_date"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
                <v-row>
                    <v-col cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="control_type">
                            제한종류:
                        </label>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                        v-model="infoObject.control_type"
                        id="control_type"
                        disabled
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col  cols="2" style="padding:39px 0px; margin-left: 20px; flex: 0 0 8%; font-size:12px;">
                        <label id ="site_id">
                            SITE제한량:
                        </label>
                    </v-col>
                    <v-col cols="2" >
                        <v-text-field
                            disabled
                            v-model="access_type_site"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
      </v-container>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        title="API 목록"
        class="px-5 py-3"
        >
         <button id = "apiSave" v-on:click.prevent="apiSave">
            저장
        </button>
        <table width="100%;">
            <tr>
                <th></th>
                <th>API No</th>
                <th>Description</th>
                <th>제한 단위/량</th>
            </tr>
            <tr v-for="(api,index) in apiList" :key="index" >
                <td v-if="api.use_yn ==='Y'" style="text-align:center;"> 
                    <input type="checkbox" checked  :v-model="selectedApi" :value ="api">
                </td>
                <td v-else  style="text-align:center;">
                    <input type="checkbox">
                </td>
                <td>
                    {{api.api_no}}
                </td>
                 <td>
                    {{api.description}}
                </td>
                <td v-if="api.use_yn === 'Y' && api.api_access_limit > 0">
                    {{access_type_text}} &nbsp;&nbsp; {{api.api_access_limit}} 회
                </td>
                <td v-else>
                    -
                </td>
            </tr>
        </table>
        </base-material-card>
      </v-container>
    </v-form>
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
            this.getStoreApiInfo(this.received_site_id);
            for(var i = 0; i < this.apiList.length; i++){
                if(this.apiList[i].use_yn === 'Y'){
                    this.selectedApi[0] = this.apiList[i].api_no;
                } 
            }
        },
        methods:{
           getStoreApiInfo(received_site_id){
               if(received_site_id){
                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//`

                axios.post(url, received_site_id, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                        this.infoObject = response.data.data.값채우기;
                        this.apiList=response.data.data.값채우기;
                        this.changedInfo = 'N';
                
                        if(this.infoObject.access_limit_type === 'Y'){ // 사용 제한 타입 
                            this.access_type_text = "매년";
                        }else if(this.infoObject.access_limit_type === 'M'){
                            this.access_type_text = "매월";
                        }else if(this.infoObject.access_limit_type === 'D'){
                            this.access_type_text = "매일";
                        }else{
                            this.access_type_text= "";
                        }

                                            
                        if(this.infoObject.control_type === 'BOTH'){ // controltype 
                            this.control_type += 'SITE + API 제한';
                            // 사용 제한 타입이  있을 경우 , site 제한 
                            this.access_type_site = this.access_type + this.infoObject.site_access_limit + "회"; 
                        }else if(this.infoObject.control_type === 'API'){
                            this.control_type = 'API 제한';
                            this.access_type_site = "-";
                        }else if(this.infoObject.control_type === 'SITE'){
                            this.control_type = 'SITE 제한';
                            
                            if(this.access_type_text){   // 사용 제한 타입이  있을 경우 , site 제한 
                                this.access_type_site = this.access_type + this.infoObject.site_access_limit + "회";
                            }
                        }else if(this.infoObject.control_type === 'NONE'){
                            this.control_type = '제한 없음';
                            this.access_type_site = "-";
                        }
                        for(var i = 0; i < this.apiList.length; i++){
                        if(this.apiList[i].use_yn === 'Y'){
                                this.api += this.apiList[i];
                            } 
                        }
                    }else if(resCode==204){
                    this.infoObject = {};
                    this.apiList =[];
                    alert('매장 정보 데이터가 없습니다.');
                    }else if(resCode==410){
                    alert("로그인 세션이 만료되었습니다.");
                    EventBus.$emit('top-path-logout');
                        this.$store
                        .dispatch("LOGOUT")
                        .then( res => { 
                        console.log(res.status)}).catch(({ message }) => (this.msg = message))
                        this.$router.replace('/signin')
                    }else{
                    this.pList = [];
                    alert(resCode + " / " + resMsg);
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
            },
            updateInfo(){ // 업체 정보 수정
                var vm = this;
                var result = this.checkChangeValues();
                if(result){
                    console.log(2);
                
                var params = this.receivedValue;
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
                            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15007/set_code`
                            axios.post(url, params, headers)
                            .then((response) => {
                            console.log(response)
                            var resCode = response.data.res_code;
                            var resMsg = response.data.res_msg;
                            if(resCode == 200){
                                vm.changedInfo = 'N';
                                //this.$emit('reset')
                            }else{
                                alert(resCode + " / " + resMsg);
                                vm.changedInfo = 'N';
                            }
                            })
                            .catch((ex) => {
                            console.log('변경 실패',ex)
                            })
                        }else{
                            alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
                             vm.changedInfo = 'N';
                         }
                        })
                    }else{
                        alert('비밀번호를 입력해주세요.');
                    }
                });
                this.close()
                }
            },
            checkChangeValues(){ // 수정시 validation
                if(this.infoObject.user_name === '' || this.infoObject.user_name === "undefined"){
                  alert("고객 명을 채워주세요.");
                  return;  
                }
                if(this.infoObject.tel_no === '' || this.infoObject.tel_no === "undefined"){
                  alert("전화번호를 채워주세요.");
                  return;  
                }else{
                      const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
                    if (!regPhone.test(this.infoObject.tel_no)) {
                        alert('올바른 전화번호 형식이 아닙니다.');
                        this.infoObject.tel_no = '';
                        return;
                    }
                }
                return true;
            },
            checkNumber(info){  // 숫자만 체크
               if(isNaN(info)){
                    alert("숫자만 입력가능합니다.");
                    this.infoObject.tel_no = '';
                    return;
               }
            },
            apiSave(){  
                console.log(this.selectedApi[0]);
            }
        },
        data(){
            return{
                received_site_id : this.receivedValue.site_id,
                infoObject:{
                    site_id:'McdonaldsHead',
                    user_name:'이선민',
                    mod_date:'20211029',
                    reg_date:'20211029',
                    adm_id:'홍길동',
                    tel_no:'01000000000',
                    site_name: '맥도날드',
                    access_date : '20211104',
                    control_type : 'SITE + API 제한',
                    site_access_limit:'100',
                    access_limit_type:''
               },
                apiList : [
                    {
                        api_no:'/V100/GSM10001/send_said',
                        description: 'GSM 연동계정 정보 전달',
                        api_access_limit:'100',
                        use_yn:'Y'
                    },
                    {
                        api_no:'/V120/GSM10005/get_said',
                        description: 'GSM 연동계정 정보 받기',
                        api_access_limit:'20',
                        use_yn:'Y'     
                    },
                    {
                        api_no:'/V111/GSM10003/send_message',
                        description: 'GSM 알림 전달',
                        api_access_limit:'0',
                        use_yn:'Y'     
                    },
                    {
                        api_no:'/V123/GS20003/check_issue',
                        description: '장애 발생 전달',
                        api_access_limit:'',
                        use_yn:'N'     
                    }
                ],
                changedInfo:'N',//수정 가능 여부
                dialog: true, 
                access_type_text: '매월',
                access_type_site: '매월100회',  
                selectedApi:[],              
            }
        },
        computed:{
        
        }   
    }
</script>
<style scoped>
td, th {
  padding: 10px;
  border: 1px solid #ccc;
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