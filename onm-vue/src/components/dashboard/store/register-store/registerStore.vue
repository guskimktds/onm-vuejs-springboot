<template>
   <div>
    <v-form>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        title="매장 정보 등록"
        class="px-5 py-3"
        >
        <v-row>
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            업체 명:
          </v-col>
          <v-col cols="3">
              
           <v-text-field
              placeholder="업체 명"
              v-model="info.site_name"
              maxlength=20;
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            담당자 명:
          </v-col>
          <v-col cols="3">  
           <v-text-field
              placeholder="담당자 명"
               v-model = "info.user_name"
               maxlength=10;
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            부서 명:
          </v-col>
          <v-col cols="3">
              
           <v-text-field
              placeholder="부서 명"
              v-model = "info.dept"
               maxlength=10;
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            담당 번호:
          </v-col>
          <v-col cols="3">
              
           <v-text-field
              placeholder="(-)없이 번호만입력"
               v-model = "info.tel_no"
               v-on:keyup="checkNumber(info.tel_no,1)"
               maxlength=12;
            >
            </v-text-field>
          </v-col>
        </v-row>
          <!-- <v-row>
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            api 제어 사용 여부:
          </v-col>
          <v-col cols="2">
            <v-radio-group v-model="info.control_type" :mandatory="true" v-on:change="authForStieLimit(info.control_type)">
                <v-radio label="Y" value="Y"></v-radio>
                <v-radio label="N" value="N"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-show="checkApi">
          <v-col cols="2" style="padding:39px 0px; margin-left: 10px;">
            site 접속 제한량:
          </v-col>
          <v-col cols="3">
           <v-text-field
              placeholder="site 접속 제한량"
              v-model = "info.site_access_limit"
              v-on:keyup="checkNumber(info.site_access_limit,2)"
            >
            </v-text-field>
          </v-col>
        </v-row> -->
      
        <v-row>
          <v-col >
            <v-btn 
              elevation="2" 
              medium
              v-on:click="backPage"
               >
               뒤로
          </v-btn>
           <v-btn 
              elevation="2" 
              medium
              v-on:click="registerStoreInfo"
               >
               등록
            </v-btn>
          </v-col>
        </v-row>
      
        </base-material-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from '../../../../EventBus'

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};


export default{

    // created(){

    //     var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//` // 아직 미정
    //      axios.post(url, headers)
    //      .then((response) =>{
    //         var resCode = response.data.res_code;
    //     if(resCode==410){
    //         alert("로그인 세션이 만료되었습니다.");
    //         EventBus.$emit('top-path-logout');
    //         this.$store
    //         .dispatch("LOGOUT")
    //         .then( res => { 
    //         console.log(res.status)}).catch(({ message }) => (this.msg = message))
    //         this.$router.replace('/signin')
    //         }
    //     })
    //     .catch((ex) => {
    //     console.log('조회 실패',ex)
    //   })

    // },
    data(){
        return{
            info:{
                site_name : '',
                user_name : '',
                dept : '',
                tel_no : '',
                // site_access_limit : '',
                // control_type: '',
            },
            // checkApi : true,
        }
    },
    methods:{
        registerStoreInfo(){

            if(this.info.site_name === '' || this.info.site_name === undefined){
                alert("업체 명을 입력해주세요.");
                return;
            }
             if(this.info.user_name === '' || this.info.user_name === undefined){
                alert("담당자 명을 입력해주세요.");
                return;
            }
             if(this.info.dept === '' || this.info.dept === undefined){
                alert("부서 명을 입력해주세요.");
                return;
            }
             if(this.info.tel_no === '' || this.info.tel_no === undefined){
                alert("담당 번호를 입력해주세요.");
                return;
            }else{
                const regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
                if (!regPhone.test(this.info.tel_no)) {
                    alert('올바른 전화번호 형식이 아닙니다.');
                    this.info.tel_no = '';
                    return;
                }
            }
            // if(this.checkApi){
            //   if(this.info.site_access_limit === '' || this.info.site_access_limit === undefined){
            //       alert("site 접속 제한량을 입력해주세요.");
            //       return;     
            //   }
            // }
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110//` // 아직 미정
            axios(url, this.info, headers)
            .then((response)=>{
                var resCode = response.data.res_code;
                if(resCode == 200){
                    alert("매장이 성공적으로 등록되었습니다.");
                    this.resetInfo();
                }else if(resCode==410){
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
               alert("등록 중 오류가 발생하였습니다.");
               this.resetInfo();        
            })
        
        },
        checkNumber(info,num){
               if(isNaN(info)){
                    alert("숫자만 입력가능합니다.");
                    if(num === 1){
                        this.info.tel_no = '';
                        return;
                    }else if(num === 2){
                        this.info.site_access_limit = '';
                        return; 
                    }
                   
               }
          
        },
        resetInfo(){
               this.info.site_name = '';
               this.info.user_name = '';
               this.info.dept = '';
               this.info.tel_no = '';
               this.info.site_access_limit = '';
               this.info.control_type = 'Y';
        },
        backPage(){
          this.$router.push({name: "approval-store"});
        }
        // authForStieLimit(radio){
        //   if(radio === 'Y'){
        //     this.checkApi = true; 
        //   }else if(radio === 'N'){
        //     this.checkApi = false;
        //   }
        // }
    }
    

}

</script>
<style scoped>

</style>