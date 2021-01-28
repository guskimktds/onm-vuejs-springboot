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
        title="매장상품정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="List"
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
  props: ['List','resPagingInfo'],
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
          text: "상품번호",
          align: "start",
          sortable: false,
          value: "prod_code",
        },
        { text: "사용자ID", value: "user_id" },
        { text: "사용자별 변경 저장기간", value: "storage_chg_day" },
        { text: "IP 카메라대수", value: "ip_cam_cnt" },
        { text: "POS 카메라대수", value: "pos_cam_cnt" },
        { text: "전체 카메라대수", value: "cam_cnt" },
        { text: "서브ID 개수", value: "subid_cnt" },
        { text: "해상도", value: "resolution" },
        { text: "IoTGW 대수", value: "iotgw_cnt" },
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

          let items = this.props.List
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