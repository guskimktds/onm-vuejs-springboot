<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader"  
        title="사용자 VA 상품 및 적용카메라 대수 등록 확인"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="vaList"
        hide-default-header
        :options.sync="options"
        :server-items-length="vaPagingInfo.total_cnt"
        class="elevation-0"
        :footer-props="{ itemsPerPageOptions: pageoptions }"
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
  props: ['vaList','vaPagingInfo'],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
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
        { text: "상품번호", value: "va_prod_id", class: 'my-header-style' },
        { text: "VA 명", value: "va_name", class: 'my-header-style' },
        { text: "VA 개수", value: "va_count", class: 'my-header-style' },
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
      if(this.last!==this.vaPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.vaPagingInfo.total_cnt!==undefined){
      this.last=this.vaPagingInfo.total_cnt
      }
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

