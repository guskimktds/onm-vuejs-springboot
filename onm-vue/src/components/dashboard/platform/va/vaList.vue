<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="pList"
        item-key="id"
        class="elevation-1"
      >
      </v-data-table>
    </v-app>
  </div>
</template>


<script>
export default {
    props: ['pList'],
    data() {
      return {
        headers: [
          { text: 'VA IP', value: 'ip' },
          { text: 'VA 상태', value: 'status' },
          { text: '최대용량', value: 'maxMem' },
          { text: '요청 카메라', value: 'reqCam' },
          { text: '중지 카메라', value: 'analysisCam' },
          { text: '', value: 'value' },
          { text: '3rd VA 상태', value: 'thirdVaStatus' },
          { text: '3rd 용량', value: 'thirdMaxMem' },
          { text: '3rd 요청 카메라', value: 'thirdReqCam' },
          { text: '3rd 분석 카메라', value: 'thirdAnalysisCam' },
          { text: '요약영상 처리', value: 'summaryProc' },
          { text: '가중치', value: 'weight' },
        ]
      }
    }
}
</script>

<style>
    
</style>