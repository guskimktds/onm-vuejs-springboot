<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <usrInfo-query v-on:search="searchToUsrInfo"></usrInfo-query>
    <usrInfo-list v-bind:pList=pList></usrInfo-list>
  </div>

</template>

<script>
import UsrInfoList from './usrInfo/usrInfoList'
import UserInfoQuery from './usrInfo/usrInfoQuery'

export default {
  components: {
    'usrInfo-list': UsrInfoList,
    'usrInfo-query': UserInfoQuery
  },
  data () {
    return {
      title: '사용자 전화번호',
      pList: [
        {usrId:"0012484660", phoneNumber:"01011101110", numberType: "M", usrName: "홍길동", subId:800124846607000, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""},
        {usrId:"0012484661", phoneNumber:"01011101112", numberType: "S", usrName: "홍길순", subId:800124846607001, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""}
      //Legacy octal literals are not allowed in strict mode 로 문자열처리
      ]
    }
  },
  methods: {
    searchToUsrInfo: function(param){
      console.log("부모 메소드 searchToUsrInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>