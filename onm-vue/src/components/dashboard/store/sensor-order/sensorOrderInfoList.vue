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