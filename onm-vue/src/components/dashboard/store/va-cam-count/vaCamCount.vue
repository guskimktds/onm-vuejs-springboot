<template>
    <v-container fluid>
      <v-card>
        <vaCamCount-query
         v-on:search="searchToVaCamCount"
         v-bind:param=searchParam></vaCamCount-query>
        <vaCamCount-list 
          v-bind:vaList="vaList"
          v-bind:vaPagingInfo=vaPagingInfo

          @pagination="setToSearchParams"></vaCamCount-list>
      </v-card>
    </v-container>
</template>

<script>
import VaCamCountList from "./vaCamCountList";
import VaCamCountQuery from "./vaCamCountQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    VaCamCountList,
    VaCamCountQuery,
  },
  data() {
    return {
      title: "VA상품 및 카메라 대수 확인",
      vaList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      vaPagingInfo:{},
      searchParam:{
        va_name:'',
        user_id:''
      }
    }
  },
  
 methods: {
  searchToVaCamCount: function (params) {
    
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13006/get_user_va_list`

   var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.vaList = response.data.data.va_prod_list;
          this.vaPagingInfo = response.data.data.paging_info
        }else{
          this.vaList = [];
          this.vaPagingInfo = {};
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

      this.searchToVaCamCount(params)
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

      if(params.va_name !== undefined && params.va_name !== ''){
        newParams.va_name = params.va_name
      }else if(
        this.searchParam.va_name!==undefined&&
        this.searchParam.va_name!==""
      ){
        newParams.va_name=this.searchParam.va_name
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>