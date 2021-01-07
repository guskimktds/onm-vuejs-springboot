<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <smsHistoryInfo-query
          v-on:search="searchToSmsHistoryInfo"
        ></smsHistoryInfo-query>
        <smsHistoryInfo-list v-bind:List="list"></smsHistoryInfo-list>
      </v-card>
    </v-container>
  </div>
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
      list: [],
      // pList: [
      //   {seqID:"5813329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
      //   {seqID:"2813329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
      //   {seqID:"1013329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
      //   {seqID:"1812329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
      // ]
    };
  },
  created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-sms-history`)
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
    searchToSmsHistoryInfo: function (params) {
      console.log(
        "부모 메소드 searchToSmsHistoryInfo 호출: " + JSON.stringify(params)
      );

      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-sms-history/query`,
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