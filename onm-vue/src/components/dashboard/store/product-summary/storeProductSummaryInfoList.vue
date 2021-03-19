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
        title="상품 요약정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="psList"
        :options.sync="options"
        :server-items-length="psPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
      >
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
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "상품코드", value: "prodcd" },
        { text: "상품이름", value: "prodnm" },
        { text: "상품유형", value: "prodtype" },
        { text: "상품개수", value: "prodcnt" },
        { text: "등록일시", value: "reg_date" },
        { text: "수정일시", value: "mod_date" },
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
      if(this.last!==this.psPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.psPagingInfo.total_cnt!==undefined){
      this.last=this.psPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
</style>