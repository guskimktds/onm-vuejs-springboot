<template>
    <v-container fluid>
      <v-card>
        <storeDetailInfo-query
          v-on:search="searchToStoreDetailInfo"
          v-bind:param=searchParam></storeDetailInfo-query>
        <storeDetailInfo-list 
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo

        @pagination="setToSearchParams"
        @child="clickMaskObject"
        >
        </storeDetailInfo-list>
      <modal
      v-bind:mask="mask"
      ref="modal"></modal>
      </v-card>
    </v-container>
</template>

<script>

import StoreDetailInfoList from "./storeDetailInfoList";
import StoreDetailInfoQuery from "./storeDetailInfoQuery";
import dateInfo from "../../../utils/common"
import Modal from "./storeDetailModal"

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default{
  components: {
    StoreDetailInfoList,
    StoreDetailInfoQuery,
    Modal
  },

  data() {
    return {
      title: "매장정보 상세 조회",
      pList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      mask:{},
      resPagingInfo:{},
      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        user_name:'',
        user_id:'',
        status_code:''
      }
    }
  },
 
 methods: {
  searchToStoreDetailInfo: function (params) {
   
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`

   var reqParams=this.handleParams(params)
   console.log(reqParams)
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.user_detail_list;
          this.resPagingInfo = response.data.data.paging_info
          console.log('출력')
          console.log(this.pList.appoint_date)
        }else{
          this.pList = [];
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

      this.searchToStoreDetailInfo(params)
    },

    clickMaskObject:function(values){
      
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`

      if(values){
        console.log('클릭값')
        console.log(values)

        var params={
          user_id: values,
          page__no:"1",
          view_cnt:"5",
          is_masking: "N"
        }
        var reqParams=params

      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.mask = response.data.data.user_detail_list[0];
          console.log(this.mask)
        }else{
          this.mask = [];
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
        })
      }

      this.$refs.modal.open();
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

      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }
      if(params.user_name !== undefined && params.user_name !== ''){
        newParams.user_name = params.user_name
      }else if(
        this.searchParam.user_name!==undefined&&
        this.searchParam.user_name!==""
      ){
        newParams.user_name=this.searchParam.user_name
      }
      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }else if(
        this.searchParam.status_code!==undefined&&
        this.searchParam.status_code!==""
      ){
        newParams.status_code=this.searchParam.status_code
      }
      return newParams
    }
  },
}
  
</script>

<style scoped>
</style>