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
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_14006/get_push_sending_history'
    // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12006/get_device_order`
    var params = {
      page_no: 1,
      view_cnt: 5
    }
    var headers = {
      'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      'Content-Type': 'application/json'
    }

    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list;

          }else{
            this.pList = [];
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
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