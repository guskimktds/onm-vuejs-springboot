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
        :header-props="{ sortIcon: null }"
      >
      <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
      </template>
      <template v-slot:item.save_method="{item}">
              <span>{{ switchString2(item.save_method) }}</span>
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
      dialog:false,
      dialogDelete:false,
      editedIndex:-1,
      options:{},
      loading: true,
      headers:[
        {
          text: "계약ID", align: "start",
          sortable: false, value: "said"
        },
        { text: "매장ID", value: "user_id" },
        { text: "매장명", value: "user_name" },
        { text: "국사코드", value: "local_gw_id" },
        { text: "전화번호", value: "tel_no" },
        { text: "상태코드", value: "status_code" },
        { text: "상품코드", value: "prod_code" },
        { text: "해상도", value: "resolution" },
        { text: "서브ID개수", value: "subid_cnt" },
        { text: "영상저장기간", value: "storage_chg_day" },
        { text: "IoT TARGET SEQ", value: "iot_target_seq" },
        { text: "IoT MEMBER SEQ", value: "iot_member_seq" },
        { text: "주문번호", value: "order_no" },
        { text: "희망처리일시", value: "appoint_date"},
        { text: "등록일", value: "reg_date" },
        { text: "수정일", value: "mod_date" },
        { text: "IP 카메라 대수", value: "ip_cam_cnt"},
        { text: "POS 카메라 대수", value: "pos_cam_cnt"},
        { text: "IoT GW 대수", value: "iotgw_cnt"},
        { text: "영상저장방식", value: "save_method"}
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
    },
    switchString2(values){
      if(values==='A'){
        return '상시'
      }else if(values==='E'){
        return '스마트'
      }else{
        return '-'
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
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
    
</style>