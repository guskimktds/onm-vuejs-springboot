<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="스트리머 설정현황 LIST"
        class="px-5 py-3"
      >
      
      <v-data-table
          :headers="headers"
          :items="pList"
          item-key="id"
          class="elevation-1"
        >
      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['pList'],
  data() {
    return {
      headers: [
        { text: 'WOWZA 서버 인덱스', value: 'wowza_index' },
        { text: '프로토콜', value: 'protocol' },
        { text: '사설IP', value: 'private_ip' },
        { text: '공인IP', value: 'public_ip' },
        { text: '스트림주소', value: 'stream_lock' },
        { text: '포트', value: 'port' },
        { text: '계정', value: 'admin_id' },
        { text: '패스워드', value: 'admin_pwd' },
        { text: 'RTSP 포트', value: 'port_rtsp' },
        { text: 'RTMP 포트', value: 'port_rtmp' },
        { text: 'RTMPS 포트', value: 'port_rtmps' },
        { text: 'WOWZA URL', value: 'wowza_streamer_daemon' },
        { text: 'WOWZA 상태', value: 'wowza_status' },
        { text: 'GLS 여부', value: 'is_gls' },
        { text: 'GLS RTC 포트', value: 'gls_port_rtc' },
      ],
    }
  },

}
</script>

<style>
    
</style>