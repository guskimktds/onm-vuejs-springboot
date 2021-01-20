<template>
  <v-container fluid>
      <v-card>    
        <device-order-info-query v-on:search="searchToDeviceOrderInfo"></device-order-info-query>
        <device-order-info-list v-bind:pList=pList></device-order-info-list>
      </v-card>
    </v-container>

</template>

<script>
import DeviceOrderInfoList from './device-order-info/deviceOrderInfoList'
import DeviceOrderInfoQuery from './device-order-info/deviceOrderInfoQuery'

import axios from "axios"

// import EventBus from '../../../EventBus';

export default {
  components: {
    DeviceOrderInfoList,
    DeviceOrderInfoQuery
  },
  data () {
    return {
      title: '단말 청약 오더 정보',
      pList: [
        // {tranId:"GPNA_20201029133825838_LVSPWS0001", hopeDate:"2020110315", orderNumber:"20303DO9519190", orderSeq:1, contractId:"S00347106", orderType:"4201", deviceChangeCode: "1", mac_id: "D4883F03ED74", deviceType: "CAM", changeTypeCode: "55", usageType:"T", registerDate: "2020-10-29 13:38:31.680793"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0002", hopeDate:"2020110315", orderNumber:"20303DO9519190", orderSeq:1, contractId:"S00347106", orderType:"4201", deviceChangeCode: "1", mac_id: "D4883F03ED74", deviceType: "CAM", changeTypeCode: "55", usageType:"T", registerDate: "2020-10-29 13:38:31.680793"},
      ]
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12006/get_device_order'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12006/get_device_order`
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
            this.pList = response.data.data.device_order_list;

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
    searchToDeviceOrderInfo: function(params){
      console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
      // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12006/get_device_order'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12006/get_device_order`
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