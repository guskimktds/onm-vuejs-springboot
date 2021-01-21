<template>
    <v-container fluid>
      <v-card>
        <streamer-query v-on:search="searchToProcess"></streamer-query>
        <streamer-list v-bind:pList=pList></streamer-list>
      </v-card>
    </v-container>
</template>

<script>
import List from './streamer/streamerList'
import Query from './streamer/streamerQuery'

import axios from "axios"

export default {
  components: {
    streamerList : List,
    streamerQuery : Query
  },
  data () {
    return {
      title: '스트리머 조회',
      pList: []
    }
  },

  methods: {
    searchToProcess: function(params){

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11005/get_streamer_info`, params)
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
    this.searchToProcess({"local_gw_id":1, "page_no":1, "view_cnt":10000});
  }

}
</script>

<style scoped>

</style>