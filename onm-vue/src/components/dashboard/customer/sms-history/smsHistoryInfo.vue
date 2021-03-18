<template>
  <v-container fluid>
    <v-card>
      <smsHistoryInfo-query
        v-on:search="searchToSmsHistoryInfo"
        v-bind:param="searchParam"
      ></smsHistoryInfo-query>
      <smsHistoryInfo-list
        v-bind:pList="pList"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
      ></smsHistoryInfo-list>

    </v-card>
  </v-container>
</template>

<script>
import SmsHistoryInfoList from "./smsHistoryInfoList";
import SmsHistoryInfoQuery from "./smsHistoryInfoQuery";
import dateInfo from '../../../utils/common'

import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url =
  // "https://test-onm.ktvsaas.co.kr:8443/V110/ONM_14002/get_login_session_list";
  `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_14004/get_sms_sending_history`;

export default {
  components: {
    SmsHistoryInfoList,
    SmsHistoryInfoQuery
  },
  data() {
    return {
      title: "SMS 발송 이력 조회",
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
        tel_number: "",
        otp: "",
      },
    };
  },

  methods: {
    searchToSmsHistoryInfo: function (params) {
      console.log(
        "부모 메소드 searchToSmsHistoryInfo 호출: " + JSON.stringify(params)
      );
      var reqParams = this.handleParams(params);
      if(!reqParams.start_date&&!reqParams.tel_number&&!reqParams.otp){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      console.log(reqParams);
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(response);
          if (resCode == 200) {
            this.pList = response.data.data.sms_history_list;
            this.resPagingInfo = response.data.data.paging_info;
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
        page: values.page,
        itemsPerPage: values.itemsPerPage
      }

      this.searchToSmsHistoryInfo(params)
    },

    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }

      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if(params.date_yn==true){
        if(params.start_date !== undefined && params.start_date !== ''){
          newParams.start_date = params.start_date.replace(/-/g,"")
        }else if(
          this.searchParam.start_date!==undefined&&
          this.searchParam.start_date!==""
        ){
          newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
        }

        if(params.end_date !== undefined && params.end_date !== ''){
          newParams.end_date = params.end_date.replace(/-/g,"")
        }else if(
          this.searchParam.end_date!==undefined&&
          this.searchParam.end_date!==""
        ){
          newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
        }
      }

      if (params.tel_number !== undefined && params.tel_number !== "") {
        newParams.tel_number = params.tel_number;
      } else if (
        this.searchParam.tel_number !== undefined &&
        this.searchParam.tel_number !== ""
      ) {
        newParams.tel_number = this.searchParam.tel_number;
      }

      if (params.otp !== undefined && params.otp !== "") {
        newParams.otp = params.otp;
      } else if (
        this.searchParam.otp !== undefined &&
        this.searchParam.otp !== ""
      ) {
        newParams.otp = this.searchParam.otp;
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      return newParams;
    },
  },
};
</script>

<style scoped>
</style>