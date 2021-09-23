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
          :items="termSubList"
          :options.sync="options"
          :server-items-length="authPagingInfo.total_cnt"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
        >        
        </v-data-table>
         <v-container>
           <v-btn>
             전송
           </v-btn>
         </v-container>
    </base-material-card>
  </v-container>
</template>

<script>

export default {
    props: ['termSubList','authPagingInfo'],
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
          { text: 'Mac_id', align: 'start', sortable: false, value: 'term_mac_addr' },
          { text: '단말타입', value: 'term_type' },
          { text: '단말변경유형코드', value: 'term_change_code' },
          { text: '모델명', value: 'model_name' },
          { text: '제품코드', value: 'product_code' },
          { text: '바코드번호', value: 'term_bacode' },
          { text: '제조사명', value: 'mfc_name' },
          { text: '단말별칭', value: 'term_alias' },
          { text: '전송', value: 'action' },
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
      if(this.last!==this.authPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.authPagingInfo.total_cnt!==undefined){
      this.last=this.authPagingInfo.total_cnt
      }
  },
    
}
</script>

<style scoped>
</style>>
