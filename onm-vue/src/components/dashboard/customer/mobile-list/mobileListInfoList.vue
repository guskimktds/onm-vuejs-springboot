<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="seqID"
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
          text: "로그인키",
          align: "start",
          sortable: false,
          value: "loginKey",
        },
        { text: "전화번호ID", value: "phoneNumId" },
        { text: "사용자 ID", value: "usrID" },
        { text: "계약자구분", value: "contractType" },
        { text: "알림수신여부", value: "alarmAuth" },
        { text: "클라이언트 IP", value: "clientIp" },
        { text: "OS 타입", value: "osType" },
        { text: "OS 버전", value: "osVersion" },
        { text: "앱버전", value: "appVersion" },
        { text: "장치타입", value: "deviceType" },
        { text: "장치모델명", value: "deviceModelInfo" },
        { text: "로그인 일시", value: "loginDate" },
      ],
    };
  },
};
</script>
<style>
</style>