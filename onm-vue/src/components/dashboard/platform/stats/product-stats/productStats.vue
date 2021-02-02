
<template>
    <v-container fluid>
      <v-card>

        <process-query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></process-query>

        <process-list 
          v-bind:pList=pList
        ></process-list>

      </v-card>
    </v-container>
</template>


<script>
import List from './productStatsList'
import Query from './productStatsQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11002/get_cam_status`;

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: '상품 통계',

      pList: [],

      searchParam: {
        approveDate: ["", ""],
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
          this.pList = response.data.data.list;
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

      let newParams = {};

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      return newParams;
    },
    
  },
  created: function() {
    this.searchToProcess(this.searchParam);
  }  
}
</script>

<style scoped>

</style>