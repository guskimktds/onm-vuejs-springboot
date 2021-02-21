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
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
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
      ],
    };
  },


    
}
</script>
<style>
</style>