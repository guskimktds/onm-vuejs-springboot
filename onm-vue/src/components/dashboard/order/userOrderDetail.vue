<template>
  <div>
    <v-container fluid>
      <v-card>
        <user-order-detail-query 
          v-on:search="searchToUserOrderDetail"
          v-bind:param=searchParam
          ></user-order-detail-query>
        <user-order-detail-list 
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo 
          @pagination="setToSearchParams"
        ></user-order-detail-list>
        <!-- <user-order-detail-object v-bind:pObject=pObject></user-order-detail-object> -->
      </v-card>
    </v-container>
  </div>

</template>

<script>
import UserOrderDetailList from './user/order-detail/userOrderDetailList'
// import UserOrderDetailObject from './user/order-detail/userOrderDetailObject'
import UserOrderDetailQuery from './user/order-detail/userOrderDetailQuery'

import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderDetailList,
    // UserOrderDetailObject,
    UserOrderDetailQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 상세',
      pList: [],
      pObject: {},
      isArrayed : true,
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        guid: ''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12003/get_subs_order_details_list`
    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios.post(url, params, headers)
    .then((response) => {
      console.log(response.data)
      var resCode = response.data.res_code;
      var resMsg = response.data.res_msg;
      if(resCode == 200){
        this.pList = response.data.data.list;
        this.resPagingInfo = response.data.data.order_detail_list

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
  methods: {
    searchToUserOrderDetail: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12003/get_subs_order_details_list`
      
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.order_detail_list;
          this.resPagingInfo = response.data.data.paging_info

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

      //페이징 params add search params
      let newParams = handleParams(params)
      console.log(newParams)
      this.searchToUserOrderDetail(newParams)
    },

    handleParams: function(params){
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

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }

        
      return newParams
    }
    
  }
}
</script>

<style scoped>

</style>