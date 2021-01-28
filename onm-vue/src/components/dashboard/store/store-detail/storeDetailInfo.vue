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
        appoint_date:'',
        user_name:'',
        user_id:'',
        status_code:''
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
            this.pList = response.data.data.user_detail_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
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

      if(params.appoint_date !== undefined && params.appoint_date !== ''){
        newParams.appoint_date = params.appoint_date
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }
      if(params.user_name !== undefined && params.user_name !== ''){
        newParams.user_name = params.user_name
      }
      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }

      return newParams
    }
  },
}
  
</script>

<style scoped>
</style>