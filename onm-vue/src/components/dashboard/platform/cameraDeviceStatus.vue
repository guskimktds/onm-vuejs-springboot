<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <process-query v-bind:search="search"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import List from './camera/cameraList'
import Query from './camera/cameraQuery'

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: '카메라 상태 현황',
      pList: [
        { code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
        { code: 2, totalCnt: 56, normalCnt: 98, waitCnt: 223, procCnt:66, failCnt:54, networkFailCnt:76},
        { code: 3, totalCnt: 756, normalCnt: 235, waitCnt: 35, procCnt:13, failCnt:999, networkFailCnt:67},
        { code: 4, totalCnt: 21, normalCnt: 33, waitCnt: 59, procCnt:76, failCnt:456, networkFailCnt:45},
        { code: 5, totalCnt: 77, normalCnt: 54, waitCnt: 63, procCnt:52, failCnt:11, networkFailCnt:45},
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

</style>