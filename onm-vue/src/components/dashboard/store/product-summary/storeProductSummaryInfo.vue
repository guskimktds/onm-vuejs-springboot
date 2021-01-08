
<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <storeProductSummaryInfo-query
          v-on:search="searchToStoreProductSummaryInfo"
        ></storeProductSummaryInfo-query>
        <storeProductSummaryInfo-list
          v-bind:List="list"
        ></storeProductSummaryInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import StoreProductSummaryInfoList from "./storeProductSummaryInfoList";
import StoreProductSummaryInfoQuery from "./storeProductSummaryInfoQuery";

import axios from "axios";

export default {
  components: {
    StoreProductSummaryInfoList,
    StoreProductSummaryInfoQuery,
  },
  data() {
    return {
      title: "상품 요약 정보",
      list: [],
      // pList: [
      //   {usrId: "0009755665", productCode: "B162", productName:"On-Call 출동서비스", productType:"ADD", productCnt: 1, addDate:"2020-11-12 11:46:06.365159", modifiedDate:""},
      // ]
    };
  },
  created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-product-summary`)
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToStoreProductSummaryInfo: function (params) {
      console.log(
        "부모 메소드 searchToStoreProductSummaryInfo 호출: " +
          JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/store-product-summary/query`,
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