// 구현 제외
<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <snapshotUser-query v-on:search="searchToSnapshotUser"></snapshotUser-query>
    <snapshotUser-list v-bind:pList=pList></snapshotUser-list>
  </div>

</template>

<script>
import SnapshotUserList from './snapshot-user/snapshotUserList'
import SnapshotUserQuery from './snapshot-user/snapshotUserQuery'

export default {
  components: {
    'snapshotUser-list': SnapshotUserList,
    'snapshotUser-query': SnapshotUserQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 Snapshot',
      pList: [
        {contractId:"S20011516460", orderNumber: "ORD20011614480", usrId: "0000000008917", snapshot:"{}", registerDate: "2020-01-16 14:50:07.463746", rollbackDate: ""},
        {contractId:"S20011516461", orderNumber: "ORD20011614480", usrId: "0000000008917", snapshot:"{}", registerDate: "2020-01-16 14:50:07.463746", rollbackDate: ""},  
      ]
    }
  },
  methods: {
    searchToSnapshotUser: function(param){
      console.log("부모 메소드 searchToSnapshotUser 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>