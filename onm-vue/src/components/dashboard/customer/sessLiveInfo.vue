<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <sessLiveInfoQuery-query v-on:search="searchToSessLiveInfo"></sessLiveInfoQuery-query>
    <sessLiveInfoQuery-list v-bind:pList=pList></sessLiveInfoQuery-list>
  </div>

</template>

<script>
import SessLiveInfoList from './rtime-access-session/sessLiveInfoList'
import SessLiveInfoQuery from './rtime-access-session/sessLiveInfoQuery'

export default {
  components: {
    'sessLiveInfoQuery-list': SessLiveInfoList,
    'sessLiveInfoQuery-query': SessLiveInfoQuery
  },
  data () {
    return {
      title: '실시간 접속 세션 조회',
      pList: [
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", usrId:"0012484661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
        {loginKey:"23412fasvas", usrId:"0012484662", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
        {loginKey:"ceae23casdcae", usrId:"01244661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
        {loginKey:"asdfece52555567c-afsadf", usrId:"001284661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
        {loginKey:"asdfdccd45-fh", usrId:"00124661", phoneNumber:"01011101112", numberType: "M", ip: "119.69.170.223", expireDate:"2020-11-03 02:00:04.173138", deviceType: "iPhone"},
      ]
    }
  },
  methods: {
    searchToSessLiveInfo: function(param){
      console.log("부모 메소드 searchToSessLiveInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>