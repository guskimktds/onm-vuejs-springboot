<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <loginHistoryInfo-query
          v-on:search="searchToLoginHistoryInfo"
        ></loginHistoryInfo-query>
        <loginHistoryInfo-list v-bind:List="list"></loginHistoryInfo-list>
      </v-card>
    </v-container>
  </div>
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
      list:[]
      
      // pList: [
      //   {
      //     loginKey: "3e206166-0886-4485-8432-1af9fb55e28",
      //     loginId: "0012484661",
      //     loginType: 2,
      //     expireDate: "2020-11-03 02:00:04.173138",
      //     loginDate: "2020-11-03 02:00:04.173138",
      //     logoutDate: "2020-11-03 02:00:04.173138",
      //     osType: "PC",
      //   },
      //   {
      //     loginKey: "3e206166-0886-4485-8432-1af9f45e28",
      //     loginId: "0012484661",
      //     loginType: 2,
      //     expireDate: "2020-11-03 02:00:04.173138",
      //     loginDate: "2020-11-03 02:00:04.173138",
      //     logoutDate: "2020-11-03 02:00:04.173138",
      //     osType: "PC",
      //   },
      //   {
      //     loginKey: "3e206166-0886-4485-8432-1ab545e28",
      //     loginId: "0012484661",
      //     loginType: 2,
      //     expireDate: "2020-11-03 02:00:04.173138",
      //     loginDate: "2020-11-03 02:00:04.173138",
      //     logoutDate: "2020-11-03 02:00:04.173138",
      //     osType: "PC",
      //   },
      //   {
      //     loginKey: "3e206166-0886-4485-8432-f9fb545e28",
      //     loginId: "0012484661",
      //     loginType: 2,
      //     expireDate: "2020-11-03 02:00:04.173138",
      //     loginDate: "2020-11-03 02:00:04.173138",
      //     logoutDate: "2020-11-03 02:00:04.173138",
      //     osType: "PC",
      //   },
      //   {
      //     loginKey: "3e206166-0886-4485-8432-af9fb545e28",
      //     loginId: "0012484661",
      //     loginType: 2,
      //     expireDate: "2020-11-03 02:00:04.173138",
      //     loginDate: "2020-11-03 02:00:04.173138",
      //     logoutDate: "2020-11-03 02:00:04.173138",
      //     osType: "PC",
      //   },
      // ],
    };
  },
  created: function () {
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14003/get_login_history`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.login_history_list;
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
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-signin-history/query`, {
          params,
        })
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.list = result.data;
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