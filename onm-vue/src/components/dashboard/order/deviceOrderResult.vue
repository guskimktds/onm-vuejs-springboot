<template>
  <!-- <div>
    <p class="title">{{ title }}</p>
    <deviceOrderResult-query v-on:search="searchToDeviceOrderResult"></deviceOrderResult-query>
    <deviceOrderResult-list v-bind:pList=pList></deviceOrderResult-list>
  </div> -->

  <v-container fluid>
      <v-card>
        <!-- <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar> -->
        <device-order-result-query v-on:search="searchToDeviceOrderResult"></device-order-result-query>
        <device-order-result-list v-bind:pList=pList></device-order-result-list>
      </v-card>
    </v-container>

</template>

<script>
import DeviceOrderResultList from './device-order-result/deviceOrderResultList'
import DeviceOrderResultQuery from './device-order-result/deviceOrderResultQuery'

import axios from "axios"

export default {
  components: {
    DeviceOrderResultList,
    DeviceOrderResultQuery
  },
  data () {
    return {
      title: '단말 청약 오더 처리결과',
      pList: [
          // {tranId:"GPNA_20201029133825838_LVSPWS0001", orderType:"4201", orderNumber:"20303DO9519190", responseCode: 200, responseMessage: "SUCCESS", orderStatusAlarm: "T",orderStatusAlarmDate: "2020-10-29 13:38:04.718", orderStatusAlarmResult:"LVSP_2020113111604839_GPNA//N0002//SUCCESS//"},
        ]
    }
  },
  created: function() {

    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12012/get_device_order_result_list'
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
            console.log(response.data.data.device_order_result_list);
            this.pList = response.data.data.device_order_result_list;

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
    searchToDeviceOrderResult: function(params){
      console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12012/get_device_order_result_list'
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