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
        title="KTT 정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="kList"
        :options.sync="options"
        :server-items-length="kttPagingInfo.total_cnt"
        class="elevation-1"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['kList','kttPagingInfo'],
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
          text: "사용자 ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "서비스번호", value: "service_no" },
        { text: "시스템ID", value: "system_id" },
        { text: "단말설치여부", value: "device_yn" },
        { text: "상태 코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
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

  mounted() {
    this.getDataFromApi();
  },
    
}
</script>
<style>
</style>