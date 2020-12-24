<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <deviceOrderInfo-query v-on:search="searchToDeviceOrderInfo"></deviceOrderInfo-query>
    <deviceOrderInfo-list v-bind:pList=pList></deviceOrderInfo-list>
  </div>

</template>

<script>
import DeviceOrderInfoList from './device-order-info/deviceOrderInfoList'
import DeviceOrderInfoQuery from './device-order-info/deviceOrderInfoQuery'

export default {
  components: {
    'deviceOrderInfo-list': DeviceOrderInfoList,
    'deviceOrderInfo-query': DeviceOrderInfoQuery
  },
  data () {
    return {
      title: '단말 청약 오더 정보',
      pList: [
          {tranId:"GPNA_20201029133825838_LVSPWS0001", hopeDate:"2020110315", orderNumber:"20303DO9519190", orderSeq:1, contractId:"S00347106", orderType:"4201", deviceChangeCode: "1", mac_id: "D4883F03ED74", deviceType: "CAM", changeTypeCode: "55", usageType:"T", registerDate: "2020-10-29 13:38:31.680793"},
          {tranId:"GPNA_20201029133825838_LVSPWS0002", hopeDate:"2020110315", orderNumber:"20303DO9519190", orderSeq:1, contractId:"S00347106", orderType:"4201", deviceChangeCode: "1", mac_id: "D4883F03ED74", deviceType: "CAM", changeTypeCode: "55", usageType:"T", registerDate: "2020-10-29 13:38:31.680793"},
        ]
    }
  },
  methods: {
    searchToDeviceOrderInfo: function(param){
      console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>