<template>
    <v-container>
      <v-card>
        <cameraInfo-query v-on:search="searchToCameraInfo"></cameraInfo-query>
        <cameraInfo-list v-bind:List="list"></cameraInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import CameraInfoList from "./cameraInfoList";
import CameraInfoQuery from "./cameraInfoQuery";

import axios from "axios";

export default {
  components: {
    CameraInfoList,
    CameraInfoQuery,
  },
  data() {
    return {
      title: "카메라 정보 조회",
      list: [],
      // pList: [
      //   {camId:"BD0124846601001", camIp:"125.140.63.28", camName: "카메라1", macId:'D4B83F03ED74', modelName :'VSaaS-SNC-0201DSL', firmwareVer :"3.0.6 TRD2010", manufacturer:"에이치디 프로", serviceCode:"Z", manageCode: "S", resolution: 'FHD', modifiedDate: "2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", closeDate: ""},
      //   {camId:"BD0124846601002", camIp:"125.140.63.28", camName: "카메라1", macId:'D4B83F03ED74', modelName :'VSaaS-SNC-0201DSL', firmwareVer :"3.0.6 TRD2010", manufacturer:"에이치디 프로", serviceCode:"Z", manageCode: "S", resolution: 'FHD', modifiedDate: "2020-11-12 11:46:06.365159", openDate: "2020-11-12 11:46:06.365159", closeDate: ""},
      // ]
    };
  },
  created: function () {
   axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13008/get_cam_list`,{
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.cam_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToCameraInfo: function (params) {
      console.log(
        "부모 메소드 searchToCameraInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/sstore-device-camera/query`,
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