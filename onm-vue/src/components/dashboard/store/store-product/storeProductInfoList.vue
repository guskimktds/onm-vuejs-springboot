<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="productCode"
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
  props: ["List"],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      headers: [
        {
          text: "상품번호",
          align: "start",
          sortable: false,
          value: "prod_code",
        },
        { text: "사용자ID", value: "user_id" },
        { text: "사용자별 변경 저장기간", value: "storage_chg_day" },
        { text: "IP 카메라대수", value: "ip_cam_cnt" },
        { text: "POS 카메라대수", value: "pos_cam_cnt" },
        { text: "전체 카메라대수", value: "cam_cnt" },
        { text: "서브ID 개수", value: "subid_cnt" },
        { text: "해상도", value: "resolution" },
        { text: "IoTGW 대수", value: "iotgw_cnt" },
        { text: "수정일시", value: "mod_date" },
      ],
    };
  },
};
</script>
<style>
</style>