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
         title="IoT GW 정보 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="iotList"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
      </template>
      <template v-slot:item.mgt_status="{item}">
              <span>{{ switchString2(item.mgt_status) }}</span>
      </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ['iotList'],
  data() {
    return {
     headers: [
        {
          text: "매장ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "GWID(청약)", value: "gw_id" },
        { text: "GWID(시스템)", value: "terminal_gw_id" },
        { text: "단말GW명", value: "gw_name" },
        { text: "단말모델코드", value: "gw_model_code" },
        { text: "MAC ID", value: "mac_id" },
        { text: "IoT장치SEQ", value: "iot_device_seq" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "등록일", value: "reg_date" },
        { text: "개통일", value: "open_date" },
        { text: "관리자상태코드", value: "mgt_status" },
        { text: "해지일", value: "close_date" },
      ],
    };
  },
  methods: {
    switchString(values){
      if(values==='S'){
        return '성공'
      }else if(values==='F'){
        return '실패'
      }else if(values==='D'){
        return '삭제'
      }
    },
    switchString2(values){
      if(values==='S'){
        return '성공'
      }else if(values==='F'){
        return '실패'
      }else if(values==='D'){
        return '삭제'
      }
    }
  },
    
}
</script>
<style>
</style>