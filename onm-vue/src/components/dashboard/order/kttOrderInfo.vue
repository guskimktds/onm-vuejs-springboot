<template>
  <div>
    <v-container fluid>
      <v-card>
        <ktt-order-info-query v-on:search="searchToKTTOrderInfo"></ktt-order-info-query>
        <ktt-order-info-list v-bind:pList=pList></ktt-order-info-list>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import KttOrderInfoList from './ktt-order/kttOrderInfoList'
import KttOrderInfoQuery from './ktt-order/kttOrderInfoQuery'
import axios from "axios"

export default {
  components: {
    KttOrderInfoList,
    KttOrderInfoQuery
  },
  data () {
    return {
      title: 'KTT 청약 정보',
      pList: []
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12005/get_user_ktt_subs'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12005/get_user_ktt_subs`
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
            this.pList = response.data.data.tel_no_list;

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
    searchToKTTOrderInfo: function(params){
      console.log("부모 메소드 searchToKTTOrderInfo 호출: "+JSON.stringify(params));
      // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12005/get_user_ktt_subs'
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12005/get_user_ktt_subs`
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
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.tel_no_list;

          }else{
            this.pList = [];
            alert(resCode + " / " + resMsg);
          }
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