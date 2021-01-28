<template>
    <v-container fluid>
      <v-card>
        <kttInfo-query v-on:search="searchKTTInfo"
        v-bind:param=searchParam>></kttInfo-query>
        <kttInfo-list 
        v-bind:kList="kList"
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></kttInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import KTTInfoList from "./kttInfoList";
import KTTInfoQuery from "./kttInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    'kttInfo-list': KTTInfoList,
    'kttInfo-query': KTTInfoQuery
  },
  data() {
    return {
      title: "사용자 - KTT 정보",
      kList: [],
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
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`

    var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.kList = response.data.data.ktt_info_list;
            this.resPagingInfo = response.data.data.paging_info
             console.log('전체 list 값')
            console.log(this.kList)
          }else{
            this.kList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },
   methods: {
  searchKTTInfo: function (params) {
    
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`

    var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.kList = response.data.data.ktt_info_list;
          this.resPagingInfo = response.data.data.paging_info
    
        }else{
          this.kList = [];
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

      this.searchKTTInfo(params)
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

      if(params.reg_date !== undefined && params.reg_date !== ''){
        newParams.reg_date = params.reg_date
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }
      if(params.service_no !== undefined && params.service_no !== ''){
        newParams.service_no = params.service_no
      }
      if(params.system_id !== undefined && params.system_id !== ''){
        newParams.system_id = params.system_id
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>