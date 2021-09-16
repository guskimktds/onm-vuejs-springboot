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
      title="단말 오더 nms 전송 LIST"
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
    props: ['pList','resPagingInfo'],
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
          { text: 'Mac_id', align: 'start', sortable: false, value: 'Term_mac_addr' },
          { text: '단말타입', value: 'Termtype' },
          { text: '단말변경유형코드', value: 'Term_change_code' },
          { text: '모델명', value: 'Model_name' },
          { text: '제품코드', value: 'product_code' },
          { text: '바코드번호', value: 'term_barcode' },
          { text: '제조사명', value: 'Mfc_name' },
          { text: '단말별칭', value: 'Term_alias' },
        ]
      }
    },
    methods:{
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
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>

<style scoped>
</style>>
