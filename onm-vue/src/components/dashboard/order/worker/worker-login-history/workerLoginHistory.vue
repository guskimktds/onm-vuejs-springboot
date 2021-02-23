<template>
    <v-container fluid>
      <v-card>
        <query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></query>

        <list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="searchToProcess"
        ></list>
      </v-card>

    </v-container>
</template>

<script>
import List from './workerLoginHistoryList'
import Query from './workerLoginHistoryQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_15005/get_mng_access_history`;

export default {
  
  components: {
    List, Query
  },
  
  data () {
    return {
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      searchParam: {
        admin_id: "",
        user_id: "",
        tel_no: "",
        login_key: "",
        admin_type: "" // 고정

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
          this.pList = response.data.data.mng_access_history_list;
          this.resPagingInfo = response.data.data.paging_info;
        } else {
          this.pList = [];
          this.resPagingInfo = {};
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
        newParams.view_cnt = this.resPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if (params.admin_id !== undefined && params.admin_id !== "") {
        newParams.admin_id = params.admin_id;
      } else if (
        this.searchParam.admin_id !== undefined &&
        this.searchParam.admin_id !== ""
      ) {
        newParams.admin_id = this.searchParam.admin_id;
      }

      if (params.user_id !== undefined && params.user_id !== "") {
        newParams.user_id = params.user_id;
      } else if (
        this.searchParam.user_id !== undefined &&
        this.searchParam.user_id !== ""
      ) {
        newParams.user_id = this.searchParam.user_id;
      }

      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }

      if (params.login_key !== undefined && params.login_key !== "") {
        newParams.login_key = params.login_key;
      } else if (
        this.searchParam.login_key !== undefined &&
        this.searchParam.login_key !== ""
      ) {
        newParams.tellogin_key_no = this.searchParam.login_key;
      }

      if (params.admin_type !== undefined && params.admin_type !== "") {
        newParams.admin_type = params.admin_type;
      } else if (
        this.searchParam.admin_type !== undefined &&
        this.searchParam.admin_type !== ""
      ) {
        newParams.admin_type = this.searchParam.admin_type;
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
    
  }
  
}
</script>

<style scoped>

</style>