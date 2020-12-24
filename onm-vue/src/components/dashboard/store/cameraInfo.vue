<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <cameraInfo-query v-on:search="searchToCameraInfo"></cameraInfo-query>
    <cameraInfo-list v-bind:pList=pList></cameraInfo-list>
  </div>

</template>

<script>
import CameraInfoList from './device-camera/cameraInfoList'
import CameraInfoQuery from './device-camera/cameraInfoQuery'

export default {
  components: {
    'cameraInfo-list': CameraInfoList,
    'cameraInfo-query': CameraInfoQuery
  },
  data () {
    return {
      title: '카메라 정보 조회',
      pList: [
        {camId:"BD0124846601001", camIp:"125.140.63.28", camName: "카메라1", macId:'D4B83F03ED74', modelName :'VSaaS-SNC-0201DSL', firmwareVer :"3.0.6 TRD2010", manufacturer:"에이치디 프로", serviceCode:"Z", manageCode: "S", resolution: 'FHD', modifiedDate: "2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", closeDate: ""},
        {camId:"BD0124846601002", camIp:"125.140.63.28", camName: "카메라1", macId:'D4B83F03ED74', modelName :'VSaaS-SNC-0201DSL', firmwareVer :"3.0.6 TRD2010", manufacturer:"에이치디 프로", serviceCode:"Z", manageCode: "S", resolution: 'FHD', modifiedDate: "2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", closeDate: ""},
      ]
    }
  },
  methods: {
    searchToCameraInfo: function(param){
      console.log("부모 메소드 searchToCameraInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>