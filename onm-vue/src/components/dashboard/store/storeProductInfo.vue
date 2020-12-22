<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <storeProductInfo-query v-on:search="searchToStoreProductInfo"></storeProductInfo-query>
    <storeProductInfo-list v-bind:pList=pList></storeProductInfo-list>
  </div>

</template>

<script>
import StoreProductInfoList from './store-product/storeProductInfoList'
import StoreProductInfoQuery from './store-product/storeProductInfoQuery'

export default {
  components: {
    'storeProductInfo-list': StoreProductInfoList,
    'storeProductInfo-query': StoreProductInfoQuery
  },
  data () {
    return {
      title: '매장 상품 정보 조회',
      pList: [
        {productCode: "B162", usrId: "0009755665", savePeriod:10, ipCamCnt:3, posCamCnt: 0, allCamCnt:3, subIdCnt:5, resolution:"FHD", iotGWCnt:1, modifiedDate:"2020-11-12 11:46:06.365159"},
      ]
    }
  },
  methods: {
    searchToStoreProductInfo: function(param){
      console.log("부모 메소드 searchToStoreProductInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>