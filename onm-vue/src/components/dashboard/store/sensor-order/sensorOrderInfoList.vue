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
        title="센서 신청 현황 LIST"
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_prod_id",
        },
        { text: "사용자 id", value: "user_id" },
        { text: "센서제품명", value: "sensor_prod_name" },
        { text: "센서태그코드", value: "sensor_tag_cd" },
        { text: "상태 코드", value: "status_code" },
        { text: "센서 개수", value: "sensor_count" },
      ],
    };
  },
};
</script>
<style>
</style>