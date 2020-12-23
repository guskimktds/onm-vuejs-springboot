<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <snapshotDevice-query v-on:search="searchToSnapshotDevice"></snapshotDevice-query>
    <snapshotDevice-list v-bind:pList=pList></snapshotDevice-list>
  </div>

</template>

<script>
import SnapshotDeviceList from './snapshot-device/snapshotDeviceList'
import SnapshotDeviceQuery from './snapshot-device/snapshotDeviceQuery'

export default {
  components: {
    'snapshotDevice-list': SnapshotDeviceList,
    'snapshotDevice-query': SnapshotDeviceQuery
  },
  data () {
    return {
      title: '단말 오더 Snapshot',
      pList: [
        {orderNumber: "ORD20011614480", usrId: "0000000008917", snapshot:"{}", registerDate: "2020-01-16 14:50:07.463746", rollbackDate: ""},
        {orderNumber: "ORD20011614481", usrId: "0000000008917", snapshot:"{}", registerDate: "2020-01-16 14:50:07.463746", rollbackDate: ""},  
      ]
    }
  },
  methods: {
    searchToSnapshotDevice: function(param){
      console.log("부모 메소드 searchToSnapshotDevice 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>