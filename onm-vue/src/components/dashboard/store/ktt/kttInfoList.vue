<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="usrId"
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
          text: "사용자 ID",
          align: "start",
          sortable: false,
          value: "usrId",
        },
        { text: "서비스번호", value: "serviceNum" },
        { text: "시스템ID", value: "systemId" },
        { text: "단말설치여부", value: "installStatus" },
        { text: "상태 코드", value: "statusCode" },
        { text: "등록일시", value: "addDate" },
      ],
    };
  },
};
</script>
<style>
</style>