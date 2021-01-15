<template>
    <v-container fluid>
      <v-card>
        <device-query v-on:search="searchToButton"></device-query>
        <device-list v-bind:pList=pList></device-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceQuery from './deviceQuery'
import deviceList from './deviceList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"
// import { eventBus } from '../../../../main'
import EventBus from '../../../../../EventBus';

export default {
  components:{
    deviceQuery,
    deviceList
  },
  data () {
    return {
      title: 'client 단말 관리',
      pList: []
    }
  },
  created: function() {
    var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15010/get_app_info'
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
            this.pList = response.data.data.app_info_list;

          }else{
            this.pList = [];
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })

  },
  mounted: function() {[
    EventBus.$on('createItem', parameter => {
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode`, parameter)
            .then((result) => {
              console.log(result)
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }),
    EventBus.$on('editedItem', (parameter, index) => {
      // console.log(parameter, index)
          axios
                .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/update`, parameter )
                .then((result) => {
                  console.log(result)
                  // this.list = JSON.parse(result.data.menu)
                  // this.list = result.data
                  Object.assign(this.this.list[index], parameter)
                })
                .catch((ex) => {
                  console.log('조회 실패',ex)
                })
        })
    ]

  },
  methods: {
    searchToButton: function(params){
      console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15010/get_app_info'
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
        this.pList = result.data.data.app_info_list;
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    }    
  }
}
</script>

<style scoped>
.container {
  
}
</style>