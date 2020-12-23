<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <kttOrderInfo-query v-on:search="searchToKTTOrderInfo"></kttOrderInfo-query>
    <kttOrderInfo-list v-bind:pList=pList></kttOrderInfo-list>
  </div>

</template>

<script>
import KTTOrderInfoList from './ktt-order/kttOrderInfoList'
import KTTOrderInfoQuery from './ktt-order/kttOrderInfoQuery'

export default {
  components: {
    'kttOrderInfo-list': KTTOrderInfoList,
    'kttOrderInfo-query': KTTOrderInfoQuery
  },
  data () {
    return {
      title: 'KTT 청약 정보',
      pList: [
        {tranId:"GPNA_20201029133825838_LVSPWS0001", serviceNum: "61365079", systemId: "13831700", contractId:"M", kttContractId: "51132203"},
        {tranId:"GPNA_20201029133825838_LVSPWS0002", serviceNum: "61365079", systemId: "13831700", contractId:"M", kttContractId: "51132203"},
        {tranId:"GPNA_20201029133825838_LVSPWS0003", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
        {tranId:"GPNA_20201029133825838_LVSPWS0004", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
        {tranId:"GPNA_20201029133825838_LVSPWS0005", serviceNum: "61365079", systemId: "", contractId:"M", kttContractId: "51132203"},
      ]
    }
  },
  methods: {
    searchToKTTOrderInfo: function(param){
      console.log("부모 메소드 searchToKTTOrderInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>