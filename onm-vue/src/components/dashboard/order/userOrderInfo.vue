<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <userOrderInfo-query v-on:search="searchToUserOrderInfo"></userOrderInfo-query>
    <userOrderInfo-list v-bind:pList=pList></userOrderInfo-list>
  </div>

</template>

<script>
import UserOrderInfoList from './user/order-info/userOrderInfoList'
import UserOrderInfoQuery from './user/order-info/userOrderInfoQuery'

export default {
  components: {
    'userOrderInfo-list': UserOrderInfoList,
    'userOrderInfo-query': UserOrderInfoQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 정보',
      pList: [
        {tranId:"GPNA_20201029133825838_LVSPWS0001", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        {tranId:"GPNA_20201029133825838_LVSPWS0002", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        {tranId:"GPNA_20201029133825838_LVSPWS0003", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        {tranId:"GPNA_20201029133825838_LVSPWS0004", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "5560", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
      ]
    }
  },
  methods: {
    searchToUserOrderInfo: function(param){
      console.log("부모 메소드 searchToUserOrderInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>