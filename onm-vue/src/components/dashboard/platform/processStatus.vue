<template>
  <!-- <div> -->
    <v-container fluid>
      <v-card>
        <!-- <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar> -->
        <process-query v-on:search="searchToProcess"></process-query>
        <process-list v-bind:pList=pList></process-list>
      </v-card>
    </v-container>
  <!-- </div> -->

</template>

<script>
import ProcessList from './process/processList'
import ProcessQuery from './process/processQuery'

import axios from "axios"

export default {
  
  components: {
    'process-list': ProcessList,
    'process-query': ProcessQuery
  },
  data () {
    return {
      title: '프로세스 현황 화면',
      pList: [],
    }
  },
  methods: {
    searchToProcess: function(params){
      console.log("1 params = ");
      console.log(params)

      if(!params) params = new Object();
      if(!params.page_no) params.page_no = 1;
      if(!params.view_cnt) params.view_cnt = 1000;
      
      console.log("2 params = ");
      console.log(params);

      var url = "https://test-onm.ktvsaas.co.kr/V110/ONM_11001/get_process_status";
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
          this.pList = response.data.data.process_list;

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

  mounted: function() {
    this.searchToProcess();
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>