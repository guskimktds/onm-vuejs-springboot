<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"
            title="사용자상품정보"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
              
                class="elevation-0"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
    
            >   
              <template v-slot:header="{ props: { headers } }">
                <thead>
                  <tr>
                    <th v-for="h in headers" :class="h.class" v-bind:key="h">
                      <span>{{h.text}}</span>
                    </th>
                  </tr>
                </thead>
              </template>  

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
            sortable: false, value: 'prod_info_id', class: 'my-header-style'
          },
          { text: '매장 ID', value: 'user_id', class: 'my-header-style'},
          { text: '영상변경저장기간', value: 'storage_chg_day', class: 'my-header-style'},
          { text: '전체캠수', value: 'cam_cnt', class: 'my-header-style'},
          { text: 'pos캠수', value: 'pos_cam_cnt', class: 'my-header-style'},
          { text: '멀티뷰대수', value: 'open_cam_cnt', class: 'my-header-style'},
          { text: '멀티뷰(기본)', value: 'open_cam_add_cnt', class: 'my-header-style'},
          { text: '멀티뷰(부가)', value: 'ip_cam_cnt', class: 'my-header-style'},
          { text: 'IP캠대수', value: 'subid_cnt', class: 'my-header-style'},
          { text: '서브ID', value: 'resolution', class: 'my-header-style'},
          { text: '등록일시', value: 'reg_date', class: 'my-header-style'},
          { text: '수정일시', value: 'mod_date', class: 'my-header-style'},
          { text: '저장기간(기본)', value: 'storage_base_day', class: 'my-header-style'},
          { text: '저장기간(추가)', value: 'storage_add_day', class: 'my-header-style'},
          { text: 'IoT GW 대수', value: 'iotgw_cnt', class: 'my-header-style'},
          { text: '영상저장방식', value: 'save_method', class: 'my-header-style'},
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
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
    
</style>