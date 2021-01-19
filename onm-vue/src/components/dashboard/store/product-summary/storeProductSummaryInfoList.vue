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
        title="상품 요약정보 LIST"
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
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "상품코드", value: "prodcd" },
        { text: "상품이름", value: "prodnm" },
        { text: "상품유형", value: "prodtype" },
        { text: "상품개수", value: "prodcnt" },
        { text: "등록일시", value: "reg_date" },
        { text: "수정일시", value: "mod_date" },
      ],
    };
  },
};
</script>
<style>
</style>