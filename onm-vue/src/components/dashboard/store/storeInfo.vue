<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <storeInfo-query v-on:search="searchToStoreInfo"></storeInfo-query>
    <storeInfo-list v-bind:pList=pList></storeInfo-list>
  </div>

</template>

<script>
import StoreInfoList from './info/storeInfoList'
import StoreInfoQuery from './info/storeInfoQuery'

export default {
  components: {
    'storeInfo-list': StoreInfoList,
    'storeInfo-query': StoreInfoQuery
  },
  data () {
    return {
      title: '매장 정보 조회',
      pList: [
        {contractId:"S0034710650", usrId:"001248660", usrName: "정난순", usrNumber: "01011101110", statusCode:'S', localGWId:"B", resolution:"FHD", camAllCount:2, camSuccessCount: 2},
      //Legacy octal literals are not allowed in strict mode 로 문자열처리
      ]
    }
  },
  methods: {
    searchToStoreInfo: function(param){
      console.log("부모 메소드 searchToStoreInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>