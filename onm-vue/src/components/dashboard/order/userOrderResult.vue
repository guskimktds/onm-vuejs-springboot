<template>
    <v-container fluid>
      <v-card>        
        <user-order-result-query 
          v-on:search="searchToUserOrderResult"
          v-bind:param=searchParam
          ></user-order-result-query>
        <user-order-result-list 
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo 
          @pagination="setToSearchParams"
          ></user-order-result-list>
      </v-card>
    </v-container>

</template>

<script>
import UserOrderResultList from './user-order-result/userOrderResultList'
import UserOrderResultQuery from './user-order-result/userOrderResultQuery'
import dateInfo from '../../utils/common'

import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderResultList,
    UserOrderResultQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 처리 결과',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {}
      ,
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        said: '',
        guid: ''
      }
    }
  },
  methods: {
    searchToUserOrderResult: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12011/get_user_subs_result_list`
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      

      console.log(reqParams)
      if(!reqParams.start_date&&!reqParams.said&&!reqParams.guid){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.subs_result_list;
          this.resPagingInfo = response.data.data.paging_info

        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert("사용자 청약 오더 처리 결과 데이터가 없습니다.");
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

      this.searchToUserOrderResult(params)
    },

    handleParams: function(params){
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
      
      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      ){
        newParams.said=this.searchParam.said
      }

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }

      return newParams
    }


  }
}
</script>

<style scoped>

</style>