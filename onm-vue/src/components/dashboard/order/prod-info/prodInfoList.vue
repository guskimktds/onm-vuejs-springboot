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
        title="청약 상품 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="prodList"
        :options.sync="options"
        :server-items-length="soPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[10,20,50,100]}"
        :header-props="{ sortIcon: null }"
      >
      <template v-slot:item.prod_from="{item}">
              <span>{{ switchString(item.prod_from) }}</span>
      </template> 
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["prodList",'soPagingInfo'],
  data() {
    return {
      last: 0,
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
          value: "prod_info_id",
        },
        { text: "상품명", value: "prod_info_name" },
        { text: "저장일수", value: "storage_chg_day" },
        { text: "서브ID개수", value: "subid_cnt" },
        { text: "카메라수", value: "va_cnt" },
        { text: "해상도", value: "resolution" },
        { text: "저장방법", value: "save_method" },
        { text: "그룹명", value: "group_nm" },
        { text: "상태코드", value: "status_code" },
        { text: "순서", value: "orderby_no" },
        { text: "va상품 사용유무", value: "va_use_yn" },
        { text: "va사용가능개수", value: "va_use_count" },
        { text: "상품출시회사", value: "prod_from" },
        { text: "등록일", value: "reg_date" },
        { text: "수정일", value: "mod_date" },
      ],
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='T'){
        return 'KTT'
      }else{
        return ''
      }
    }
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.soPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.soPagingInfo.total_cnt!==undefined){
      this.last=this.soPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
</style>