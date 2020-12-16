<style src="../../../../css/body.css"></style>

<template>
  <div>
    <p>{{ title }}</p>
    <process-query v-on:search="searchToProcess"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import List from './camRegStatList'
import Query from './camRegStatQuery'

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: '개통/해지 추이',
      pList: [
        {date:'2020-12-05', storeReg:12, storeUnreg:4, camReg:4456, camUnreg:123, iotReg:25, iotUnreg:13},
        {date:'2020-12-04', storeReg:55, storeUnreg:3, camReg:453, camUnreg:8, iotReg:55, iotUnreg:64},
        {date:'2020-12-03', storeReg:2, storeUnreg:6, camReg:55, camUnreg:12, iotReg:75, iotUnreg:45},
        {date:'2020-12-02', storeReg:64, storeUnreg:55, camReg:22, camUnreg:8, iotReg:13, iotUnreg:35},
        {date:'2020-12-01', storeReg:24, storeUnreg:56, camReg:234, camUnreg:24, iotReg:74, iotUnreg:12},
        {date:'2020-11-31', storeReg:68, storeUnreg:1, camReg:677, camUnreg:72, iotReg:43, iotUnreg:12},
      ]
    }
  },
  methods: {
    searchToProcess: function(param){
      console.log("부모 메소드 searchToProcess 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>