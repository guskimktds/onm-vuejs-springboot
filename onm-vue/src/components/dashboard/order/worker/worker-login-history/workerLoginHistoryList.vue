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
        title="현장작업자 로그인 이력 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
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
        { text: '관리자ID', value: 'admin_id' },
        { text: '매장ID', value: 'user_id' },
        { text: '전화번호', value: 'tel_no' },
        { text: '관리자 구분', value: 'admin_type' },
        { text: '로그인 키', value: 'login_key' },
        { text: '로그인 날짜', value: 'login_date' },
        { text: '로그아웃 날짜', value: 'logout_date' },

      ],
      last: 0,
      options: {},
      totalList: 0,
      loading: true,

    }
  },

    methods: {
      getDataFromApi () {
        this.loading = true
        this.$emit("pagination", this.options)
      },
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
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
    mounted () {
      this.getDataFromApi()
    }
}
</script>

<style>
    
</style>