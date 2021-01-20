<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="KTT 정보 LIST"
        class="px-5 py-3"
      >
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
    </base-material-card>
  </v-container>
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