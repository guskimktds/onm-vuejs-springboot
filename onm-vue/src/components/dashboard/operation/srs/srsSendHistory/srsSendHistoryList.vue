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
      title="영상송출 이력 조회 LIST"
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
    props: ['pList', 'resPagingInfo'],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          { text: '영상송출 이력 일련번호', value: 'srs_send_hist_seq' },
          { text: '영상송출 일련번호', value: 'srs_seq' },
          { text: '캠 상태 이력 일련번호', value: 'cam_stat_hist_seq' },
          { text: '카메라 ID', value: 'cam_id' },
          { text: '처리 구분', value: 'proc_type' },
          { text: '요청구분', value: 'request_from' },
          { text: '재전송일시', value: 'send_date' }
        ],
      }
    },

methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    }
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
      if(this.last>this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
    
</style>