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
        title="단말 오더 상세내역 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="dodList"
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
    props: ['dodList','resPagingInfo'],
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
          text: "거래고유번호", align: "start",
          sortable: false, value: "guid",
        },
        { text: "단말변경 유형코드", value: "termchangecd" },
        { text: "mac_id", value: "mac_id" },
        { text: "단말타입", value: "termtype" },
        { text: "제조사명", value: "mfcname" },
        { text: "제품코드", value: "productcode" },
        { text: "모델명", value: "modelname" }
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