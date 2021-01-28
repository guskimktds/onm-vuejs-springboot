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
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['psList','resPagingInfo'],
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

          let items = this.props.psList
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