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
        title="센서 정보 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="dsList"
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
  props: ["dsList",'resPagingInfo'],
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_id",
        },
        { text: "단말 GW ID", value: "terminal_gw_id" },
        { text: "센서 제품id", value: "sensor_prod_id" },
        { text: "사용자 ID", value: "user_id" },
        { text: "센서 이름", value: "sensor_name" },
        { text: "센서태그코드", value: "sensor_tag_cd" },
        { text: "시리얼 번호", value: "serial_num" },
        { text: "상태코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
        { text: "수정일시", value: "mode_date" },
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

          let items = this.props.dsList
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