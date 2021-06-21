<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="실시간 접속 세션 정보 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "로그인 키",
          align: "start",
          sortable: false,
          value: "login_key",
        },
        { text: "사용자 ID", value: "user_id" },
        { text: "전화번호", value: "tel_no" },
        // { text: '전화번호 타입', value: 'numberType' },
        { text: "IP", value: "ip" },
        { text: "만료일", value: "expired_date" },
        { text: "장치타입", value: "device_type" },
      ],
    };
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
  updated() {
      if(this.last>this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
};
</script>
<style>
</style>