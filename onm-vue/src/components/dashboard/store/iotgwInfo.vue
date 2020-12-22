<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <iotgwInfo-query v-on:search="searchToIotGWInfo"></iotgwInfo-query>
    <iotgwInfo-list v-bind:pList=pList></iotgwInfo-list>
  </div>

</template>

<script>
import IotGWInfoList from './device-iotgw/iotgwInfoList'
import IotGWInfoQuery from './device-iotgw/iotgwInfoQuery'

export default {
  components: {
    'iotgwInfo-list': IotGWInfoList,
    'iotgwInfo-query': IotGWInfoQuery
  },
  data () {
    return {
      title: 'IoT GW 정보 조회',
      pList: [
        {gwKey:"800097556653001", gwId:"KT-GW-00189A27A1A6", gwName: "단말GW1", modelCode:'VSaaS-HMIOT-K001GW', mac_id :'00189A27A1A6', iotDeviceSeq :"1", serviceCode:"S", addDate:"2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", manageCode: "S", closeDate: ""},
      ]
    }
  },
  methods: {
    searchToIotGWInfo: function(param){
      console.log("부모 메소드 searchToIotGWInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>