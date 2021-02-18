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
        @pagination="searchToSessLiveInfo"
        @child="clickMaskObject"
      ></sessLiveInfo-list>

      <modal
      v-bind:mask="mask"
      ref="modal"></modal>
    </v-card>
  </v-container>
  <!-- </div> -->
</template>

<script>
import SessLiveInfoList from "./sessLiveInfoList";
import SessLiveInfoQuery from "./sessLiveInfoQuery";
import dateInfo from '../../../utils/common'
import Modal from './sessionLiveModal'

import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url =
  // "https://test-onm.ktvsaas.co.kr:8443/V110/ONM_14002/get_login_session_list";
  `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_14002/get_login_session_list`;

export default {
  components: {
    SessLiveInfoList,
    SessLiveInfoQuery,
    Modal
  },
  data() {
    return {
      title: "실시간 접속 세션 조회",
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      mask:{},
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
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

      console.log(reqParams);
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(response);
          if (resCode == 200) {
            this.pList = response.data.data.session_list;
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
    },

    clickMaskObject:function(values){

      if(values){
        console.log('클릭값')
        console.log(values)

        var params={
          user_id: values,
          page__no:"1",
          view_cnt:"5",
          is_masking: "N"
        }
        var reqParams=params

      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.mask = response.data.data.session_list[0];
          console.log(this.mask)
        }else{
          this.mask = [];
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
        })
      }

      this.$refs.modal.open();
    },

    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.resPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

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

      return newParams;
    },
  },
};
</script>

<style scoped>
</style>