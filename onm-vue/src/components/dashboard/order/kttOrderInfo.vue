<template>
  <!-- <div>
    <p class="title">{{ title }}</p>
    <ktt-order-info-query v-on:search="searchToKTTOrderInfo"></ktt-order-info-query>
    <ktt-order-info-list v-bind:pList=pList></ktt-order-info-list>
  </div> -->
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
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
      pList: [
        // {tranId:"GPNA_20201029133825838_LVSPWS0001", serviceNum: "61365079", systemId: "13831700", contractId:"M", kttContractId: "51132203"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0002", serviceNum: "61365079", systemId: "13831700", contractId:"M", kttContractId: "51132203"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0003", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0004", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0005", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
      ]
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12011/get_user_subs_result'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12005/get_user_ktt_subs`
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
    searchToKTTOrderInfo: function(params){
      console.log("부모 메소드 searchToKTTOrderInfo 호출: "+JSON.stringify(params));
      // console.log("부모 메소드 searchToUserOrderPhone 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/ONM_12005/get_user_ktt_subs`
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