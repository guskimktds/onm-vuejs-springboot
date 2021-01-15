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
    props: ['List'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
    return {
      headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "사용자명", value: "user_name" },
        { text: "상품코드", value: "prod_code" },
        { text: "상태코드", value: "status_code" },
        { text: "주문번호", value: "order_no" },
        { text: "iot target seq", value: "iot_target_seq" },
        { text: "iot member seq", value: "iot_member_seq" },
        { text: "수정일시", value: "mod_date" },
        { text: "로컬융함GW아이디", value: "local_gw_id" },
        { text: "희망처리일자", value: "appoint_date" },
      ],
    };
  },
}
</script>
<style>
    
</style>