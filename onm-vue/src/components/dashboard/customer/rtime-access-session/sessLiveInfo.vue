<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <sessLiveInfo-query
          v-on:search="searchToSessLiveInfo"
        ></sessLiveInfo-query>
        <sessLiveInfo-list v-bind:List="list"></sessLiveInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SessLiveInfoList from "./sessLiveInfoList";
import SessLiveInfoQuery from "./sessLiveInfoQuery";

import axios from "axios"

export default {
  components: {
    SessLiveInfoList,
    SessLiveInfoQuery,
  },
  data() {
    return {
      title: "실시간 접속 세션 조회",
      list: [],
      // pList: [
      //   {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", usrId:"0012484661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      //   {loginKey:"23412fasvas", usrId:"0012484662", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      //   {loginKey:"ceae23casdcae", usrId:"01244661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      //   {loginKey:"asdfece52555567c-afsadf", usrId:"001284661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      //   {loginKey:"asdfdccd45-fh", usrId:"00124661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      // ]
    };
  },
  created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-ras`)
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToSessLiveInfo: function (params) {
      console.log(
        "부모 메소드 searchToSessLiveInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-ras/query`, {
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