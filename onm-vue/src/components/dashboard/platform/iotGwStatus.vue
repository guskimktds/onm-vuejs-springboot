<template>
  <div>
    <p class="title">{{ title }}</p>
    <process-query v-bind:search="search"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import List from './iotgw/iotgwList'
import Query from './iotgw/iotgwQuery'

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: 'Iot GW 상태 현황',
      pList: [
        { code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
        { code: 2, totalCnt: 54, normalCnt: 98, waitCnt: 223, procCnt:66, failCnt:54, networkFailCnt:76},
        { code: 3, totalCnt: 66, normalCnt: 235, waitCnt: 35, procCnt:13, failCnt:999, networkFailCnt:67},
        { code: 4, totalCnt: 55, normalCnt: 3, waitCnt: 24, procCnt:7, failCnt:2, networkFailCnt:32},
        { code: 5, totalCnt: 87, normalCnt: 54, waitCnt: 63, procCnt:52, failCnt:11, networkFailCnt:56},
      ]
    }
  },
  methods: {
    search: function(){
      console.log("부모 메소드 search 호출");
    }
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>