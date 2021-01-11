<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <vaCamCount-query v-on:search="searchToVaCamCount"></vaCamCount-query>
        <vaCamCount-list v-bind:List="list"></vaCamCount-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import VaCamCountList from "./vaCamCountList";
import VaCamCountQuery from "./vaCamCountQuery";

import axios from "axios";

export default {
  components: {
    VaCamCountList,
    VaCamCountQuery,
  },
  data() {
    return {
      title: "VA상품 및 카메라 대수 확인",
      list: [],
      // pList: [
      //   {usrId: "0009755665", productCode: "1", vaName:"VA 서비스 영상분석 6종", vaCount:1},
      //   {usrId: "0009755664", productCode: "5", vaName:"기본 VA 서비스 영상분석 6종", vaCount:1},
      // ]
    };
  },
  created: function () {
    axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13006/get_user_va_list`,{
        
        "page_no": 1,
        "view_cnt": 5

      })
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data.data.va_prod_list;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToVaCamCount: function (params) {
      console.log(
        "부모 메소드 searchToVaCamCount 호출: " + JSON.stringify(params)
      );
      console.log(process.env);
      axios
        .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/store-vcc/query`, {
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