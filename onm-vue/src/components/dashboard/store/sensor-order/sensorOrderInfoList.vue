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
        title="센서 신청 현황 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="soList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["soList",'resPagingInfo'],
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_prod_id",
        },
        { text: "사용자 id", value: "user_id" },
        { text: "센서제품명", value: "sensor_prod_name" },
        { text: "센서태그코드", value: "sensor_tag_cd" },
        { text: "상태 코드", value: "status_code" },
        { text: "센서 개수", value: "sensor_count" },
      ],
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