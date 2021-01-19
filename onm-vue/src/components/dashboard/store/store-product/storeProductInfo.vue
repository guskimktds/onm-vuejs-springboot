<template>
    <v-container fluid>
      <v-card>
        <storeProductInfo-query
          v-on:search="searchToStoreProductInfo"
        ></storeProductInfo-query>
        <storeProductInfo-list v-bind:List="list"></storeProductInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import StoreProductInfoList from "./storeProductInfoList";
import StoreProductInfoQuery from "./storeProductInfoQuery";

import axios from "axios";

export default {
  components: {
    StoreProductInfoList,
    StoreProductInfoQuery,
  },
  data() {
    return {
      title: "매장 상품 정보 조회",
      list: [],
      // pList: [
      //   {productCode: "B162", usrId: "0009755665", savePeriod:10, ipCamCnt:3, posCamCnt: 0, allCamCnt:3, subIdCnt:5, resolution:"FHD", iotGWCnt:1, modifiedDate:"2020-11-12 11:46:06.365159"},
      // ]
    };
  },
  created: function () {
   axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`,{
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.user_detail_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToStoreProductInfo: function (params) {
      console.log(
        "부모 메소드 searchToStoreProductInfo 호출: " + JSON.stringify(params)
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