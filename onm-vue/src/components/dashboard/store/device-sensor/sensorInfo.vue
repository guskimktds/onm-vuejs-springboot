<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <sensorInfo-query v-on:search="searchToSensorInfo"></sensorInfo-query>
        <sensorInfo-list v-bind:List="list"></sensorInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SensorInfoList from "./sensorInfoList";
import SensorInfoQuery from "./sensorInfoQuery";

import axios from "axios";

export default {
  components: {
    SensorInfoList,
    SensorInfoQuery,
  },
  data() {
    return {
      title: "센서 정보 조회",
      list: [],
      // pList: [
      //   {
      //     sensorId: "800097556653001",
      //     gwId: "800097556653001",
      //     sensorDeviceId: "2",
      //     usrId: "00097556665",
      //     sensorName: "문열림1",
      //     sensorTagCode: "10002",
      //     serialNum: "00189A27F640",
      //     statusCode: "S",
      //     addDate: "2020-11-12 11:46:06.365159",
      //     modifiedDate: "2020-11-12 11:46:06.365159",
      //   },
      //   {
      //     sensorId: "800097556653002",
      //     gwId: "800097556653001",
      //     sensorDeviceId: "2",
      //     usrId: "00097556665",
      //     sensorName: "문열림1",
      //     sensorTagCode: "10002",
      //     serialNum: "00189A27F640",
      //     statusCode: "S",
      //     addDate: "2020-11-12 11:46:06.365159",
      //     modifiedDate: "2020-11-12 11:46:06.365159",
      //   },
      //   {
      //     sensorId: "800097556653003",
      //     gwId: "800097556653001",
      //     sensorDeviceId: "2",
      //     usrId: "00097556665",
      //     sensorName: "문열림1",
      //     sensorTagCode: "10002",
      //     serialNum: "00189A27F640",
      //     statusCode: "S",
      //     addDate: "2020-11-12 11:46:06.365159",
      //     modifiedDate: "2020-11-12 11:46:06.365159",
      //   },
      // ],
    };
  },
   created: function () {
   axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13010/get_sensor_list`,{
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.seonsor_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToSensorInfo: function (params) {
      console.log(
        "부모 메소드 searchToSensorInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/sstore-device-sensor/query`,
          {
            params,
          }
        )
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