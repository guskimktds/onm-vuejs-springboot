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
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
      >
      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['pList', 'resPagingInfo'],
  data() {
    return {
      headers: [
        { text: 'WOWZA 서버 인덱스', value: 'wowza_server_index' },
        { text: '프로토콜', value: 'protocol' },
        { text: '사설IP', value: 'private_ip' },
        { text: '공인IP', value: 'public_ip' },
        { text: '스트림주소', value: 'stream_address' },
        { text: '포트', value: 'port' },
        { text: '계정', value: 'account' },
        { text: '패스워드', value: 'password' },
        { text: 'RTSP 포트', value: 'rtsp_port' },
        { text: 'RTMP 포트', value: 'rtmp_port' },
        { text: 'RTMPS 포트', value: 'rtmps_port' },
        { text: 'WOWZA URL', value: 'wowza_url' },
        { text: 'WOWZA 상태', value: 'wowza_status' },
        { text: 'GLS 여부', value: 'gls_yn' },
        { text: 'GLS RTC 포트', value: 'gls_rtc_port' },
      ],
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
    }
  },

  
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  mounted() {
    this.getDataFromApi();
  },
}
</script>

<style>
    
</style>