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
    props: ['List'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
    return {
      headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "usrId",
        },
        { text: "사용자명", value: "usrName" },
        { text: "상품코드", value: "productCode" },
        { text: "상태코드", value: "statusCode" },
        { text: "주문번호", value: "orderNumber" },
        { text: "iot target seq", value: "iotTargetSeq" },
        { text: "iot member seq", value: "iotMemberSeq" },
        { text: "수정일시", value: "modifiedDate" },
        { text: "로컬융함GW아이디", value: "localGWId" },
        { text: "-", value: "tbd_01" },
        { text: "-", value: "tbd_02" },
        { text: "희망처리일자", value: "approveHopeDate" },
      ],
    };
  },
}
</script>
<style>
    
</style>