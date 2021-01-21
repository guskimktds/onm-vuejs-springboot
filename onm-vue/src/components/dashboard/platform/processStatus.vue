<template>
    <v-container fluid>
      <v-card>
        <process-query v-on:search="searchToProcess"></process-query>
        <process-list v-bind:pList=pList></process-list>
      </v-card>
    </v-container>
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

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11001/get_process_status`, params)
      .then( (response) => {
        if(response.data.res_code == 200){
          this.pList = response.data.data.process_list;
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

  mounted: function() {
    this.searchToProcess({"page_no":1, "view_cnt":10});
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>