<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader" 
        title="사용자 -KTT 정보"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="kList"
        hide-default-header
        hide-default-footer
        :server-items-length="kttPagingInfo.total_cnt"
        class="elevation-0"
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th v-for="h in headers" :class="h.class" v-bind:key="h">
                <span>{{h.text}}</span>
              </th>
            </tr>
          </thead>
        </template>

      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['kList','kttPagingInfo'],
  data() {
    return {
      pageoptions: this.$store.state.pageoptions,
      // totalList: 0,
      loading: true,
      headers: [
        {
          text: "사용자 ID",
          align: "start",
          sortable: false,
          value: "user_id",
          class: 'my-header-style'
        },
        { text: "서비스번호", value: "service_no", class: 'my-header-style' },
        { text: "시스템ID", value: "system_id", class: 'my-header-style' },
        { text: "단말설치여부", value: "device_yn", class: 'my-header-style' },
        { text: "상태 코드", value: "status_code", class: 'my-header-style' },
        { text: "등록일", value: "reg_date", class: 'my-header-style' },
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
    
}
</script>
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}

</style>