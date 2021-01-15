<template>
<div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="contractId"
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
          text: "계약ID",
          align: "start",
          sortable: false,
          value: "said",
        },
        { text: "사용자ID", value: "user_id" },
        { text: "사용자명", value: "user_name" },
        { text: "사용자 전화번호", value: "tel_no" },
        { text: "상태코드", value: "status_code" },
        { text: "로컬융함GW아이디", value: "local_gw_id" },
        { text: "해상도", value: "resolution" },
        { text: "전체 카메라 대수", value: "total_cnt" },
        { text: "정상 카메라 대수", value: "normal_cnt" },
      ],
    };
  },
}
</script>
<style>
    
</style>