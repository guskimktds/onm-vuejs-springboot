<template>
  <v-container fluid>
    <v-card>
      <cameraInfo-query
        v-on:search="searchToCameraInfo"
        v-bind:param="searchParam"
      ></cameraInfo-query>
      <cameraInfo-list
        v-bind:dcList="dcList"
        v-bind:dcPagingInfo="dcPagingInfo"
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"
      ></cameraInfo-list>

      <v-container id="regular-tables" fluid tag="section">
        <v-btn
          v-bind:color="changeColor(showDetailObject)"
          v-if="isReloadDetailObject"
          v-on:click="showDetailObject = !showDetailObject"
        >
          카메라 정보 상세{{ showDetailObject ? " Close" : " Open" }}
        </v-btn>
      </v-container>
      
      <camera-info-detail
        v-if="showDetailObject"
        v-bind:pObject="pObject"
      ></camera-info-detail>
    </v-card>
  </v-container>
</template>

<script>
import CameraInfoList from "./cameraInfoList";
import CameraInfoQuery from "./cameraInfoQuery";
import CameraInfoDetail from "./cameraInfoDetail";
import dateInfo from "../../../utils/common"

import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  components: {
    CameraInfoList,
    CameraInfoQuery,
    CameraInfoDetail,
  },
  data() {
    return {
      title: "카메라 정보 조회",
      dcList: [],
      pObject: {},
      showDetailObject: false,
      isReloadDetailObject: false,
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      dcPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        cam_id: "",
        cam_name: "",
        mac_id: "",
      },
    };
  },

  methods: {
    searchToCameraInfo: function (params) {
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13008/get_cam_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.dcList = response.data.data.cam_list;
            this.dcPagingInfo = response.data.data.paging_info;
          } else {
            this.dcList = [];
            this.dcPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },

    clickToSearchDetailObject: function (values) {
      if (values) {
        this.showDetailObject = true;
        this.isReloadDetailObject = true;

        this.pObject = values;
      }
      else {
        this.pObject = {};
      }
    },

    setToSearchParams: function (values) {
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      console.log(params);

      this.searchToCameraInfo(params);
    },

    handleParams: function (params) {
      let newParams = {};
      if (params.page_no === undefined || params.page_no === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page_no;
      }
      if (params.view_cnt === undefined || params.view_cnt === "") {
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.view_cnt;
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

      if (params.cam_id !== undefined && params.cam_id !== "") {
        newParams.cam_id = params.cam_id;
      } else if (
        this.searchParam.cam_id !== undefined &&
        this.searchParam.cam_id !== ""
      ) {
        newParams.cam_id = this.searchParam.cam_id;
      }
      if (params.cam_name !== undefined && params.cam_name !== "") {
        newParams.cam_name = params.cam_name;
      } else if (
        this.searchParam.cam_name !== undefined &&
        this.searchParam.cam_name !== ""
      ) {
        newParams.cam_name = this.searchParam.cam_name;
      }
      if (params.mac_id !== undefined && params.mac_id !== "") {
        newParams.mac_id = params.mac_id;
      } else if (
        this.searchParam.mac_id !== undefined &&
        this.searchParam.mac_id !== ""
      ) {
        newParams.mac_id = this.searchParam.mac_id;
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