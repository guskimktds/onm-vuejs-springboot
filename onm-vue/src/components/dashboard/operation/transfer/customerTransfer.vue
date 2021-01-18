<template>
    <v-container fluid>
      <v-card>
        <customer-transfer-query v-on:search="searchToButton"></customer-transfer-query>
        <customer-transfer-list v-bind:pList=pList></customer-transfer-list>
      </v-card>
    </v-container>
</template>

<script>
import customerTransferQuery from './customerTransferQuery'
import customerTransferList from './customerTransferList'

import axios from "axios"
import EventBus from '../../../../EventBus';

export default {
  components:{
    customerTransferQuery,
    customerTransferList
  },
  data () {
    return {
      title: '고객이전 조회',
      pList: []
    }
  },
  created: function() {
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15012/get_user_mig_info'
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
            this.pList = response.data.data.user_mig_info_list;

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
     EventBus.$on('createItem', parameter => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`, parameter)
            .then((result) => {
              console.log(result)
              // this.list = JSON.parse(result.data.menu)
              // this.list = result.data
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    })
  },
  methods: {
    searchToButton: function(params){
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15012/get_user_mig_info'
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
              this.pList = result.data.data.user_mig_info_list;
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