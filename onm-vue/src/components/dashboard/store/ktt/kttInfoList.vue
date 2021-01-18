<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="usrId"
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
          text: "사용자 ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "서비스번호", value: "service_no" },
        { text: "시스템ID", value: "system_id" },
        { text: "단말설치여부", value: "device_yn" },
        { text: "상태 코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
      ],
    };
  },
};
</script>
<style>
</style>