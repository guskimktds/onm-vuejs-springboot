<template>
    <v-container fluid>
      <v-card>
        <va-query 
          v-on:search="searchToList"
          v-bind:param="searchParam"
        ></va-query>
        <va-list v-bind:pList="pList"></va-list>
      </v-card>
    </v-container>
</template>

<script>

import List from './va/vaList'
import Query from './va/vaQuery'

import axios from "axios"


const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/V110/ONM_11004/get_va_status`;

export default {
  components: {
    vaList : List,
    vaQuery : Query
  },
  data () {
    return {
      title: 'VA 설정 현황',
      pList: [],
      searchParam: {
          local_gw_id: 'D',
      },
    }
  },
  methods: {
    searchToList: function(params){

      var reqParams = this.handleParams(params);

      axios.post(url, reqParams, headers)
        .then( (response) => {
          console.log(response)
          if(response.data.res_code == 200){
            this.pList = response.data.data.list;
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

  mounted() {
    this.searchToList({"local_gw_id":"D"});
  },
}
</script>