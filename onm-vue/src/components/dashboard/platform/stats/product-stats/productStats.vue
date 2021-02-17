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
import dateInfo from '../../../../utils/common'

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

      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      },
    }
  },
  methods: {
    searchToProcess: function(params){
     var url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11009/get_prod_stat`;
     
     var reqParams=this.handleParams(params)

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

     handleParams: function (params) {
      
      var newParams ={
        start_date: params.start_date.replace(/-/g,""),
        end_date: params.end_date.replace(/-/g,"")
      }
      return newParams;
    },
  },

}
</script>

<style scoped>

</style>