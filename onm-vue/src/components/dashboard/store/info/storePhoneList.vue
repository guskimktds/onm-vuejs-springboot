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
        title="사용자 전화번호 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="pnList"
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
    props: ['pnList','resPagingInfo'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
    return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
        headers: [
        {
          text: "매장ID", align: "start",
          sortable: false, value: "user_id",
        },
        { text: "사용자이름", value: "user_name" },
        { text: "전화번호", value: "tel_no" },
        { text: "권한", value: "auth" },
        { text: "전화번호ID", value: "tel_no_id" },
        { text: "알림설정권한", value: "alim_auth_yn" },
        { text: "상태코드", value: "status_code" },
        { text: "mgt상태코드", value: "ngt_status" },
        { text: "승인여부", value: "confirm_yn" },
        { text: "승일인날짜", value: "confirm_date" },
        { text: "등록일시", value: " " },
      ],
    };
  },

 methods: {

      getDataFromApi () {
        console.log(this.resPagingInfo)
        this.loading = true

        const { page, itemsPerPage } = this.options
        console.log(page, itemsPerPage)
        this.$emit("pagination", this.options)
      },

      fakeApiCall () {
        return new Promise((resolve) => {
          const {page, itemsPerPage } = this.options

          let items = this.props.pnList
          console.log(items)
          const total = items.length

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      }
      
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    mounted () {
      this.getDataFromApi()
    }

}

</script>
<style>

</style>