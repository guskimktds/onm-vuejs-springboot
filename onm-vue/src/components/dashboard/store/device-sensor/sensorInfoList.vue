<template>
<div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="sensorId"
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_id",
        },
        { text: "단말 GW ID", value: "terminal_gw_id" },
        { text: "센서 제품id", value: "sensor_prod_id" },
        { text: "사용자 ID", value: "user_id" },
        { text: "센서 이름", value: "sensor_name" },
        { text: "센서태그코드", value: "sensor_tag_cd" },
        { text: "시리얼 번호", value: "serial_num" },
        { text: "상태코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
        { text: "수정일시", value: "mode_date" },
      ],
    };
  },
}
</script>
<style>
    
</style>