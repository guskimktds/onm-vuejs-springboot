<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <process-query v-bind:search="search"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import List from './va/vaList'
import Query from './va/vaQuery'

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: 'VA 설정 현황',
      pList: [
        { ip:"192.168.91.131", status:"SL", maxMem:400, reqCam:22, analysisCam:8, stopCam:2, value:6, thirdVaStatus:"active", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:0, summaryProc:0, weight:0},
        { ip:"192.168.91.132", status:"MA", maxMem:400, reqCam:1207, analysisCam:17, stopCam:1, value:16, thirdVaStatus:"active", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:2, summaryProc:1, weight:0},
        { ip:"192.168.91.133", status:"N1", maxMem:400, reqCam:0, analysisCam:0, stopCam:0, value:0, thirdVaStatus:"stanby", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:0, summaryProc:0, weight:0},



        // <td>{{item.ip}}</td>
        // <td>{{item.status}}</td>
        // <td>{{item.maxMem}}</td>
        // <td>{{item.reqCam}}</td>
        // <td>{{item.analysisCam}}</td>
        // <td>{{item.stopCam}}</td>
        // <td>{{item.value}}</td>
        // <td>{{item.thirdVaStatus}}</td>
        // <td>{{item.thirdMaxMem}}</td>
        // <td>{{item.thirdAnalysisCam}}</td>
        // <td>{{item.summaryProc}}</td>
        // <td>{{item.weight}}</td>

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