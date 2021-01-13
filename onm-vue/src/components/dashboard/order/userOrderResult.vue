<template>
  <!-- <div>
    <p class="title">{{ title }}</p>
    <userOrderResult-query v-on:search="searchToUserOrderResult"></userOrderResult-query>
    <userOrderResult-list v-bind:pList=pList></userOrderResult-list>
  </div> -->
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <user-order-result-query v-on:search="searchToUserOrderResult"></user-order-result-query>
        <user-order-result-list v-bind:pList=pList></user-order-result-list>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import UserOrderResultList from './user-order-result/userOrderResultList'
import UserOrderResultQuery from './user-order-result/userOrderResultQuery'

import axios from "axios"

export default {
  components: {
    UserOrderResultList,
    UserOrderResultQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 처리 결과',
      pList: [
        // {tranId:"GPNA_20201029133825838_LVSPWS0001", contractId:"S00347106", orderType:"4201", responseCode: 200, responseMessage: "SUCCESS", registerDate:"20-10-29 13:38:04", orderStatusAlarm: "T", orderStatusAlarmDate: "", orderStatusAlarmResult:""},
        // {tranId:"GPNA_20201029133825838_LVSPWS0002", contractId:"S00347106", orderType:"4201", responseCode: 200, responseMessage: "SUCCESS", registerDate:"20-10-29 13:38:04", orderStatusAlarm: "Y", orderStatusAlarmDate: "20-10-29 13:38:04", orderStatusAlarmResult:"LVSP_2020113111604839_GPNAWS0002"},
      ]
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12011/get_user_subs_result'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12011/get_user_subs_result`
    var params = {
      page_no: 1,
      view_cnt: 5
    }
    var headers = {
      'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      'Content-Type': 'application/json'
    }

    console.log('VUE_APP_BACKEND_SERVER_URL_TB:', url)
    console.log(process.env)

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          //this.list = JSON.parse(result.data.menu)
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
    searchToUserOrderResult: function(params){
      console.log("부모 메소드 searchToUserOrderResult 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12011/get_user_subs_result`
      // var params = {
      //   page_no: 1,
      //   view_cnt: 5
      // }
      var headers = {
        'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
        'Content-Type': 'application/json'
      }

      axios.post(url, params, headers)
      // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
      //   params
      // })
      .then((result) => {
        console.log(result)
        //this.list = JSON.parse(result.data.menu)
        this.list = result.data
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })

    }    
  }
}
</script>

<style scoped>

</style>