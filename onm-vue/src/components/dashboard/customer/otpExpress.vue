<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <otpExpress-query v-on:search="searchToOtpExpress"></otpExpress-query>
    <otpExpress-list v-bind:pList=pList></otpExpress-list>
  </div>

</template>

<script>
import OtpExpressList from './otp-express/otpExpressList'
import OtpExpressQuery from './otp-express/otpExpressQuery'

export default {
  components: {
    'otpExpress-list': OtpExpressList,
    'otpExpress-query': OtpExpressQuery
  },
  data () {
    return {
      title: 'OTP Express 관리 - 작업해야함',
      pList: [
        {usrId:"0012484660", phoneNumber:"01011101110", numberType: "M", usrName: "홍길동", subId:800124846607000, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""},
        {usrId:"0012484661", phoneNumber:"01011101112", numberType: "S", usrName: "홍길순", subId:800124846607001, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""}
      //Legacy octal literals are not allowed in strict mode 로 문자열처리
      ]
    }
  },
  methods: {
    searchToOtpExpress: function(param){
      console.log("부모 메소드 searchToOtpExpress 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>