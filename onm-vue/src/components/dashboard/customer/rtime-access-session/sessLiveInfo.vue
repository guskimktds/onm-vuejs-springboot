<template>
  <!-- <div> -->
    <v-container fluid>
      <v-card>
        <!-- <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar> -->
        <sessLiveInfo-query
          v-on:search="searchToSessLiveInfo"
        ></sessLiveInfo-query>
        <sessLiveInfo-list v-bind:pList="pList"></sessLiveInfo-list>
      </v-card>
    </v-container>
  <!-- </div> -->
</template>

<script>
import SessLiveInfoList from "./sessLiveInfoList";
import SessLiveInfoQuery from "./sessLiveInfoQuery";

import axios from "axios"

export default {
  components: {
    SessLiveInfoList,
    SessLiveInfoQuery,
  },
  data() {
    return {
      title: "실시간 접속 세션 조회",
      pList: [],
    };
  },
  created: function () {

    var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_14002/get_login_session_list'
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
            this.pList = response.data.data.session_list;

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
    searchToSessLiveInfo: function (params) {
      console.log(
        "부모 메소드 searchToSessLiveInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_14002/get_login_session_list'
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