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
        title="매장정보 상세 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        @update:options="updateOptions"
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
  props: ['pList','resPagingInfo'],
  data() {
    return {
      dialog:false,
      dialogDelete:false,
      editedIndex:-1,
      options:{},
      totalList: 0,
      loading: true,
      headers:[
        {
          text: "매장ID", align: "start",
          sortable: false, value: "user_id"
        },
        { text: "매장명", value: "user_name" },
        { text: "상품코드", value: "prod_code" },
        { text: "상태코드", value: "status_code" },
        { text: "주문번호", value: "order_no" },
        { text: "iot target seq", value: "iot_target_seq" },
        { text: "iot member seq", value: "iot_member_seq" },
        { text: "수정일시", value: "mod_date" },
        { text: "로컬융함GW아이디", value: "local_gw_id" },
        { text: " ", value: " " },
        { text: "/", value: " " },
        { text: "희망처리일자", value: "appoint_date" },
      ]
    }
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '정상 사용자'
      }else if(values==='D'){
        return '해지'
      }else if(values==='T'){
        return '일시정지'
      }else if(values==='P'){
        return '사용자 생성 대기중'
      }
    }
  },

  watch: {
    items () {
      if (this.pageStart >= this.itemsLength) {
        this.resetPagination()
      }
    },
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  mounted() {
    this.getDataFromApi();
  },
    
}
</script>
<style>
    
</style>