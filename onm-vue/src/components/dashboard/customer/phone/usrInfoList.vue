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
        title="사용자 전화번호 LIST"
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

        { text: '사용자 ID', value: 'user_id' },
        { text: '사용자 이름', value: 'user_name' },
        { text: '전화번호', value: 'tel_no' },
        { text: '전화번호 타입', value: 'auth' },
        { text: 'Sub ID(전화번호 ID)', value: 'tel_no_id' },
        { text: '알림설정권한(Y/N)', value: 'alim_auth_yn' },
        { text: '승인여부', value: 'confirm_yn' },
        { text: '승인날짜', value: 'confirm_date' },
        { text: '상태코드', value: 'status_code' },
        { text: 'Mgt 상태코드', value: 'mgt_status' },
        { text: '비고', value: 'memo' },

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
    mounted() {
    this.getDataFromApi();
  },
    
}
</script>

<style>
    
</style>