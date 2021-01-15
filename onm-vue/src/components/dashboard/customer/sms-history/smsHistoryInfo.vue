<template>
  <v-container fluid>
      <v-card>
        <smsHistoryInfo-query
          v-on:search="searchToSmsHistoryInfo"
        ></smsHistoryInfo-query>
        <smsHistoryInfo-list v-bind:pList="pList"></smsHistoryInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import SmsHistoryInfoList from "./smsHistoryInfoList";
import SmsHistoryInfoQuery from "./smsHistoryInfoQuery";

import axios from "axios";

export default {
  components: {
    SmsHistoryInfoList,
    SmsHistoryInfoQuery,
  },
  data() {
    return {
      title: "SMS 발송 이력 조회",
      pList: []
    };
  },
  created: function () {
    console.log(process.env);
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14004/get_sms_sending_history`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.pList = result.data.data.sms_history_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToSmsHistoryInfo: function (params) {
      console.log(
        "부모 메소드 searchToSmsHistoryInfo 호출: " + JSON.stringify(params)
      );

      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14004/get_sms_sending_history`,
          {
            params,
          }
        )
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.pList = result.data.data.sms_history_list;
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