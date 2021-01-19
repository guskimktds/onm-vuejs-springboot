<template>
    <v-container fluid>
      <v-card>
        <storeDetailInfo-query
          v-on:search="searchToStoreDetailInfo"
        ></storeDetailInfo-query>
        <storeDetailInfo-list v-bind:List="list"></storeDetailInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import StoreDetailInfoList from "./storeDetailInfoList";
import StoreDetailInfoQuery from "./storeDetailInfoQuery";

import axios from "axios";

export default {
  components: {
    StoreDetailInfoList,
    StoreDetailInfoQuery,
  },
  data() {
    return {
      title: "매장정보 상세 조회",
      list: [],
      // pList: [
      //   {usrId:"001248660", usrName:"정난순", productCode: "B162", statusCode:'S', orderNumber:'20303DO9519190', iotTargetSeq:"9200002600", iotMemberSeq:"2595", modifiedDate:"2020-11-12 11:46:06.365159", localGWId: "B", tbd_01: '', tbd_02: "4201", approveHopeDate: "2020110314"},
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
    searchToStoreDetailInfo: function (params) {
      console.log(
        "부모 메소드 searchToStoreDetailInfo 호출: " + JSON.stringify(params)
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