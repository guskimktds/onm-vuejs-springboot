<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="gwKey"
        class="elevation-1"
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
          value: "gw_id",
        },
        { text: "단말GWID", value: "gw_id" },
        { text: "단말GW명", value: "gw_name" },
        { text: "단말모델코드", value: "gw_model_code" },
        { text: "mac_id", value: "mac_id" },
        { text: "IOT장치seq", value: "iot_device_seq" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
        { text: "개통일시", value: "open_date" },
        { text: "관리자상태코드", value: "mgt_stauts" },
        { text: "해지일시", value: "close_date" },
      ],
    };
  },
};
</script>
<style>
</style>