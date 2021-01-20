<template>
  <v-container fluid>
      <v-card>
        <account-query v-on:search="searchToButton"></account-query>
        <account-list v-bind:pList=pList></account-list>
       </v-card>
    </v-container>

</template>

<script>
import AccountList from './accountList'
import AccountQuery from './accountQuery'
//로그인 시 서버에서 불러오면 수정해야함
// import accountListMock from '../../../mock/accountListMock.json';
import axios from "axios"

// const resourceHost = "http://localhost:3000"

const API_URL = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}`

export default {
  components: {
    AccountList,
    AccountQuery
  },
  data () {
    return {
      title: '계정 조회',
      // list: accountListMock
      pList: []
    }
  },
  methods: {
    searchToButton: function(params){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      console.log(process.env);
      // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15001/get_account'
      var url = API_URL+'/ONM_15001/get_account'
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
              this.pList = result.data.data.account_list;
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15001/get_account'
    var url = API_URL+'/ONM_12002/get_user_subs_detail'
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
            this.pList = response.data.data.account_list;

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
</script>

<style scoped>

</style>