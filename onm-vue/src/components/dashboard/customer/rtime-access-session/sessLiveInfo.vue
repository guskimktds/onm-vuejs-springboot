<template>
  <!-- <div> -->
  <v-container fluid>
    <v-card>
      <!-- <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar> -->
      <sessLiveInfo-query
        v-on:search="searchToSessLiveInfo"
        v-bind:param="searchParam"
      ></sessLiveInfo-query>
      <sessLiveInfo-list
        v-bind:pList="pList"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
      ></sessLiveInfo-list>

    </v-card>
  </v-container>
  <!-- </div> -->
</template>

<script>
import SessLiveInfoList from "./sessLiveInfoList";
import SessLiveInfoQuery from "./sessLiveInfoQuery";
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url =
  // "https://test-onm.ktvsaas.co.kr:8443/V110/ONM_14002/get_login_session_list";
  `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_14002/get_login_session_list`;

export default {
  components: {
    SessLiveInfoList,
    SessLiveInfoQuery
  },
  data() {
    return {
      title: "실시간 접속 세션 조회",
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
        tel_no: "",
        user_id: "",
        device_type: "",
      },
    };
  },

  methods: {
    searchToSessLiveInfo: function (params) {
      console.log(
        "부모 메소드 searchToSessLiveInfo 호출: " + JSON.stringify(params)
      );
      var reqParams = this.handleParams(params);

      console.log('호출파라미터')
      console.log(reqParams);
      if(!reqParams.start_date&&!reqParams.tel_no&&!reqParams.user_id&&!reqParams.device_type){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          
          console.log(response);
          if (resCode == 200) {
            this.pList = response.data.data.session_list;
            this.resPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('실시간 접속 세션 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else {
            this.pList = [];
            this.resPagingInfo = {};
            alert("Error");
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

      this.searchToSessLiveInfo(params)
    },

    handleParams: function (params) {
      let newParams = {};
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }

      if (params.page_no === undefined || params.page_no === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
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

      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }

      if (params.user_id !== undefined && params.user_id !== "") {
        newParams.user_id = params.user_id;
      } else if (
        this.searchParam.user_id !== undefined &&
        this.searchParam.user_id !== ""
      ) {
        newParams.user_id = this.searchParam.user_id;
      }

      if (params.device_type !== undefined && params.device_type !== "") {
        newParams.device_type = params.device_type;
      } else if (
        this.searchParam.device_type !== undefined &&
        this.searchParam.device_type !== ""
      ) {
        newParams.device_type = this.searchParam.device_type;
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }

      return newParams;
    },
  },
};
</script>

<style scoped>
</style>