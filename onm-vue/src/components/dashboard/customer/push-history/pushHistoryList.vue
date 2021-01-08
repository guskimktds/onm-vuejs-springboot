<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="pushHistoryId"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
      >
        <!-- <template v-slot:expanded-item="{ headers }" :style="`background-color: red`">
          <td :colspan="headers.length">
            <List></List>
          </td>
        </template>       -->
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
export default {
  props: ["List"],
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