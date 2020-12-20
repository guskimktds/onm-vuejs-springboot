<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <mobileListInfo-query v-on:search="searchToMobileListInfo"></mobileListInfo-query>
    <mobileListInfo-list v-bind:pList=pList></mobileListInfo-list>
  </div>

</template>

<script>
import MobileListInfoList from './mobile-list/mobileListInfoList'
import MobileListInfoQuery from './mobile-list/mobileListInfoQuery'

export default {
  components: {
    'mobileListInfo-list': MobileListInfoList,
    'mobileListInfo-query': MobileListInfoQuery
  },
  data () {
    return {
      title: '모바일 단말 목록',
      pList: [
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
        {loginKey:"3e20616-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
        {loginKey:"3e2066-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
        {loginKey:"36166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},
        {loginKey:"e206166-0886-4485-8432-1af9fb545e28", phoneNumId:"100088412484661", usrID:"01011101112", contractType: "M", alarmAuth: "Y", clientIp:"232.62.190.213", osType: "Android", osVersion: "10", appVersion: "1.3.4", deviceType: "Android", deviceModelInfo: "SM-A405S", loginDate: "2020-11-03 02:00:04.173138"},  
      ]
    }
  },
  methods: {
    searchToMobileListInfo: function(param){
      console.log("부모 메소드 searchToMobileListInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>