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

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11003/get_iotgw_status`, params)
      .then( (response) => {
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
    }
    
  },
  created: function() {
    this.searchToProcess({"page_no":"1", "view_cnt":"10"});
  }  
}
</script>

<style scoped>

</style>