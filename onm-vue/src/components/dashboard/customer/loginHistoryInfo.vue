<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <loginHistoryInfo-query v-on:search="searchToLoginHistoryInfo"></loginHistoryInfo-query>
    <loginHistoryInfo-list v-bind:pList=pList></loginHistoryInfo-list>
  </div>

</template>

<script>
import LoginHistoryInfoList from './signin-history/loginHistoryInfoList'
import LoginHistoryInfoQuery from './signin-history/loginHistoryInfoQuery'

export default {
  components: {
    'loginHistoryInfo-list': LoginHistoryInfoList,
    'loginHistoryInfo-query': LoginHistoryInfoQuery
  },
  data () {
    return {
      title: '로그인 이력 조회',
      pList: [
        {loginKey:"3e206166-0886-4485-8432-1af9fb55e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1af9f45e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-1ab545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-f9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},
        {loginKey:"3e206166-0886-4485-8432-af9fb545e28", loginId:"0012484661", loginType:2, expireDate:"2020-11-03 02:00:04.173138", loginDate:"2020-11-03 02:00:04.173138", logoutDate:"2020-11-03 02:00:04.173138", osType: "PC"},

      ]
    }
  },
  methods: {
    searchToLoginHistoryInfo: function(param){
      console.log("부모 메소드 searchToLoginHistoryInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>