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
            title="사용자상품정보"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-1"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
                :header-props="{ sortIcon: null }"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '상품번호',
            sortable: false, value: 'prod_info_id',
          },
          { text: '매장 ID', value: 'user_id'},
          { text: '영상변경저장기간', value: 'storage_chg_day'},
          { text: '전체캠수', value: 'cam_cnt'},
          { text: 'pos캠수', value: 'pos_cam_cnt'},
          { text: '멀티뷰대수', value: 'open_cam_cnt'},
          { text: '멀티뷰(기본)', value: 'open_cam_add_cnt'},
          { text: '멀티뷰(부가)', value: 'ip_cam_cnt'},
          { text: 'IP캠대수', value: 'subid_cnt'},
          { text: '서브ID', value: 'resolution'},
          { text: '등록일시', value: 'reg_date'},
          { text: '수정일시', value: 'mod_date'},
          { text: '저장기간(기본)', value: 'storage_base_day'},
          { text: '저장기간(추가)', value: 'storage_add_day'},
          { text: 'IoT GW 대수', value: 'iotgw_cnt'},
          { text: '영상저장방식', value: 'save_method'},
        ]
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
      if(this.last!==this.dodPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dodPagingInfo.total_cnt!==undefined){
      this.last=this.dodPagingInfo.total_cnt
      }
  },
    mounted () {
      this.getDataFromApi()
    }

}
</script>
<style>
    
</style>