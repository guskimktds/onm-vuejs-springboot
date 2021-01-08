<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <va-query v-on:search="searchToList"></va-query>
        <va-list v-bind:pList=pList></va-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import List from './va/vaList'
import Query from './va/vaQuery'

import axios from "axios"

export default {
  components: {
    vaList : List,
    vaQuery : Query
  },
  data () {
    return {
      title: 'VA 설정 현황',
      pList: []
    }
  },
  methods: {
    searchToList: function(params){
      console.log("1 params = ");
      console.log(params)

      if(!params) params = new Object();
      if(!params.local_gw_id) params.local_gw_id = 1;
      
      console.log("2 params = ");
      console.log(params);

      var url = "https://test-onm.ktvsaas.co.kr/V110/ONM_11004/get_va_status";
      var headers = {
        'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
        'Content-Type': 'application/json'
      }

      axios.post(url, params, headers)
      .then( (response) => {
        console.log("#####response");
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
    
    },

    mounted() {
      this.search();
    },

  }
}
</script>