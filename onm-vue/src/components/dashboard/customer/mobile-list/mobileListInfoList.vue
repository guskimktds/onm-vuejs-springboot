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
            title="모바일 단말 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="mobilePagingInfo.total_cnt"
                :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
  props: ['pList','mobilePagingInfo'],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      loading:false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      headers: [
        {
          text: "로그인키",
          align: "start",
          sortable: false,
          value: "login_key",
        },
        { text: "전화번호ID", value: "tel_no_id" },
        { text: "사용자 ID", value: "user_id" },
        { text: "계약자구분", value: "auth" },
        { text: "알림수신여부", value: "alim_yn" },
        { text: "클라이언트 IP", value: "client_ip_addr" },
        { text: "OS 타입", value: "os_type" },
        { text: "OS 버전", value: "os_version" },
        { text: "앱버전", value: "app_version" },
        { text: "장치타입", value: "device_type" },
        { text: "장치모델명", value: "device_model" },
        { text: "로그인 일시", value: "login_date" },
      ],    
    };
  },

  methods: {
    getDataFromApi() {
      this.$emit("pagination", this.options);
    },
    
  },

  watch: {
    options: {
      handler() {
        if(this.loading == true){  // 최초에 국사코드 콤보박스를 읽어들이기전에 watch에 의해 호출되는 것을 방지 
          this.getDataFromApi();
        }else{
          this.loading = true;
        }
      },
      deep: true,
    },
  },
    
}
</script>
<style>
</style>