<template>
 
<div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <iotgwInfo-query v-on:search="searchToIotGWInfo"></iotgwInfo-query>
        <iotgwInfo-list v-bind:List="list"></iotgwInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import IotGWInfoList from './iotgwInfoList'
import IotGWInfoQuery from './iotgwInfoQuery'

import axios from "axios";

export default {
  components: {
    'iotgwInfo-list': IotGWInfoList,
    'iotgwInfo-query': IotGWInfoQuery
  },
  data () {
    return {
      title: 'IoT GW 정보 조회',
      list: [],
      // pList: [
      //   {gwKey:"800097556653001", gwId:"KT-GW-00189A27A1A6", gwName: "단말GW1", modelCode:'VSaaS-HMIOT-K001GW', mac_id :'00189A27A1A6', iotDeviceSeq :"1", serviceCode:"S", addDate:"2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", manageCode: "S", closeDate: ""},
      // ]
    }
  },
   created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-device-iotgw`)
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToIotGWInfo: function(params){
      console.log("부모 메소드 searchToIotGWInfo 호출: "+JSON.stringify(params));
    console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/sstore-device-iotgw/query`,
          {
            params,
          }
        )
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.list = result.data;
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    }
  }
}
</script>

<style scoped>

</style>