<template>
  <v-container id="regular-tables" fluid tag="section">
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
        :server-items-length="dcPagingInfo.total_cnt"
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
      <template v-slot:item.save_method="{item}">
              <span>{{ switchString3(item.save_method) }}</span>
      </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["dcList", "dcPagingInfo"],
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
          text: "매장 ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "카메라 ID", value: "cam_id" },
        { text: "카메라 IP", value: "cam_ip" },
        { text: "카메라명", value: "cam_name" },
        { text: "MAC ID", value: "mac_id" },
        { text: "모델명", value: "model_name" },
        { text: "펌웨어 버전 정보", value: "firmware" },
        { text: "제조사", value: "vendor" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "관리상태코드", value: "mgt_status" },
        { text: "해상도", value: "resolution" },
        { text: "카메라 수정일자", value: "mod_date" },
        { text: "개통일", value: "open_date" },
        { text: "해지일", value: "close_date" },
        { text: "영상저장방식", value: "save_method" } 
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
      if(values==='A'){
        return '접수'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='F'){
        return '실패'
      }else if(values==='P'){
        return '진행중'
      }else if(values==='S'){
        return '성공'
      }else if(values==='Z'){
        return '카메라 장애'
      }
    },
    switchString2(values){
      if(values==='A'){
        return '접수'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='F'){
        return '실패'
      }else if(values==='P'){
        return '진행중'
      }else if(values==='S'){
        return '성공'
      }else if(values==='Z'){
        return '카메라 장애'
      }
    },
    switchString3(values){
      if(values==='A'){
        return '전체'
      }else if(values==='E'){
        return '스마트저장'
      }else{
        return '-'
      }
    },
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
      if(this.last!==this.dcPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dcPagingInfo.total_cnt!==undefined){
      this.last=this.dcPagingInfo.total_cnt
      }
  },
};
</script>
<style>
</style>