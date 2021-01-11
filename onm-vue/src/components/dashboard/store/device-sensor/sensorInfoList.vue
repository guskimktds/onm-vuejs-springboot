<template>
<div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="sensorId"
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensorId",
        },
        { text: "단말 GW ID", value: "gwId" },
        { text: "센서 제품id", value: "sensorDeviceId" },
        { text: "사용자 ID", value: "usrId" },
        { text: "센서 이름", value: "sensorName" },
        { text: "센서태그코드", value: "sensorTagCode" },
        { text: "시리얼 번호", value: "serialNum" },
        { text: "상태코드", value: "statusCode" },
        { text: "등록일시", value: "addDate" },
        { text: "수정일시", value: "modifiedDate" },
      ],
    };
  },
}
</script>
<style>
    
</style>