<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <loginHistoryInfo-query v-on:search="searchToSessLiveInfo"></loginHistoryInfo-query>
    <loginHistoryInfo-list v-bind:pList=pList></loginHistoryInfo-list>
  </div>

</template>

<script>
import LoginHistoryInfoList from './loginHistoryInfo/loginHistoryInfoList'
import LoginHistoryInfoQuery from './loginHistoryInfo/loginHistoryInfoQuery'

export default {
  components: {
    'loginHistoryInfo-list': LoginHistoryInfoList,
    'loginHistoryInfo-query': LoginHistoryInfoQuery
  },
  data () {
    return {
      title: '로그인 이력 조회',
      pList: [
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},

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