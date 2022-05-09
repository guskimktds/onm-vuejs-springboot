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
        <!-- <v-row>
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
        </v-row> -->
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

    created(){
      this.showAuth();
      
    },
    data(){
        return{
            info:{
                site_name : '',
                user_name : '',
                //dept : '',
                tel_no : '',
            },
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
            
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13039/register_site`
            axios.post(url, this.info, headers)
            .then((response)=>{
                var resCode = response.data.res_code;
                if(resCode == 200){
                    alert("매장이 성공적으로 등록되었습니다.");
                    //this.resetInfo();
                    this.$router.push({name: "approval-store"})
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
                    }
                   
               }
          
        },
        resetInfo(){
               this.info.site_name = '';
               this.info.user_name = '';
              //  this.info.dept = '';
               this.info.tel_no = '';
        },
        backPage(){
          this.$router.push({name: "approval-store"});
        },
         showAuth(){
        var auth=this.$store.state.authGroupId
        if(auth=='G100'){
          return true;
        }else{
          alert('접근권한이 없습니다.')
          return false;
        }
      }
       
    }
    

}

</script>
<style scoped>

</style>