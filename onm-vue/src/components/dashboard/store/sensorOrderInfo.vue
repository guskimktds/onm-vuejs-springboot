<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <sensorOrderInfo-query v-on:search="searchSensorOrderInfo"></sensorOrderInfo-query>
    <sensorOrderInfo-list v-bind:pList=pList></sensorOrderInfo-list>
  </div>

</template>

<script>
import SensorOrderInfoList from './sensor-order/sensorOrderInfoList'
import SensorOrderInfoQuery from './sensor-order/sensorOrderInfoQuery'

export default {
  components: {
    'sensorOrderInfo-list': SensorOrderInfoList,
    'sensorOrderInfo-query': SensorOrderInfoQuery
  },
  data () {
    return {
      title: '사용자 센서 신청 현황',
      pList: [
        {sensorId: "1", sensorName: "문열림센서", sensorTag:"S", statusCode:"10002", sensorCnt:2},
        {sensorId: "2", sensorName: "유리창깨짐센서", sensorTag:"S", statusCode:"10003", sensorCnt:1},
        {sensorId: "3", sensorName: "움직임센서", sensorTag:"S", statusCode:"10004", sensorCnt:2},
      ]
    }
  },
  methods: {
    searchSensorOrderInfo: function(param){
      console.log("부모 메소드 searchSensorOrderInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>