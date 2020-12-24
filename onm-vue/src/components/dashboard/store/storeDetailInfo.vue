<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <storeDetailInfo-query v-on:search="searchToStoreDetailInfo"></storeDetailInfo-query>
    <storeDetailInfo-list v-bind:pList=pList></storeDetailInfo-list>
  </div>

</template>

<script>
import StoreDetailInfoList from './store-detail/storeDetailInfoList'
import StoreDetailInfoQuery from './store-detail/storeDetailInfoQuery'

export default {
  components: {
    'storeDetailInfo-list': StoreDetailInfoList,
    'storeDetailInfo-query': StoreDetailInfoQuery
  },
  data () {
    return {
      title: '매장 상세 정보 조회',
      pList: [
        {usrId:"001248660", usrName:"정난순", productCode: "B162", statusCode:'S', orderNumber:'20303DO9519190', iotTargetSeq:"9200002600", iotMemberSeq:"2595", modifiedDate:"2020-11-12 11:46:06.365159", localGWId: "B", tbd_01: '', tbd_02: "4201", approveHopeDate: "2020110314"},
      ]
    }
  },
  methods: {
    searchToStoreDetailInfo: function(param){
      console.log("부모 메소드 searchToStoreDetailInfo 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>