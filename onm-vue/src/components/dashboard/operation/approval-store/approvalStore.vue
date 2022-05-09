<template>
   <v-container fluid>
      <v-card>
           <approval-store-query
            v-bind:param="searchParam"
            v-bind:localGwOptions="localGwOptions"
            v-on:search="searchStoreInfo"
           >
            </approval-store-query> 
            <div class="button">
                <router-link to='/operation/register-store'>+ 신규</router-link>
            </div>
            <approval-store-list
              v-bind:pList="pList"
              v-bind:resPagingInfo="resPagingInfo"
              @pagination="setToSearchParams"
            >
            </approval-store-list>
      </v-card>
   </v-container>    
    
</template>
<script>
//import EventBus from '../../../EventBus'
import dateInfo from "../../../utils/common"
import approvalStoreQuery from "./approvalStoreQuery";
import approvalStoreList from "./approvalStoreList";
import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

    export default{
        components:{
            approvalStoreQuery,
            approvalStoreList,
        },
        methods:{
            setToSearchParams(values){
                
                var params={
                    page_no : values.page,
                    view_cnt : values.itemsPerPage

                }
                this.searchStoreInfo(params);
            },
            searchStoreInfo(params){

                var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13031/get_site`

                var reqParams=this.handleParams(params)
 
                if(!reqParams.start_date&&!reqParams.adm_id&&!reqParams.site_name&&!reqParams.site_id&&!reqParams.local_gw_id){
                this.$fire({
                        title: "검색값을 입력해주세요.",
                        type: "error"})
                }else{
                axios.post(url, reqParams, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.pList = response.data.data.list;
                    this.resPagingInfo = response.data.data.paging_info
                    }else if(resCode==204){
                    this.pList = [];
                    this.resPagingInfo = {};
                    console.log('매장 관련 정보 데이터가 없습니다.');
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
                    this.resPagingInfo = {};
                    console.log(resCode + " / " + resMsg);
                    }
                })
                .catch((ex) => {
                    console.log('조회 실패',ex);
                })
                .finally(function(){})
                }
            },
            handleParams:function(params){
            
                let newParams = {}
                if(params.date_yn==undefined){
                    params.date_yn=this.searchParam.date_yn
                } // 날짜 검색 못찾을 경우 true로 잡고 날짜 검색 

                if(params.page_no === undefined || params.page_no === ''){
                    newParams.page_no = this.reqPagingInfo.page_no
                }else{
                    newParams.page_no = params.page_no
                }
                if(params.view_cnt === undefined || params.view_cnt === ''){
                    newParams.view_cnt = this.reqPagingInfo.view_cnt
                }else{
                    newParams.view_cnt = params.view_cnt
                } 

                if(params.date_yn==true){
                    if(params.start_date !== undefined && params.start_date !== ''){
                    newParams.start_date = params.start_date.replace(/-/g,"")
                    }else if(
                    this.searchParam.start_date!==undefined&& this.searchParam.start_date!==""){
                    newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
                    }

                    if(params.end_date !== undefined && params.end_date !== ''){
                    newParams.end_date = params.end_date.replace(/-/g,"")
                    }else if(this.searchParam.end_date!==undefined && this.searchParam.end_date!==""){
                    newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
                    }
                }
                
                if(params.adm_id !== undefined && params.adm_id !== ''){
                    newParams.adm_id = params.adm_id
                }else if(this.searchParam.adm_id!==undefined && this.searchParam.adm_id!==""){
                    newParams.adm_id=this.searchParam.adm_id
                }
                if(params.site_id !== undefined && params.site_id !== ''){
                    newParams.site_id = params.site_id
                }else if(this.searchParam.site_id!==undefined && this.searchParam.site_id!==""){
                    newParams.site_id=this.searchParam.site_id
                }
                if(params.site_name !== undefined && params.site_name !== ''){
                    newParams.site_name = params.site_name
                }else if(
                    this.searchParam.site_name!==undefined&& this.searchParam.site_name!==""){
                    newParams.site_name=this.searchParam.site_name
                }
                if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
                    newParams.local_gw_id = params.local_gw_id;
                } else if (
                    this.searchParam.local_gw_id !== undefined &&
                    this.searchParam.local_gw_id !== ""
                ) {
                    newParams.local_gw_id = this.searchParam.local_gw_id;
                }

                if(Number(newParams.start_date)-Number(newParams.end_date)>0){
                    alert('형식에 맞는 날짜 검색값을 입력해주세요')
                    newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
                    newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
                    this.searchParam.start_date=dateInfo().lastWeekDashFormat
                    this.searchParam.end_date=dateInfo().currentDateDashFormat
                }
                return newParams
            },   
        },
        data(){
            return {
                title: "매장 승인 정보",
                pList: [],
                searchParam:{
                start_date: dateInfo().lastWeekDashFormat,
                end_date: dateInfo().currentDateDashFormat,
                date_yn:true,
                adm_id:'', // 승인자로 변경
                site_id:'', //사이트명id
                site_name:'' ,//사이트명  
                local_gw_id: '' // 상태코드 
                },
                reqPagingInfo:{
                    page_no:1,
                    view_cnt:10
                },
                allOptions:{
                    code_name:"전체",
                    code_id: ""
                },
                localGwOptions:[],
                resPagingInfo:{}, // 페이지 정보 관련 값 받아옴
            }
        },
        beforeCreate() {  

            var request = new Object();
               request.code_master_id = 'STATUS_CODE';

                axios
                .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13032/get_status_code`,request,headers)
                .then((response) => {
                this.localGwOptions = response.data.data.comm_code_list;
                this.localGwOptions.unshift(this.allOptions);
                
                })
                .catch(function (error) {
                    console.log(error);
                    alert("상태코드 조회실패");
                    
                })
                .finally(function () {
                    // always executed
                });
            },
        created(){
            this.searchStoreInfo(this.searchParam);
        }
    }

</script>
<style scoped>
.button{
    float: right;
    padding-right: 45px;
    padding-top: 10px;
    font-size:20px;
}
</style>