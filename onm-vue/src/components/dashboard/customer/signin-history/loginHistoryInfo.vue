<template>
  <v-container fluid>
    <v-card>
      <loginHistoryInfo-query
        v-on:search="searchToLoginHistoryInfo"
        v-bind:param="searchParam"
      >
      </loginHistoryInfo-query>
      <loginHistoryInfo-list
        v-bind:pList="pList"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
      ></loginHistoryInfo-list>
    </v-card>
  </v-container>
</template>

<script>
import LoginHistoryInfoList from "./loginHistoryInfoList";
import LoginHistoryInfoQuery from "./loginHistoryInfoQuery";
import dateInfo from '../../../utils/common'

import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url =
  // "https://test-onm.ktvsaas.co.kr:8443/V110/ONM_14002/get_login_session_list";
  `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_14003/get_login_history`;

export default {
  components: {
    LoginHistoryInfoList,
    LoginHistoryInfoQuery,
  },
  data() {
    return {
      title: "로그인 이력 조회",
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        login_id: "",
        os_type: "",
        optionType:"login"
      },
    };
  },
  methods: {
    searchToLoginHistoryInfo: function (params) {
      var reqParams = this.handleParams(params);
      console.log('검색값')
      console.log(reqParams)
      if(!reqParams.date_yn&&!reqParams.login_id&&!reqParams.os_type){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.pList = response.data.data.login_history_list;
            this.resPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('로그인 이력 데이터가 없습니다.');
          } else {
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      }
    },
    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToLoginHistoryInfo(params)
    },
    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }

      if (params.page_no === undefined || params.page_no === "") {
        newParams.page_no = this.resPagingInfo.page_no;
      } else {
        newParams.page_no = params.page_no;
      }

      if (params.view_cnt === undefined || params.view_cnt === "") {
        newParams.view_cnt = this.resPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.view_cnt;
      }

      if(params.date_yn==true){
        if(params.start_date !== undefined && params.start_date !== ''){
            newParams.login_start_date = params.start_date.replace(/-/g,"")
          }else if(
            this.searchParam.start_date!==undefined&&
            this.searchParam.start_date!==""
          ){
            newParams.login_start_date=this.searchParam.start_date.replace(/-/g,"")
          }
          if(params.end_date !== undefined && params.end_date !== ''){
            newParams.login_end_date = params.end_date.replace(/-/g,"")
          }else if(
            this.searchParam.end_date!==undefined&&
            this.searchParam.end_date!==""
          ){
            newParams.login_end_date=this.searchParam.end_date.replace(/-/g,"")
          }

        if(params.optionType=="login"){
          if(params.start_date !== undefined && params.start_date !== ''){
            newParams.login_start_date = params.start_date.replace(/-/g,"")
            delete newParams.logout_start_date
          }else if(
            this.searchParam.start_date!==undefined&&
            this.searchParam.start_date!==""
          ){
            newParams.login_start_date=this.searchParam.start_date.replace(/-/g,"")
            delete newParams.logout_start_date
          }

          if(params.end_date !== undefined && params.end_date !== ''){
            newParams.login_end_date = params.end_date.replace(/-/g,"")
            delete newParams.logout_end_date
          }else if(
            this.searchParam.end_date!==undefined&&
            this.searchParam.end_date!==""
          ){
            newParams.login_end_date=this.searchParam.end_date.replace(/-/g,"")
            delete newParams.logout_end_date
          }
        }

        if(params.optionType=="logout"){
          if(params.start_date !== undefined && params.start_date !== ''){
            newParams.logout_start_date = params.start_date.replace(/-/g,"")
            delete newParams.login_start_date
          }else if(
            this.searchParam.start_date!==undefined&&
            this.searchParam.start_date!==""
          ){
            newParams.logout_start_date=this.searchParam.start_date.replace(/-/g,"")
            delete newParams.login_start_date
          }

          if(params.end_date !== undefined && params.end_date !== ''){
            newParams.logout_end_date = params.end_date.replace(/-/g,"")
            delete newParams.login_end_date
          }else if(
            this.searchParam.end_date!==undefined&&
            this.searchParam.end_date!==""
          ){
            newParams.logout_end_date=this.searchParam.end_date.replace(/-/g,"")
            delete newParams.login_end_date
          }
        }
      }

      if (params.login_id !== undefined && params.login_id !== "") {
        newParams.login_id = params.login_id;
      } else if (
        this.searchParam.login_id !== undefined &&
        this.searchParam.login_id !== ""
      ) {
        newParams.login_id = this.searchParam.login_id;
      }

      if (params.os_type !== undefined && params.os_type !== "") {
        newParams.os_type = params.os_type;
      } else if (
        this.searchParam.os_type !== undefined &&
        this.searchParam.os_type !== ""
      ) {
        newParams.os_type = this.searchParam.os_type;
      }
      newParams.date_yn=this.searchParam.date_yn

      return newParams;
    },
  },
};
 

</script>

<style scoped>
</style>