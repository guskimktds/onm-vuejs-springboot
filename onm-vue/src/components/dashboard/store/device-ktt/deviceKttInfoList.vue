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
        title="KTT 단말 목록 "
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="dkList"
        :options.sync="options"
        :server-items-length="dkttPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      <template v-slot:item.status_code="{item}">
            <span>{{ switchString(item.status_code) }}</span>
      </template>

      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['dkList','dkttPagingInfo'],
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
          text: "카메라ID",
          align: "start",
          sortable: false,
          value: "cam_id",
        },
        { text: "매장ID", value: "user_id" },
        { text: "서비스번호", value: "service_no" },
        { text: "상태 코드", value: "status_code" },
        { text: "등록일", value: "reg_date" },
      ],
    };
  },
   methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
        if(values=='D'){
            return '삭제'
        }else if(values=='S'){
            return '정상'
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
      if(this.last!==this.dkttPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dkttPagingInfo.total_cnt!==undefined){
      this.last=this.dkttPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
</style>