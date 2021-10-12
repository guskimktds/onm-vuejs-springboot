<template>
    <v-container fluid>
      <v-card>
        <query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></query>

        <list 
          v-bind:bssList=bssList
          v-bind:bssPagingInfo="bssPagingInfo"
          @pagination="searchToProcess"
        ></list>
      </v-card>
    </v-container>
</template>

<script>
import List from './bssResultList.vue'
import Query from './bssResultQuery.vue'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  
  components: {
    List, Query
  },
  
  data () {
    return {
      bssList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      bssPagingInfo: {},
      searchParam: {
        guid: "",
        is_masking: false
      }
    }
  },

  methods: {
    searchToProcess: function(params){
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15020/get_bsss_result`;
      var reqParams = this.handleParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
       if (resCode == 200) {
        this.bssList=response.data.list;
        this.bssPagingInfo=response.data.resPagingInfo;
        }else if(resCode==204){
           this.bssList = [];
           this.bssPagingInfo = {};
          alert("KTT 청약정보 데이터가 없습니다.");
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.bssList = [];
          this.bssPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      })
      .finally(function () {
        // always executed
      });

    },

    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.kttPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if (params.guid !== undefined && params.guid !== "") {
        newParams.guid = params.guid;
      } else if (
        this.searchParam.guid !== undefined &&
        this.searchParam.guid !== ""
      ) {
        newParams.guid = this.searchParam.guid;
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>