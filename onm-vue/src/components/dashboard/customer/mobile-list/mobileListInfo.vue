<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <mobileListInfo-query
          v-on:search="searchToMobileListInfo"
        ></mobileListInfo-query>
        <mobileListInfo-list v-bind:List="list"></mobileListInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import MobileListInfoList from "./mobileListInfoList";
import MobileListInfoQuery from "./mobileListInfoQuery";

import axios from "axios";

export default {
  components: {
    MobileListInfoList,
    MobileListInfoQuery,
  },
  data() {
    return {
      title: "모바일 단말 목록 - ##SMS 발송이력으로 api가 연결 되 있음",
      list: [],
      // pList: [
      //   {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
      //   {loginKey:"3e20616-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
      //   {loginKey:"3e2066-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
      //   {loginKey:"36166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
      //   {loginKey:"e206166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
      // ]
    };
  },
  created: function () {
    console.log(process.env);
    axios
      .post(`${process.env.VUE_APP_TB_API_BACKEND_SERVER_URL}/V110/ONM_14005/get_mobile_device_list`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.mobile_device_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToMobileListInfo: function (params) {
      console.log(
        "부모 메소드 searchToMobileListInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-moblie-list/query`,
          {
            params,
          }
        )
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