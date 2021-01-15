<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <storeInfo-query v-on:search="searchToStoreInfo"></storeInfo-query>
        <storeInfo-list v-bind:List="list"></storeInfo-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import StoreInfoList from "./storeInfoList";
import StoreInfoQuery from "./storeInfoQuery";
import axios from "axios";

export default {
  components: {
    StoreInfoList,
    StoreInfoQuery,
  },
  data() {
    return {
      title: "매장 정보 조회",
      list: [],
      // pList: [
      //   {
      //     contractId: "S0034710650",
      //     usrId: "001248660",
      //     usrName: "정난순",
      //     usrNumber: "01011101110",
      //     statusCode: "S",
      //     localGWId: "B",
      //     resolution: "FHD",
      //     camAllCount: 2,
      //     camSuccessCount: 2,
      //   },
      //],
    };
  },
  created: function () {
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13001/get_user_list`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToStoreInfo: function (params) {
      console.log(
        "부모 메소드 searchToStoreInfo 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-info/query`, {
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