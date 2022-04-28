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
      title="영상송출 PROCESS LIST"
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
          {text: '카메라 ID', value: 'cam_id'},
          { text: '송출제목', value: 'srs_title' },
          { text: '송출지명', value: 'target_name' },
          { text: '관리상태', value: 'status_code' },
          { text: '시작일시', value: 'start_date' },
          { text: '종료일시', value: 'end_date' }
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
      if(this.last!==this.resPagingInfo.total_cnt){
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