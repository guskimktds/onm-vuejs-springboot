<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="gwKey"
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
          text: "단말 GW ID",
          align: "start",
          sortable: false,
          value: "gwKey",
        },
        { text: "단말GWID", value: "gwId" },
        { text: "단말GW명", value: "gwName" },
        { text: "단말모델코드", value: "modelCode" },
        { text: "mac_id", value: "mac_id" },
        { text: "IOT장치seq", value: "iotDeviceSeq" },
        { text: "서비스 상태코드", value: "serviceCode" },
        { text: "등록일시", value: "addDate" },
        { text: "개통일시", value: "openDate" },
        { text: "관리자상태코드", value: "manageCode" },
        { text: "해지일시", value: "closeDate" },
      ],
    };
  },
};
</script>
<style>
</style>