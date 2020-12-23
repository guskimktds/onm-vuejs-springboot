<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <userOrderResult-query v-on:search="searchToUserOrderResult"></userOrderResult-query>
    <userOrderResult-list v-bind:pList=pList></userOrderResult-list>
  </div>

</template>

<script>
import UserOrderResultList from './user-order-result/userOrderResultList'
import UserOrderResultQuery from './user-order-result/userOrderResultQuery'

export default {
  components: {
    'userOrderResult-list': UserOrderResultList,
    'userOrderResult-query': UserOrderResultQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 처리 결과',
      pList: [
        {tranId:"GPNA_20201029133825838_LVSPWS0001", contractId:"S00347106", orderType:"4201", responseCode: 200, responseMessage: "SUCCESS", registerDate:"20-10-29 13:38:04", orderStatusAlarm: "T", orderStatusAlarmDate: "", orderStatusAlarmResult:""},
        {tranId:"GPNA_20201029133825838_LVSPWS0002", contractId:"S00347106", orderType:"4201", responseCode: 200, responseMessage: "SUCCESS", registerDate:"20-10-29 13:38:04", orderStatusAlarm: "Y", orderStatusAlarmDate: "20-10-29 13:38:04", orderStatusAlarmResult:"LVSP_2020113111604839_GPNAWS0002"},
      ]
    }
  },
  methods: {
    searchToUserOrderResult: function(param){
      console.log("부모 메소드 searchToUserOrderResult 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>