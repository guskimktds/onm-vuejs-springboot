<template>
    <v-container fluid>
      <v-card>

        <status-query 
          v-on:search="searchToProcess"
          v-bind:param=searchParam></status-query>

        <stats-list
          v-bind:pList=pList></stats-list>

      </v-card>
    </v-container>
</template>


<script>
import StatsList from './orderStatsList'
import StatusQuery from './orderStatusQuery'
import dateInfo from '../../../../utils/common'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  components: {
    StatsList,
    StatusQuery
  },
  data () {
    return {
      title: '청약 통계',
      pList: [],

      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      },

    }
  },

  methods: {
    searchToProcess: function(params){

      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11007/get_subs_stat`

      var reqParams = this.handleParams(params);
 
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.subs_stat_list;
        } else {
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
  }

  ,mounted() {
    this.searchToProcess(this.searchParam);
  },

}
</script>

<style scoped>

</style>