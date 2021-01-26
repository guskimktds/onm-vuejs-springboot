<template>
    <v-container fluid>
      <v-card>
        <streamer-query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></streamer-query>
        <streamer-list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="searchToProcess"
        ></streamer-list>
      </v-card>
    </v-container>
</template>

<script>
import List from './streamer/streamerList'
import Query from './streamer/streamerQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11005/get_streamer_info`;

export default {
  components: {
    streamerList : List,
    streamerQuery : Query
  },
  data () {
    return {
      title: '스트리머 조회',

      pList: [],

      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },

      resPagingInfo: {},

      searchParam: {
        local_gw_id: "D"
      },
      
    }
  },

  methods: {
    searchToProcess: function(params){

      var reqParams = this.handleParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        console.log(response);

        if(response.data.res_code == 200){
          this.pList = response.data.data.stm_list;
        }else{
          this.pList = [];
          alert(response.data.res_code + " / " + response.data.res_msg);
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

      return newParams;
    },
    
  },

}
</script>

<style scoped>

</style>