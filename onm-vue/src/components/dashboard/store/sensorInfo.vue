<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <sensorInfo-query v-on:search="searchToSensorInfo"></sensorInfo-query>
    <sensorInfo-list v-bind:pList=pList></sensorInfo-list>
  </div>

</template>

<script>
import SensorInfoList from './device-sensor/sensorInfoList'
import SensorInfoQuery from './device-sensor/sensorInfoQuery'

export default {
  components: {
    'sensorInfo-list': SensorInfoList,
    'sensorInfo-query': SensorInfoQuery
  },
  data () {
    return {
      title: '센서 정보 조회',
      pList: [
        {sensorId:"800097556653001", gwId:"800097556653001", sensorDeviceId: "2", usrId:'00097556665', sensorName :'문열림1', sensorTagCode :"10002", serialNum:"00189A27F640", statusCode:"S", addDate: "2020-11-12 11:46:06.365159", modifiedDate: "2020-11-12 11:46:06.365159"},
        {sensorId:"800097556653002", gwId:"800097556653001", sensorDeviceId: "2", usrId:'00097556665', sensorName :'문열림1', sensorTagCode :"10002", serialNum:"00189A27F640", statusCode:"S", addDate: "2020-11-12 11:46:06.365159", modifiedDate: "2020-11-12 11:46:06.365159"},
        {sensorId:"800097556653003", gwId:"800097556653001", sensorDeviceId: "2", usrId:'00097556665', sensorName :'문열림1', sensorTagCode :"10002", serialNum:"00189A27F640", statusCode:"S", addDate: "2020-11-12 11:46:06.365159", modifiedDate: "2020-11-12 11:46:06.365159"},
      ]
    }
  },
  methods: {
    searchToSensorInfo: function(param){
      console.log("부모 메소드 searchToSensorInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>