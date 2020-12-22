<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <kttInfo-query v-on:search="searchKTTInfo"></kttInfo-query>
    <kttInfo-list v-bind:pList=pList></kttInfo-list>
  </div>

</template>

<script>
import KTTInfoList from './ktt/kttInfoList'
import KTTInfoQuery from './ktt/kttInfoQuery'

export default {
  components: {
    'kttInfo-list': KTTInfoList,
    'kttInfo-query': KTTInfoQuery
  },
  data () {
    return {
      title: '사용자 - KTT 정보',
      pList: [
        {usrId: "0005875323", serviceNum: "61365079", systemId:"13831700", installStatus:"N", statusCode:"S", addDate:"2019-08-26 05:06:12.162905"},
        {usrId: "0005875324", serviceNum: "61365079", systemId:"13831700", installStatus:"Y", statusCode:"S", addDate:"2019-08-26 05:06:12.162905"},
        {usrId: "0005875325", serviceNum: "61365079", systemId:"", installStatus:"N", statusCode:"S", addDate:"2019-08-26 05:06:12.162905"},
        {usrId: "0005875326", serviceNum: "61365079", systemId:"", installStatus:"N", statusCode:"S", addDate:"2019-08-26 05:06:12.162905"},
        {usrId: "0005875327", serviceNum: "61365079", systemId:"", installStatus:"N", statusCode:"S", addDate:"2019-08-26 05:06:12.162905"},
      ]
    }
  },
  methods: {
    searchKTTInfo: function(param){
      console.log("부모 메소드 searchKTTInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>