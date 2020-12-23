<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <authTargetDevice-query v-on:search="searchToAuthTargetDevice"></authTargetDevice-query>
    <authTargetDevice-list v-bind:pList=pList></authTargetDevice-list>
  </div>

</template>

<script>
import AuthTargetDeviceList from './auth-target-device/authTargetDeviceList'
import AuthTargetDeviceQuery from './auth-target-device/authTargetDeviceQuery'

export default {
  components: {
    'authTargetDevice-list': AuthTargetDeviceList,
    'authTargetDevice-query': AuthTargetDeviceQuery
  },
  data () {
    return {
      title: '인증 대상 단말 정보',
      pList: [
          {deviceId:"200000142363", orderNumber:"20303DO9519190", mac_id: "D4B83F03ED74", manageStatusCode:"S", deviceCode: "K9197981", modelName:"VSaaS-SNC-0201DSL", responseCode: 200, openOrderNum: "20303DO95919D", authDate: "2020-10-29 13:38:04.718235", deleteDate: "", registDate:"2020-10-29 13:38:04.718235"},
          {deviceId:"200000142364", orderNumber:"20303DO9519190", mac_id: "D4B83F03ED74", manageStatusCode:"S", deviceCode: "K9197981", modelName:"VSaaS-SNC-0201DSL", responseCode: 200, openOrderNum: "20303DO95919D", authDate: "2020-10-29 13:38:04.718235", deleteDate: "", registDate:"2020-10-29 13:38:04.718235"},
        ]
    }
  },
  methods: {
    searchToAuthTargetDevice: function(param){
      console.log("부모 메소드 searchToAuthTargetDevice 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>