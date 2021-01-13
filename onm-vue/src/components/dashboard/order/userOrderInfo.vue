<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <userOrderInfo-query v-on:search="searchToUserOrderInfo"></userOrderInfo-query>
        <userOrderInfo-list v-bind:pList=pList></userOrderInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import UserOrderInfoList from './user/order-info/userOrderInfoList'
import UserOrderInfoQuery from './user/order-info/userOrderInfoQuery'

import axios from "axios"

import EventBus from '../../../EventBus';


export default {
  components: {
    'userOrderInfo-list': UserOrderInfoList,
    'userOrderInfo-query': UserOrderInfoQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 정보',
      pList: [
        // {tranId:"GPNA_20201029133825838_LVSPWS0001", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0002", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0003", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0004", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "5560", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
      ]
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12001/get_user_subs_order_info'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12001/get_user_subs_order_info`
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
          // console.log(response.data)
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
  mounted: function() {
     EventBus.$on('createItem', params => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12001/get_user_subs_order_info`
        var headers = {
          'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
          'Content-Type': 'application/json'
        }

        axios
        .post(url, params, headers)
        .then((response) => {
          // console.log(response.data)
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
    })
  },
  methods: {
    searchToUserOrderInfo: function(params){

    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12001/get_user_subs_order_info'
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