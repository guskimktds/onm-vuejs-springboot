<template>
    <v-container fluid>
      <v-card>
        <mobileListInfo-query
          v-on:search="searchToMobileListInfo"
          v-bind:param="searchParam"
          v-bind:localGwOptions="localGwOptions"
        ></mobileListInfo-query>
        <mobileListInfo-list 
        v-bind:pList="pList"
        v-bind:mobilePagingInfo=mobilePagingInfo
        @pagination="setToSearchParams"></mobileListInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import MobileListInfoList from "./mobileListInfoList";
import MobileListInfoQuery from "./mobileListInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    MobileListInfoList,
    MobileListInfoQuery,
  },
  data() {
    return {
      title: "모바일 단말 목록 - #SMS 발송이력으로 api가 연결 되 있음",
      pList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10,
        local_gw_id:'1'
      },
      mobilePagingInfo:{},
      searchParam:{
        login_date:'',
        tel_no_id:'',
        user_id:'',
        local_gw_id:'1'
      },
      localGwOptions:[]
    };
  },
  beforeCreate() {  
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
        this.localGwOptions = response.data.data.local_gw_list;
    })
    .catch(function (error) {
        console.log(error);
        alert("국사정보 조회실패")
      })
      .finally(function () {
        // always executed
      });
  },

  methods: {
    searchToMobileListInfo: function (params) {
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14005/get_mobile_device_list`

      var reqParams=this.handleParams(params)
        console.log('리퀘스트파람')
        console.log(reqParams)
        axios.post(url, reqParams, headers)
          .then((response)=>{
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode==200){
              this.pList=response.data.data.list;
              this.mobilePagingInfo=response.data.data.paging_info
            }else{
              this.pList=[];
              this.mobilePagingInfo={};
              alert(resCode+" / "+resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패',ex)
          })
          .finally(function(){})
    },
    setToSearchParams:function(values){
      var params={
        page_no:values.page,
        view_cnt:values.itemsPerPage,
        local_gw_id:'1'
      }

      this.searchToMobileListInfo(params)
    },

    handleParams:function(params){
      let newParams={}

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

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if(params.login_date===undefined||params.login_date===''){
        newParams.login_date=this.mobilePagingInfo.login_date
      }else if(
        this.searchParam.login_date!==undefined&&
        this.searchParam.login_date!==""){
        newParams.login_date=params.login_date
      }

      if(params.tel_no_id===undefined||params.tel_no_id===''){
        newParams.tel_no_id=this.mobilePagingInfo.tel_no_id
      }else if(
        this.searchParam.tel_no_id!==undefined&&
        this.searchParam.tel_no_id!==""){
        newParams.tel_no_id=params.tel_no_id
      }

      if(params.user_id===undefined||params.user_id===''){
        newParams.user_id=this.mobilePagingInfo.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""){
        newParams.user_id=params.user_id
      }

      if(params.os_type===undefined||params.os_type===''){
        newParams.os_type=this.mobilePagingInfo.os_type
      }else if(
        this.searchParam.os_type!==undefined&&
        this.searchParam.os_type!==""){
        newParams.os_type=params.os_type
      }

      return newParams
    }
  },
};
</script>

<style scoped>
</style>