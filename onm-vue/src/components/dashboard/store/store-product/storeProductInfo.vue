<template>
    <v-container fluid>
      <v-card>
        <storeProductInfo-query
          v-on:search="searchToStoreProductInfo"
          v-bind:param=searchParam
        ></storeProductInfo-query>
        <storeProductInfo-list 
        v-bind:List="List"
        v-bind:resPagingInfo=resPagingInfo

        @pagination="setToSearchParams"
        ></storeProductInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import StoreProductInfoList from "./storeProductInfoList";
import StoreProductInfoQuery from "./storeProductInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    StoreProductInfoList,
    StoreProductInfoQuery,
  },

  data() {
    return {
      title: "매장 상품 정보 조회",
      List: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      searchParam:{
        mod_date:'',
        prod_code:'',
        user_id:''
      }
    }
  },

  created: function () {

  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`
  
  var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.List = response.data.data.user_detail_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.List = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },

 methods: {
  searchToStoreProductInfo: function (params) {
    
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`

   var reqParams=this.handleParams(params)
    console.log("상품코드1")
      console.log(params.prod_code)
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.List = response.data.data.user_detail_list;
          this.resPagingInfo = response.data.data.paging_info
          console.log("상품코드")
          console.log(this.List)
        }else{
          this.List = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToStoreProductInfo(params)
    },

    handleParams:function(params){
    let newParams = {}
      if(params.page_no === undefined || params.page_no === ''){
        newParams.page_no = this.reqPagingInfo.page_no
      }else{
        newParams.page_no = params.page_no
      }
      if(params.view_cnt === undefined || params.view_cnt === ''){
        newParams.view_cnt = this.reqPagingInfo.view_cnt
      }else{
        newParams.view_cnt = params.view_cnt
      }

      if(params.mod_date !== undefined && params.mod_date !== ''){
        newParams.mod_date = params.mod_date
      }
      if(params.prod_code !== undefined && params.prod_code !== ''){
        newParams.prod_code = params.prod_code
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>