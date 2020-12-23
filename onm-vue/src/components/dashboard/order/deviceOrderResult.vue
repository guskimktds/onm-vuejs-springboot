<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <deviceOrderResult-query v-on:search="searchToDeviceOrderResult"></deviceOrderResult-query>
    <deviceOrderResult-list v-bind:pList=pList></deviceOrderResult-list>
  </div>

</template>

<script>
import DeviceOrderResultList from './device-order-result/deviceOrderResultList'
import DeviceOrderResultQuery from './device-order-result/deviceOrderResultQuery'

export default {
  components: {
    'deviceOrderResult-list': DeviceOrderResultList,
    'deviceOrderResult-query': DeviceOrderResultQuery
  },
  data () {
    return {
      title: '단말 청약 오더 처리결과',
      pList: [
          {tranId:"GPNA_20201029133825838_LVSPWS0001", orderType:"4201", orderNumber:"20303DO9519190", responseCode: 200, responseMessage: "SUCCESS", orderStatusAlarm: "T",orderStatusAlarmDate: "2020-10-29 13:38:04.718", orderStatusAlarmResult:"LVSP_2020113111604839_GPNA//N0002//SUCCESS//"},
        ]
    }
  },
  methods: {
    searchToDeviceOrderResult: function(param){
      console.log("부모 메소드 searchToDeviceOrderResult 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>