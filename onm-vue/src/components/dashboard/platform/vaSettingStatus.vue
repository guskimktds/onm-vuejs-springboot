<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <va-query v-on:search="searchToProcess"></va-query>
        <va-list v-bind:pList=pList></va-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import List from './va/vaList'
import Query from './va/vaQuery'

export default {
  components: {
    vaList : List,
    vaQuery : Query
  },
  data () {
    return {
      title: 'VA 설정 현황',
      pList: [
        { ip:"192.168.91.131", status:"SL", maxMem:400, reqCam:22, analysisCam:8, stopCam:2, value:6, thirdVaStatus:"active", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:0, summaryProc:0, weight:0},
        { ip:"192.168.91.132", status:"MA", maxMem:400, reqCam:1207, analysisCam:17, stopCam:1, value:16, thirdVaStatus:"active", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:2, summaryProc:1, weight:0},
        { ip:"192.168.91.133", status:"N1", maxMem:400, reqCam:0, analysisCam:0, stopCam:0, value:0, thirdVaStatus:"stanby", thirdMaxMem:320, thirdReqCam:320, thirdAnalysisCam:0, summaryProc:0, weight:0},
      ]
    }
  },
  methods: {
    search: function(){
      console.log("부모 메소드 search 호출");
    },

  }
}
</script>