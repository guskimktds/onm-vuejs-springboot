<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="productCode"
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
          text: "상품번호",
          align: "start",
          sortable: false,
          value: "productCode",
        },
        { text: "사용자ID", value: "usrId" },
        { text: "사용자별 변경 저장기간", value: "savePeriod" },
        { text: "IP 카메라대수", value: "ipCamCnt" },
        { text: "POS 카메라대수", value: "posCamCnt" },
        { text: "전체 카메라대수", value: "allCamCnt" },
        { text: "서브ID 개수", value: "subIdCnt" },
        { text: "해상도", value: "resolution" },
        { text: "IoTGW 대수", value: "iotGWCnt" },
        { text: "수정일시", value: "modifiedDate" },
      ],
    };
  },
};
</script>
<style>
</style>