<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <userOrderDetail-query v-on:search="searchToUserOrderDetail"></userOrderDetail-query>
    <userOrderDetail-list v-bind:pList=pList></userOrderDetail-list>
  </div>

</template>

<script>
import UserOrderDetailList from './user/order-detail/userOrderDetailList'
import UserOrderDetailQuery from './user/order-detail/userOrderDetailQuery'

export default {
  components: {
    'userOrderDetail-list': UserOrderDetailList,
    'userOrderDetail-query': UserOrderDetailQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 상세',
      pList: [
        {tranId:"GPNA_20201029133825838_LVSPWS0001", orderNumber:"20303DO9519190", orderSeq:1, usageType:"T", hopeDate:"2020110315", orderType:"4201", storeName:'홍길동', productCode: "B162", paramTypeCode:"VASTGRM", paramTypeName:"저장기간", paramValue: 10},
        {tranId:"GPNA_20201029133825838_LVSPWS0002", orderNumber:"20303DO9519190", orderSeq:1, usageType:"T", hopeDate:"2020110315", orderType:"4201", storeName:'홍길동', productCode: "B162", paramTypeCode:"VASTGRM", paramTypeName:"저장기간", paramValue: 10},
        {tranId:"GPNA_20201029133825838_LVSPWS0003", orderNumber:"20303DO9519190", orderSeq:1, usageType:"T", hopeDate:"2020110315", orderType:"4201", storeName:'홍길동', productCode: "B162", paramTypeCode:"VASTGRM", paramTypeName:"저장기간", paramValue: 10},
        {tranId:"GPNA_20201029133825838_LVSPWS0004", orderNumber:"20303DO9519190", orderSeq:1, usageType:"T", hopeDate:"2020110315", orderType:"4201", storeName:'홍길동', productCode: "B162", paramTypeCode:"VASTGRM", paramTypeName:"저장기간", paramValue: 10},
        {tranId:"GPNA_20201029133825838_LVSPWS0005", orderNumber:"20303DO9519190", orderSeq:1, usageType:"T", hopeDate:"2020110315", orderType:"4201", storeName:'홍길동', productCode: "B162", paramTypeCode:"VASTGRM", paramTypeName:"저장기간", paramValue: 10},
      ]
    }
  },
  methods: {
    searchToUserOrderDetail: function(param){
      console.log("부모 메소드 searchToUserOrderDetail 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>