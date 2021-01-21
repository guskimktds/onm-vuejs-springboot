<template>
    <v-container fluid>
      <v-card>
        <loginHistoryInfo-query
          v-on:search="searchToLoginHistoryInfo"
        ></loginHistoryInfo-query>
        <loginHistoryInfo-list v-bind:pList="pList"></loginHistoryInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import LoginHistoryInfoList from "./loginHistoryInfoList";
import LoginHistoryInfoQuery from "./loginHistoryInfoQuery";

import axios from "axios";

export default {
  components: {
    LoginHistoryInfoList,
    LoginHistoryInfoQuery,
  },
  data() {
    return {
      title: "로그인 이력 조회",
      pList:[]
    };
  },
  created: function () {
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}:8443/V110/ONM_14003/get_login_history`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.pList = result.data.data.login_history_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToLoginHistoryInfo: function (params) {
      console.log(
        "부모 메소드 searchToLoginHistoryInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}:8443/V110/ONM_14003/get_login_history`, {
          params,
        })
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.pList = result.data;
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },
  },
};
</script>

<style scoped>
</style>