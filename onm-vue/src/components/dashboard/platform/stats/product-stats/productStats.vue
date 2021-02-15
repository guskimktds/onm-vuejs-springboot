<template>
    <v-container fluid>
      <v-card>
        <stats-query 
          v-on:search="searchToProcess"
          v-bind:param=searchParam></stats-query>
        <stats-list 
          v-bind:pList=pList
          v-bind:pHeader=pHeader
          
         ></stats-list>
      </v-card>
    </v-container>
</template>


<script>
import StatsList from './productStatsList'
import StatsQuery from './productStatsQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};


export default {
  components: {
   StatsList,
   StatsQuery
  },
  data () {
    return {
      title: '상품 통계',
      pList: [],
      pHeader:[],
      reqPagingInfo:{
        start_date: "20210101",
        end_date: "20210201"
      },
     
      searchParam: {
        appoint_date: ''
      },
    }
  },
  methods: {
    searchToProcess: function(params){
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11009/get_prod_stat`;
     
     console.log(params)
     var reqParams=this.reqPagingInfo
      // var reqParams = this.setToSearchParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pHeader=response.data.data.header_list;
          this.pList = response.data.data.prod_list;
        } else {
          this.pHeader=[];
          this.pList = [];
        
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
    
    setToSearchParams: function(values){
      console.log(values)

      var params = {
        start_date: values.start_date,
        end_date: values.end_date
      }

      console.log(params)

      this.searchToProcess(params)
    },
    getDataFromApi(){
      this.loading=true;
      this.searchToProcess(this.options);
    }
  },
      watch: {
        options: {
        handler() {
         this.getDataFromApi();
        },
        deep: true,
        },
    },
}
</script>

<style scoped>

</style>