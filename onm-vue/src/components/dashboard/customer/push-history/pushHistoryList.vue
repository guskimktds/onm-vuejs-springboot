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
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>
<script>
export default {
  props: ["pList"],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      headers: [
        {
          text: "PUSH 이력 ID",
          align: "start",
          sortable: false,
          value: "pushHistoryId",
        },
        { text: "사용자 아이디", value: "usrId" },
        { text: "알림 아이디", value: "alarmId" },
        { text: "알림명", value: "alarmInfo" },
        { text: "알림 태그 명", value: "alarmTagName" },
        { text: "알림 발생 시작시간", value: "alarmStartTime" },
        { text: "알림 발생 끝시간", value: "alarmEndTime" },
        { text: "카메라 아이디", value: "camId" },
        { text: "매장명", value: "storeName" },
      ],
    };
  },
};
</script>
<style>
</style>