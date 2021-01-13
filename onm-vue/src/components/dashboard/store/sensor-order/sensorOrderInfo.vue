<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <sensorOrderInfo-query
          v-on:search="searchSensorOrderInfo"
        ></sensorOrderInfo-query>
        <sensorOrderInfo-list v-bind:List="list"></sensorOrderInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SensorOrderInfoList from "./sensorOrderInfoList";
import SensorOrderInfoQuery from "./sensorOrderInfoQuery";

import axios from "axios";

export default {
  components: {
    SensorOrderInfoList,
    SensorOrderInfoQuery,
  },
  data() {
    return {
      title: "사용자 센서 신청 현황",
      list: [],
      // pList: [
      //   {sensorId: "1", sensorName: "문열림센서", sensorTag:"S", statusCode:"10002", sensorCnt:2},
      //   {sensorId: "2", sensorName: "유리창깨짐센서", sensorTag:"S", statusCode:"10003", sensorCnt:1},
      //   {sensorId: "3", sensorName: "움직임센서", sensorTag:"S", statusCode:"10004", sensorCnt:2},
      // ]
    };
  },
  created: function () {
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13007/get_sensor_status_list`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.sensor_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchSensorOrderInfo: function (params) {
      console.log(
        "부모 메소드 searchSensorOrderInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-detail/query`, {
          params,
        })
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.list = result.data;
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },
  },
};
</script>

<style scoped>
</style>