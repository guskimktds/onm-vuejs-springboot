<template>
    <v-container fluid>
      <v-card>
        <ktt-info-query 
        v-on:search="searchKTTInfo"
        v-bind:param="searchParam">></ktt-info-query>

        <ktt-info-list 
        v-bind:kList="kList"
        v-bind:kttPagingInfo="kttPagingInfo"
        @pagination="setToSearchParams"></ktt-info-list>
      </v-card>
    </v-container>
</template>

<script>
import KttInfoList from "./kttInfoList";
import KttInfoQuery from "./kttInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    KttInfoList,
    KttInfoQuery
  },
  data() {
    return {
      title: "사용자 - KTT 정보",
      kList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      kttPagingInfo:{},
      searchParam:{
        reg_date:'',
        user_id:'',
        service_no:'',
        system_id:''
      }
    }
  },
  // created: function () {
  //   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`

  //   var params=this.reqPagingInfo

  //   axios
  //       .post(url, params, headers)
  //       .then((response) => {
  //         console.log(response.data)
  //         var resCode = response.data.res_code;
  //         var resMsg = response.data.res_msg;
  //         if(resCode == 200){
  //           this.kList = response.data.data.ktt_info_list;
  //           this.kttPagingInfo = response.data.data.paging_info
  //            console.log('전체 list 값')
  //           console.log(this.kList)
  //         }else{
  //           this.kList = [];
  //           this.kttPagingInfo = {};
  //           alert(resCode + " / " + resMsg);
  //         }
  //       })
  //       .catch((ex) => {
  //         console.log('조회 실패', ex)
  //       })
  // },
methods: {
  searchKTTInfo: function (params) {
    
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`

    var reqParams=this.handleParams(params)

    console.log('요구하는 페이지 정보')
    console.log(reqParams)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.kList = response.data.data.ktt_info_list;
          this.kttPagingInfo = response.data.data.paging_info
    
        }else{
          this.kList = [];
          this.kttPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      .finally(function(){})
    },
    
    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchKTTInfo(params)
    },

    handleParams:function(params){
      console.log('전달된 파라미터 값')
      console.log(params)
    let newParams = {}
      if(params.page_no === undefined || params.page_no === ''){
        newParams.page_no = this.reqPagingInfo.page_no
      }else{
        newParams.page_no = params.page_no
        console.log('페이지 정보')
        console.log(params)
      }
      if(params.view_cnt === undefined || params.view_cnt === ''){
        newParams.view_cnt = this.reqPagingInfo.view_cnt
      }else{
        newParams.view_cnt = params.view_cnt
      } 

      if(params.reg_date !== undefined && params.reg_date !== ''){
        newParams.reg_date = params.reg_date
      }else if(
        this.searchParam.reg_date!==undefined&&
        this.searchParam.reg_date!==""
      ){
        newParams.reg_date=this.searchParam.reg_date
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }
      if(params.service_no !== undefined && params.service_no !== ''){
        newParams.service_no = params.service_no
      }else if(
        this.searchParam.service_no!==undefined&&
        this.searchParam.service_no!==""
      ){
        newParams.service_no=this.searchParam.service_no
      }
      if(params.system_id !== undefined && params.system_id !== ''){
        newParams.system_id = params.system_id
      }else if(
        this.searchParam.system_id!==undefined&&
        this.searchParam.system_id!==""
      ){
        newParams.system_id=this.searchParam.system_id
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>