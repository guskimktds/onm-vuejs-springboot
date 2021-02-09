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
        title="KTT 청약 정보 LIST"
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
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      headers: [
        { text: '거래고유번호', value: 'guid' },
        { text: '계약 ID', value: 'said' },
        { text: '서비스번호', value: 'service_no' },
        { text: '시스템ID', value: 'system_id' },
        { text: 'KTT 계약 ID', value: 'contract_id' },
      ],
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
    
}
</script>

<style>
    
</style>