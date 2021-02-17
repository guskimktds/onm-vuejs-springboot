<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="로그인 History"
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
        { text: "로그인 ID", value: "login_id" },
        { text: "로그인 타입", value: "login_type" },
        { text: "만료일시", value: "expire_date" },
        { text: "로그인일시", value: "login_date" },
        { text: "로그아웃일시", value: "logout_date" },
        { text: "OS타입", value: "os_type" },
      ],
    };
  },
  methods: {
    handleClick: function (value) {
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