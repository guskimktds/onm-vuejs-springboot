<template>
<div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="contractId"
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
    props: ['List'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
    return {
      headers: [
        {
          text: "계약ID",
          align: "start",
          sortable: false,
          value: "contractId",
        },
        { text: "사용자ID", value: "usrId" },
        { text: "사용자명", value: "usrName" },
        { text: "사용자 전화번호", value: "usrNumber" },
        { text: "상태코드", value: "statusCode" },
        { text: "로컬융함GW아이디", value: "localGWId" },
        { text: "해상도", value: "resolution" },
        { text: "전체 카메라 대수", value: "camAllCount" },
        { text: "정상 카메라 대수", value: "camSuccessCount" },
      ],
    };
  },
}
</script>
<style>
    
</style>