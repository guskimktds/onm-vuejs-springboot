<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader"  
        title="상품 요약정보"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="psList"
        hide-default-header
        hide-default-footer
        :server-items-length="psPagingInfo.total_cnt"
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
  props: ['psList','psPagingInfo'],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      pageoptions: this.$store.state.pageoptions,
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id", class: 'my-header-style'
        },
        { text: "상품코드", value: "prodcd", class: 'my-header-style' },
        { text: "상품이름", value: "prodnm", class: 'my-header-style' },
        { text: "상품유형", value: "prodtype", class: 'my-header-style' },
        { text: "상품개수", value: "prodcnt", class: 'my-header-style' },
        { text: "등록일", value: "reg_date", class: 'my-header-style' },
        { text: "수정일", value: "mod_date", class: 'my-header-style' },
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