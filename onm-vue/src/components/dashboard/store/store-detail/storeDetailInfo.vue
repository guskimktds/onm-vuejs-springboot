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
        >
        </storeDetailInfo-list>
      </v-card>
    </v-container>
</template>

<script>

import StoreDetailInfoList from "./storeDetailInfoList";
import StoreDetailInfoQuery from "./storeDetailInfoQuery";
import dateInfo from "../../../utils/common"

import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default{
  components: {
    StoreDetailInfoList,
    StoreDetailInfoQuery
  },

  data() {
    return {
      title: "매장정보 상세 조회",
      pList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        user_name:'',
        user_id:'',
        status_code:''
      }
    }
  },
 
 methods: {
  searchToStoreDetailInfo: function (params) {
   
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13002/get_user_detail`

   var reqParams=this.handleParams(params)
   console.log(reqParams)
   if(!reqParams.start_date&&!reqParams.user_name&&!reqParams.user_id&&!reqParams.status_code){
     this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
   }else{
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.user_detail_list;
          this.resPagingInfo = response.data.data.paging_info
           console.log('페이지값')
          console.log(this.pList)
        }else if(resCode==204){
          this.pList = [];
          this.resPagingInfo = {};
          alert('매장정보 상세 데이터가 없습니다.');
        }else if(resCode==410){
          alert(resCode + " / " + resMsg);
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
   }
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

    handleParams:function(params){
      let newParams = {}
      if(params.date_yn==undefined){
          params.date_yn=this.searchParam.date_yn
        }

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

      if(params.date_yn==true){
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

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
      return newParams
    }
  },
}
  
</script>

<style scoped>
</style>