<template>
   <v-container fluid>
      <v-card>
        <auth-target-device-query v-on:search="searchToAuthTargetDevice"></auth-target-device-query>
        <auth-target-device-list v-bind:pList=pList></auth-target-device-list>
      </v-card>
    </v-container>


</template>

<script>
import AuthTargetDeviceList from './auth-target-device/authTargetDeviceList'
import AuthTargetDeviceQuery from './auth-target-device/authTargetDeviceQuery'
import axios from "axios"

export default {
  components: {
    AuthTargetDeviceList,
    AuthTargetDeviceQuery
  },
  data () {
    return {
      title: '인증 대상 단말 정보',
      pList: [
        // {deviceId:"200000142363", orderNumber:"20303DO9519190", mac_id: "D4B83F03ED74", manageStatusCode:"S", deviceCode: "K9197981", modelName:"VSaaS-SNC-0201DSL", responseCode: 200, openOrderNum: "20303DO95919D", authDate: "2020-10-29 13:38:04.718235", deleteDate: "", registDate:"2020-10-29 13:38:04.718235"},
        // {deviceId:"200000142364", orderNumber:"20303DO9519190", mac_id: "D4B83F03ED74", manageStatusCode:"S", deviceCode: "K9197981", modelName:"VSaaS-SNC-0201DSL", responseCode: 200, openOrderNum: "20303DO95919D", authDate: "2020-10-29 13:38:04.718235", deleteDate: "", registDate:"2020-10-29 13:38:04.718235"},
      ]
    }
  },  
  created: function() {

    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12009/get_auth_device_list'
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
    searchToAuthTargetDevice: function(params){
      console.log("부모 메소드 searchToAuthTargetDevice 호출: "+JSON.stringify(params));
      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12009/get_auth_device_list'
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