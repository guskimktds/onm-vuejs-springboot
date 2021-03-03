
<template>
    <v-container fluid>
      <v-card>
        <storeProductSummaryInfo-query
          v-on:search="searchToStoreProductSummaryInfo"
          v-bind:param=searchParam
        ></storeProductSummaryInfo-query>
        <storeProductSummaryInfo-list
          v-bind:psList="psList"
          v-bind:psPagingInfo=psPagingInfo

          @pagination="setToSearchParams"
        ></storeProductSummaryInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import StoreProductSummaryInfoList from "./storeProductSummaryInfoList";
import StoreProductSummaryInfoQuery from "./storeProductSummaryInfoQuery";
import dateInfo from "../../../utils/common"

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    StoreProductSummaryInfoList,
    StoreProductSummaryInfoQuery,
  },
  data() {
    return {
      title: "상품 요약 정보",
      psList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      psPagingInfo:{},
      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        product_name:'',
        user_id:'',
        prodcd:'',
      }
    }
  },


 methods: {
  searchToStoreProductSummaryInfo: function (params) {
    
  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13005/get_prod_summary_list`

  var reqParams=this.handleParams(params)

  console.log(params.prodnm)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.psList = response.data.data.prod_summary_list;
          this.psPagingInfo = response.data.data.paging_info
   
        }else{
          this.psList = [];
          this.psPagingInfo = {};
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

      this.searchToStoreProductSummaryInfo(params)
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

      if(params.start_date !== undefined && params.start_date !== ''){
        newParams.start_date = params.start_date.replace(/-/g,"")
      }else if(
        this.searchParam.start_date!==undefined&&
        this.searchParam.start_date!==""
      ){
        newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
      }

      if(params.end_date !== undefined && params.end_date !== ''){
        newParams.end_date = params.end_date.replace(/-/g,"")
      }else if(
        this.searchParam.end_date!==undefined&&
        this.searchParam.end_date!==""
      ){
        newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
      }

      if(params.product_name !== undefined && params.product_name !== ''){
        newParams.product_name = params.product_name
      }else if(
        this.searchParam.product_name!==undefined&&
        this.searchParam.product_name!==""
      ){
        newParams.product_name=this.searchParam.product_name
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }
        if(params.prodcd !== undefined && params.prodcd !== ''){
        newParams.prodcd = params.prodcd
      }else if(
        this.searchParam.prodcd!==undefined&&
        this.searchParam.prodcd!==""
      ){
        newParams.prodcd=this.searchParam.prodcd
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>