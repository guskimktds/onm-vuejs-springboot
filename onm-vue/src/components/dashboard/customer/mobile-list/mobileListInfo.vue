<template>
    <v-container fluid>
      <v-card>
        <mobileListInfo-query
          v-on:search="searchToMobileListInfo"
        ></mobileListInfo-query>
        <mobileListInfo-list v-bind:List="list"></mobileListInfo-list>
      </v-card>
    </v-container>
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
      title: "모바일 단말 목록 - #SMS 발송이력으로 api가 연결 되 있음",
      pList: []
    };
  },
  created: function () {
    console.log(process.env);
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14005/get_mobile_device_list`,{
        
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
          `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14005/get_mobile_device_list`,
          {
            params,
          }
        )
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.list = result.data.data.mobile_device_list;
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