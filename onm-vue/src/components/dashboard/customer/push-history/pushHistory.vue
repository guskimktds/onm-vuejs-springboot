<template>
  <v-container fluid>
      <v-card>
        <pushHistory-query
          v-on:search="searchToPushHistory"
          v-bind:param="searchParam"
        ></pushHistory-query>
        <pushHistory-list 
        v-bind:pList="pList"
        v-bind:pushPagingInfo=pushPagingInfo
        @pagination=setToSearchParams></pushHistory-list>
      </v-card>
    </v-container>
</template>

<script>
import PushHistoryList from './pushHistoryList'
import PushHistoryQuery from './pushHistoryQuery'

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    PushHistoryList,
    PushHistoryQuery
  },
  data () {
    return {
      title: '푸시 발송 이력',
      pList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10,
        local_gw_id:'1'
      },
      pushPagingInfo:{},
      searchParam:{
        alarm_start_time:'',
        alim_id:'',
        user_id:'',
        cam_id:''
      }
    }
  },
  // created: function () {
  //   console.log(process.env);
  //   axios
  //     .post(`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14006/get_push_sending_history`,{
        
  //       "page_no": 1,
  //       "view_cnt": 5,
  //       "local_gw_id": "1"

  //     })
  //     .then((result) => {
  //       console.log(result);
  //       this.pList = result.data.data.list;
  //     })
  //     .catch((ex) => {
  //       console.log("조회 실패", ex);
  //     });
  // },
  methods: {
    searchToPushHistory: function(params){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_14006/get_push_sending_history`

      var reqParams=this.handleParams(params)
      console.log('보내는 값')
      console.log(reqParams)
      axios.post(url,reqParams,headers)
        .then((response)=>{
          var resCode=response.data.res_code;
          var resMsg=response.data.res_msg;
          if(resCode==200){
            this.pList=response.data.data.list;
            this.pushPagingInfo=response.data.data.paging_info;
          }else{
            this.pList=[];
            this.pushPagingInfo={};
             alert(resCode+" / "+resMsg);
          }
        })
        .catch((ex)=>{
          console.log('조회 실패', ex)
        })
        .finally(function(){})
    },

    setToSearchParams:function(values){
      var params={
        page_no:values.page,
        view_cnt:values.itemsPerPage,
        local_gw_id:'1'
      }
      this.searchToPushHistory(params)
    },

    handleParams:function(params){
      let newParams={}

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
      if(params.local_gw_id === undefined || params.local_gw_id === ''){
        newParams.local_gw_id = this.reqPagingInfo.local_gw_id
      }else{
        newParams.local_gw_id = params.local_gw_id
      } 

      if(params.alarm_start_time===undefined||params.alarm_start_time===''){
        newParams.alarm_start_time=this.pushPagingInfo.alarm_start_time
      }else if(
        this.searchParam.alarm_start_time!==undefined&&
        this.searchParam.alarm_start_time!==""){
        newParams.alarm_start_time=params.alarm_start_time
      }
      if(params.alim_id===undefined||params.alim_id===''){
        newParams.alim_id=this.pushPagingInfo.alim_id
      }else if(
        this.searchParam.alim_id!==undefined&&
        this.searchParam.alim_id!==""){
        newParams.alim_id=params.alim_id
      }
      if(params.user_id===undefined||params.user_id===''){
        newParams.user_id=this.pushPagingInfo.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""){
        newParams.user_id=params.user_id
      }
      if(params.cam_id===undefined||params.cam_id===''){
        newParams.cam_id=this.pushPagingInfo.cam_id
      }else if(
        this.searchParam.cam_id!==undefined&&
        this.searchParam.cam_id!==""){
        newParams.cam_id=params.cam_id
      }

      return newParams
    }
  }
}
</script>

<style scoped>

</style>