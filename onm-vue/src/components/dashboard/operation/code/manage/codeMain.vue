<template>
    <v-container fluid>
      <v-card>
        <code-query v-on:search="searchToButton"></code-query>
        <code-list v-bind:pList=pList></code-list>
      </v-card>

    </v-container>
</template>

<script>
import CodeQuery from './codeQuery'
import CodeList from './codeList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"
// import { eventBus } from '../../../../main'
import EventBus from '../../../../../EventBus';

export default {
  components:{
    CodeQuery,
    CodeList
  },
  data () {
    return {
      title: '코드관리',
      pList: []
    }
  },
  created: function() {
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15006/get_code'
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
    console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15006/get_code'
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
              this.pList = result.data.data.list;
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },
    // saveToData: function(){
    //   console.log('saveToData Method call : ',process.env);
    //   axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone/query`, {       
    //               params
    //         })
    //         .then((result) => {
    //           console.log(result)
    //           // this.list = JSON.parse(result.data.menu)
    //           this.list = result.data
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    // }

    
  },
}
</script>

<style scoped>

</style>