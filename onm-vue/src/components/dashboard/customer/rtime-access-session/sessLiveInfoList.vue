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
        @click:row="handleClick"
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
        { text: "ip", value: "ip" },
        { text: "만료일", value: "expired_date" },
        { text: "장치타입", value: "device_type" },
      ],
    };
  },
  methods: {
    handleClick: function (value) {
      console.log(value);
      this.$emit("child", value.login_key);
    },

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
};
</script>
<style>
</style>