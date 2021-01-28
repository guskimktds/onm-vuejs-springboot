<template>
    <v-container fluid>
      <v-card>
        <process-query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></process-query>

        <process-list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="searchToProcess"
        ></process-list>
      </v-card>
    </v-container>
</template>

<script>
import ProcessList from './process/processList'
import ProcessQuery from './process/processQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11001/get_process_status`;

export default {
  
  components: {
    'process-list': ProcessList
    , 'process-query': ProcessQuery
  },
  
  data () {
    return {
      title: '프로세스 현황 화면',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      searchParam: {
        local_gw_id: "",
        process: "",
        process_status: ""
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
          this.pList = response.data.data.process_list;
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

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if (params.process !== undefined && params.process !== "") {
        newParams.process = params.process;
      } else if (
        this.searchParam.process !== undefined &&
        this.searchParam.process !== ""
      ) {
        newParams.process = this.searchParam.process;
      }

      if (params.process_status !== undefined && params.process_status !== "") {
        newParams.process_status = params.process_status;
      } else if (
        this.searchParam.process_status !== undefined &&
        this.searchParam.process_status !== ""
      ) {
        newParams.process_status = this.searchParam.process_status;
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>