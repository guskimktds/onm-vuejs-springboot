<template>
    <v-container fluid>
      <v-card>
        <device-status-query v-on:search="searchToButton"></device-status-query>
        <device-status-list v-bind:pList=pList></device-status-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceStatusQuery from './deviceStatusQuery'
import deviceStatusList from './deviceStatusList'

//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"

export default {
  components:{
    deviceStatusQuery,
    deviceStatusList
  },
  data () {
    return {
      title: '고객이전 단말상태 조회',
      pList: []
    }
  },
  created: function() {
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15014/get_user_mig_device'
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
            this.pList = response.data.data.user_mig_device_list;

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
    searchToButton: function(params){
      console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15014/get_user_mig_device'
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
          this.pList = result.data.data.user_mig_device_list;
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