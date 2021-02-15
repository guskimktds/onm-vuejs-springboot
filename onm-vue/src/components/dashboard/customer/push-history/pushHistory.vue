<template>
  <v-container fluid>
      <v-card>
        <pushHistory-query
          v-on:search="searchToPushHistory"
        ></pushHistory-query>
        <pushHistory-list v-bind:pList="pList"></pushHistory-list>
      </v-card>
    </v-container>
</template>

<script>
import PushHistoryList from './pushHistoryList'
import PushHistoryQuery from './pushHistoryQuery'

import axios from "axios";

export default {
  components: {
    PushHistoryList,
    PushHistoryQuery
  },
  data () {
    return {
      title: '푸시 발송 이력',
      pList: []
    }
  },
  created: function () {
    console.log(process.env);
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14006/get_push_sending_history`,{
        
        "page_no": 1,
        "view_cnt": 5,
        "local_gw_id": "1"

      })
      .then((result) => {
        console.log(result);
        this.pList = result.data.data.list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToPushHistory: function(params){
      console.log("부모 메소드 searchToPushHistory 호출: "+JSON.stringify(params));
    console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14006/get_push_sending_history`,
          {
            params,
          }
        )
        .then((response) => {
          console.log(response);
          // this.list = JSON.parse(result.data.menu)
          this.pList = response.data.data.list;
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    }
  }
}
</script>

<style scoped>

</style>