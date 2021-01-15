<template>
    <v-container fluid>
      <v-card>
        <change-history-query v-on:search="searchToButton"></change-history-query>
        <change-history-list v-bind:pList=pList></change-history-list>
      </v-card>

    </v-container>

</template>

<script>
import ChangeHistoryQuery from './changeHistoryQuery'
import ChangeHistoryList from './changeHistoryList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"

export default {
  components:{
    ChangeHistoryQuery,
    ChangeHistoryList
  },
  data () {
    return {
      title: '관리자 등록 이력',
      pList: []
    }
  },
  created: function() {
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15004/get_mng_regi_history'
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
            this.pList = response.data.data.mng_regi_history_list;

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
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15004/get_mng_regi_history'
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
              this.pList = result.data.data.mng_regi_history_list
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }
  },
}
</script>

<style scoped>

</style>