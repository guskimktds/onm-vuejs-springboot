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
            title="푸시 발송 이력 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="pushPagingInfo.total_cnt"
                class="elevation-1"
                :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                :header-props="{ sortIcon: null }"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>
<script>
export default {
  props: ['pList','pushPagingInfo'],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      last: 0,
      loading:false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      headers: [
        {
          text: "PUSH 이력 ID",
          align: "start",
          sortable: false,
          value: "push_history_id",
        },
        { text: "사용자 아이디", value: "user_id" },
        { text: "알림 아이디", value: "alim_id" },
        { text: "알림명", value: "alim_name" },
        { text: "알림 태그 명", value: "alim_tag_name" },
        { text: "알림 발생 시작시간", value: "alim_start_time" },
        { text: "알림 발생 끝시간", value: "alim_end_time" },
        { text: "카메라 아이디", value: "cam_id" },
        { text: "매장명", value: "store_name" },
        { text: "푸시 발송 안드로이드 수", value: "android_count" },
        { text: "푸시 발송 IOS 수", value: "ios_count" }
      ],
    };
  },
   methods: {
    getDataFromApi() {
      this.$emit("pagination", this.options);
    }
   },
   updated() {
      if(this.last!==this.pushPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.pushPagingInfo.total_cnt!==undefined){
      this.last=this.pushPagingInfo.total_cnt
      }
  },
watch: {
    options: {
      handler() {
        if(this.loading == true){  // 최초에 국사코드 콤보박스를 읽어들이기전에 watch에 의해 호출되는 것을 방지 
          this.getDataFromApi();
        }else{
          this.loading = true;
        }
      },
      deep: true,
    },
  },
    
}

</script>
<style>
</style>