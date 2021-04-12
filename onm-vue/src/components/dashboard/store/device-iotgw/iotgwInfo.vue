<template>
  <v-container fluid>
    <v-card>
      <iotgwInfo-query
        v-on:search="searchToIotGWInfo"
        v-bind:param="searchParam"
      ></iotgwInfo-query>
      <iotgwInfo-list
        v-bind:iotList="iotList"
        v-bind:iotPagingInfo="iotPagingInfo"
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"
      ></iotgwInfo-list>

      <v-container id="regular-tables" fluid tag="section">
        <v-btn
          v-bind:color="changeColor(showDetailObject)"
          v-if="isReloadDetailObject"
          v-on:click="showDetailObject = !showDetailObject"
        >
          IoT GW 정보 상세{{ showDetailObject ? " Close" : " Open" }}
        </v-btn>
      </v-container>

      <iotgw-info-detail
        v-if="showDetailObject"
        v-bind:pObject="pObject"
      ></iotgw-info-detail>
    </v-card>
  </v-container>
</template>

<script>
import IotgwInfoList from "./iotgwInfoList";
import IotgwInfoQuery from "./iotgwInfoQuery";
import IotgwInfoDetail from "./iotgwInfoDetail";
import dateInfo from "../../../utils/common"

import EventBus from '../../../../EventBus'
import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  components: {
    IotgwInfoList,
    IotgwInfoQuery,
    IotgwInfoDetail,
  },
  data() {
    return {
      title: "IoT GW 정보 조회",
      iotList: [],
      pObject: {},
      showDetailObject: false,
      isReloadDetailObject: false,
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      iotPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        gw_id: "",
        gw_name: "",
        gw_model_code: "",
      },
    };
  },

  methods: {
    searchToIotGWInfo: function (params) {
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13009/get_iotgw_list`;

      var reqParams = this.handleParams(params);
      if(!reqParams.start_date&&!reqParams.gw_id&&!reqParams.gw_name&&!reqParams.gw_model_code){
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
            this.iotList = response.data.data.iotgw_list;
            this.iotPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
             this.iotList = [];
            this.iotPagingInfo = {};
            alert('IoT GW 정보 데이터가 없습니다.');
          }else if(resCode==410){
            alert(resCode + " / " + resMsg);
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else {
            this.iotList = [];
            this.iotPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      }
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
      } else {
        this.pObject = {};
      }
    },

    setToSearchParams: function (values) {
      console.log(values);

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      console.log(params);

      this.searchToIotGWInfo(params);
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
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
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
      
      if (params.gw_id !== undefined && params.gw_id !== "") {
        newParams.gw_id = params.gw_id;
      } else if (
        this.searchParam.gw_id !== undefined &&
        this.searchParam.gw_id !== ""
      ) {
        newParams.gw_id = this.searchParam.gw_id;
      }
      if (params.gw_name !== undefined && params.gw_name !== "") {
        newParams.gw_name = params.gw_name;
      } else if (
        this.searchParam.gw_name !== undefined &&
        this.searchParam.gw_name !== ""
      ) {
        newParams.gw_name = this.searchParam.gw_name;
      }
      if (params.gw_model_code !== undefined && params.gw_model_code !== "") {
        newParams.gw_model_code = params.gw_model_code;
      } else if (
        this.searchParam.gw_model_code !== undefined &&
        this.searchParam.gw_model_code !== ""
      ) {
        newParams.gw_model_code = this.searchParam.gw_model_code;
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