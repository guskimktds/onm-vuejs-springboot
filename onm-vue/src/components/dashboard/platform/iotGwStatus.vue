<template>
    <v-container fluid>
      <v-card>
        <process-query v-on:search="searchToProcess"></process-query>
        <process-list v-bind:pList=pList></process-list>
      </v-card>
    </v-container>
</template>


<script>
import List from './iotgw/iotgwList'
import Query from './iotgw/iotgwQuery'

import axios from "axios"

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: 'IoT GW 상태현황',
      pList: [],
    }
  },
  methods: {
    searchToProcess: function(params){
      var url = "https://test-onm.ktvsaas.co.kr/V110/ONM_11003/get_iotgw_status";
      var headers = {
        'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
        'Content-Type': 'application/json'
      }

      axios.post(url, params, headers)
      .then( (response) => {
        console.log(response);
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.list;
        }else{
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
    }
    
  },
  created: function() {
    this.searchToProcess({"page_no":"1", "view_cnt":"10"});
  }  
}
</script>

<style scoped>

</style>