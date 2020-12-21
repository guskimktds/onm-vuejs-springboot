<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <smsHistoryInfo-query v-on:search="searchToSmsHistoryInfo"></smsHistoryInfo-query>
    <smsHistoryInfo-list v-bind:pList=pList></smsHistoryInfo-list>
  </div>

</template>

<script>
import SmsHistoryInfoList from './sms-history/smsHistoryInfoList'
import SmsHistoryInfoQuery from './sms-history/smsHistoryInfoQuery'

export default {
  components: {
    'smsHistoryInfo-list': SmsHistoryInfoList,
    'smsHistoryInfo-query': SmsHistoryInfoQuery
  },
  data () {
    return {
      title: 'SMS 발송 이력 조회',
      pList: [
        {seqID:"5813329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
        {seqID:"2813329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
        {seqID:"1013329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
        {seqID:"1812329", phoneNum:"0012484661", otpNum:341263, message:"", sendCode:"OK", sendTime:"2020-11-03 02:00:04.173138", modifiedDate: "2020-11-03 02:00:04.173138", sendServerInfo: "CVSAAS_DDNS02"},
      ]
    }
  },
  methods: {
    searchToSmsHistoryInfo: function(param){
      console.log("부모 메소드 searchToSmsHistoryInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>