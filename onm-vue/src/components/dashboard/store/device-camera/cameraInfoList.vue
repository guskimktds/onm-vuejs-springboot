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
        title="카메라 정보 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="dcList"
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
  props: ["dcList",'resPagingInfo'],
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
          text: "카메라 ID",
          align: "start",
          sortable: false,
          value: "cam_id",
        },
        { text: "카메라 IP", value: "cam_ip" },
        { text: "카메라명", value: "cam_name" },
        { text: "mac_id", value: "macId" },
        { text: "모델명", value: "model_name" },
        { text: "펌웨어 버전 정보", value: "firmware" },
        { text: "제조사", value: "vendor" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "관리상태코드", value: "mgt_status" },
        { text: "해상도", value: "resolution" },
        { text: "카메라 수정일자", value: "mod_date" },
        { text: "개통일시", value: "opendate" },
        { text: "해지일시", value: "close_date" },
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

          let items = this.props.dcList
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