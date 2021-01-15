<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <kttInfo-query v-on:search="searchKTTInfo"></kttInfo-query>
        <kttInfo-list v-bind:List="list"></kttInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import KTTInfoList from "./kttInfoList";
import KTTInfoQuery from "./kttInfoQuery";

import axios from "axios";

export default {
  components: {
    'kttInfo-list': KTTInfoList,
    'kttInfo-query': KTTInfoQuery
  },
  data() {
    return {
      title: "사용자 - KTT 정보",
      list: [],
      // pList: [
      //   {
      //     usrId: "0005875323",
      //     serviceNum: "61365079",
      //     systemId: "13831700",
      //     installStatus: "N",
      //     statusCode: "S",
      //     addDate: "2019-08-26 05:06:12.162905",
      //   },
      //   {
      //     usrId: "0005875324",
      //     serviceNum: "61365079",
      //     systemId: "13831700",
      //     installStatus: "Y",
      //     statusCode: "S",
      //     addDate: "2019-08-26 05:06:12.162905",
      //   },
      //   {
      //     usrId: "0005875325",
      //     serviceNum: "61365079",
      //     systemId: "",
      //     installStatus: "N",
      //     statusCode: "S",
      //     addDate: "2019-08-26 05:06:12.162905",
      //   },
      //   {
      //     usrId: "0005875326",
      //     serviceNum: "61365079",
      //     systemId: "",
      //     installStatus: "N",
      //     statusCode: "S",
      //     addDate: "2019-08-26 05:06:12.162905",
      //   },
      //   {
      //     usrId: "0005875327",
      //     serviceNum: "61365079",
      //     systemId: "",
      //     installStatus: "N",
      //     statusCode: "S",
      //     addDate: "2019-08-26 05:06:12.162905",
      //   },
      // ],
    };
  },
  created: function () {
   axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`,{
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.kt_info_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchKTTInfo: function (params) {
      console.log("부모 메소드 searchKTTInfo 호출: " + JSON.stringify(params));
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-ktt/query`, {
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