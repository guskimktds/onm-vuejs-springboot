<template>
  <v-container id="regular-tables" fluid tag="section">
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
        :options.sync="options"
        :server-items-length="iotPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
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
  props: ["iotList", "iotPagingInfo"],
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
          text: "GWID(시스템)",
          align: "start",
          sortable: false,
          value: "terminal_gw_id",
        },
        { text: "GWID(청약)", value: "gw_id" },
        { text: "단말GW명", value: "gw_name" },
        { text: "단말모델코드", value: "gw_model_code" },
        { text: "mac_id", value: "mac_id" },
        { text: "IOT장치seq", value: "iot_device_seq" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
        { text: "개통일시", value: "open_date" },
        { text: "관리자상태코드", value: "mgt_status" },
        { text: "해지일시", value: "close_date" },
      ],
    };
  },
  methods: {
    handleClick: function (value) {
      this.$emit("child", value);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
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

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.iotPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.iotPagingInfo.total_cnt!==undefined){
      this.last=this.iotPagingInfo.total_cnt
      }
  },
};
</script>
<style>
</style>