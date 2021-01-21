<template>
    <v-container fluid>
      <v-card>
        <va-query v-on:search="searchToList"></va-query>
        <va-list v-bind:pList=pList></va-list>
      </v-card>
    </v-container>
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

    axios.post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11004/get_va_status`, params)
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

  },

  mounted() {
    this.searchToList({"local_gw_id":"D"});
  },
}
</script>