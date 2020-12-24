<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <storeProductSummaryInfo-query v-on:search="searchToStoreProductSummaryInfo"></storeProductSummaryInfo-query>
    <storeProductSummaryInfo-list v-bind:pList=pList></storeProductSummaryInfo-list>
  </div>

</template>

<script>
import StoreProductSummaryInfoList from './product-summary/storeProductSummaryInfoList'
import StoreProductSummaryInfoQuery from './product-summary/storeProductSummaryInfoQuery'

export default {
  components: {
    'storeProductSummaryInfo-list': StoreProductSummaryInfoList,
    'storeProductSummaryInfo-query': StoreProductSummaryInfoQuery
  },
  data () {
    return {
      title: '상품 요약 정보',
      pList: [
        {usrId: "0009755665", productCode: "B162", productName:"On-Call 출동서비스", productType:"ADD", productCnt: 1, addDate:"2020-11-12 11:46:06.365159", modifiedDate:""},
      ]
    }
  },
  methods: {
    searchToStoreProductSummaryInfo: function(param){
      console.log("부모 메소드 searchToStoreProductSummaryInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>