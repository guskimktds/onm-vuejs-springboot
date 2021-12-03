<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader"  
        title="사용자(매장상세)정보(12월)"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="pList"
        hide-default-header
        hide-default-footer
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-0"
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
      loading: true,
      headers:[
        {
          text: "계약ID", align: "start",
          sortable: false, value: "said", class: 'my-header-style'
        },
        { text: "매장ID", value: "user_id" , class: 'my-header-style'},
        { text: "매장명", value: "user_name" , class: 'my-header-style'},
        { text: "로컬 GW 아이디", value: "local_gw_id" , class: 'my-header-style'},
        { text: "전화번호", value: "tel_no" , class: 'my-header-style'},
        { text: "상태코드", value: "status_code" , class: 'my-header-style'},
        { text: "상품코드", value: "prod_code" , class: 'my-header-style'},
        { text: "해상도", value: "resolution" , class: 'my-header-style'},
        { text: "서브ID개수", value: "subid_cnt" , class: 'my-header-style'},
        { text: "영상저장기간", value: "storage_chg_day" , class: 'my-header-style'},
        { text: "IoT TARGET SEQ", value: "iot_target_seq" , class: 'my-header-style'},
        { text: "IoT MEMBER SEQ", value: "iot_member_seq" , class: 'my-header-style'},
        { text: "주문번호", value: "order_no" , class: 'my-header-style'},
        { text: "희망처리일시", value: "appoint_date" , class: 'my-header-style'},
        { text: "등록일", value: "reg_date" , class: 'my-header-style'},
        { text: "수정일", value: "mod_date" , class: 'my-header-style'},
        { text: "IP 카메라 대수", value: "ip_cam_cnt" , class: 'my-header-style'},
        { text: "POS 카메라 대수", value: "pos_cam_cnt" , class: 'my-header-style'},
        { text: "IoT GW 대수", value: "iotgw_cnt" , class: 'my-header-style'},
        { text: "영상저장방식", value: "save_method" , class: 'my-header-style'}
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