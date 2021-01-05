<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="pList"
        :items-per-page="5"
        item-key="id"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
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
          { text: 'WOWZA 서버 인덱스', value: 'vo1' },
          { text: '프로토콜', value: 'vo2' },
          { text: '사설IP', value: 'vo3' },
          { text: '공인IP', value: 'vo4' },
          { text: '스트림주소', value: 'vo5' },
          { text: '포트', value: 'vo6' },
          { text: '계정', value: 'vo7' },
          { text: '패스워드', value: 'vo8' },
          { text: 'RTSP 포트', value: 'vo9' },
          { text: 'RTMP 포트', value: 'vo10' },
          { text: 'RTMPS 포트', value: 'vo11' },
          { text: 'WOWZA URL', value: 'vo12' },
          { text: 'WOWZA 상태', value: 'vo13' },
          { text: 'GLS 여부', value: 'vo14' },
          { text: 'GLS RTC 포트', value: 'vo15' },
        ]
      }
    }
}
</script>

<style>
    
</style>