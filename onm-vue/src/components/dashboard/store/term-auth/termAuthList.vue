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
      title="단말 인증 정보 LIST"
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
    props: ['pList','resPagingInfo',],
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
            text: '인증요청일련번호',
            align: 'start',
            sortable: false,
            value: 'term_auth_seq',
          },
          { text: '단말타입', value: 'term_type'},
          { text: 'mac_id', value: 'mac_id'},
          { text: '인증결과코드', value: 'auth_resultcode' },
          { text: '인증결과메세지', value: 'auth_resultmsg' },
          { text: '인증일시', value: 'auth_date' },
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
