<template>
    <v-container fluid>
      <v-card>
        <query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></query>

        <list 
          v-bind:kttList=kttList
          v-bind:kttPagingInfo="kttPagingInfo"
          @pagination="searchToProcess"
        ></list>
      </v-card>
    </v-container>
</template>

<script>
import List from './ktt-order/kttOrderInfoList'
import Query from './ktt-order/kttOrderInfoQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12005/get_user_ktt_subs`;

export default {
  
  components: {
    List, Query
  },
  
  data () {
    return {
      kttList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      kttPagingInfo: {},
      searchParam: {
        guid: "",
        said: "",
        service_no: "",
        contract_id: "",
        page_no: "",
        view_cnt: ""
      }, 
    }
  },
  methods: {
    searchToProcess: function(params){

      var reqParams = this.handleParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.kttList = response.data.data.list;
          this.kttPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
            this.kttList = [];
            this.kttPagingInfo = {};
            alert("KTT 청약정보 데이터가 없습니다.");
        } else {
          this.kttList = [];
          this.kttPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      })
      .finally(function () {
        // always executed
      });

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
        newParams.view_cnt = this.kttPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if (params.guid !== undefined && params.guid !== "") {
        newParams.guid = params.guid;
      } else if (
        this.searchParam.guid !== undefined &&
        this.searchParam.guid !== ""
      ) {
        newParams.guid = this.searchParam.guid;
      }

      if (params.said !== undefined && params.said !== "") {
        newParams.said = params.said;
      } else if (
        this.searchParam.said !== undefined &&
        this.searchParam.said !== ""
      ) {
        newParams.said = this.searchParam.said;
      }

      if (params.service_no !== undefined && params.service_no !== "") {
        newParams.service_no = params.service_no;
      } else if (
        this.searchParam.service_no !== undefined &&
        this.searchParam.service_no !== ""
      ) {
        newParams.service_no = this.searchParam.service_no;
      }

      if (params.contract_id !== undefined && params.contract_id !== "") {
        newParams.contract_id = params.contract_id;
      } else if (
        this.searchParam.contract_id !== undefined &&
        this.searchParam.contract_id !== ""
      ) {
        newParams.contract_id = this.searchParam.contract_id;
      }

      if (params.page_no !== undefined && params.page_no !== "") {
        newParams.page_no = params.page_no;
      } else if (
        this.searchParam.page_no !== undefined &&
        this.searchParam.page_no !== ""
      ) {
        newParams.page_no = this.searchParam.page_no;
      }

      if (params.view_cnt !== undefined && params.view_cnt !== "") {
        newParams.view_cnt = params.view_cnt;
      } else if (
        this.searchParam.view_cnt !== undefined &&
        this.searchParam.view_cnt !== ""
      ) {
        newParams.view_cnt = this.searchParam.view_cnt;
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>