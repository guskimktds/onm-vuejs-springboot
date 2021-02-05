<template>
  <div>
    <v-container fluid>
      <v-card>
        <user-order-phone-query v-on:search="searchToUserOrderPhone"
        v-bind:param=searchParam></user-order-phone-query>
        <user-order-phone-list v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"
        ></user-order-phone-list>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import UserOrderPhoneList from './user-order-phone/userOrderPhoneList'
import UserOrderPhoneQuery from './user-order-phone/userOrderPhoneQuery'

import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderPhoneList,
    UserOrderPhoneQuery
  },
  data () {
    return {
      title: '사용자 청약 전화번호',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {}
      ,
      searchParam: {
        start_date: '',
        end_date: '',
        telno:'',
        guid:'',
      }
    }
  },
  created: function() {

    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
    .post(url, params, headers)
    .then((response) => {
      console.log(response.data)
      //this.list = JSON.parse(result.data.menu)
      var resCode = response.data.res_code;
      var resMsg = response.data.res_msg;
      if(resCode == 200){
        this.pList = response.data.data.tel_no_list;
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
  methods: {
    searchToUserOrderPhone: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)    
      axios.post(url, reqParams, headers)
      // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
      //   params
      // })
      .then((response) => {
        
        console.log(response.data)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.tel_no_list;
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

    setToSearchParams:function(values){
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      this.searchToUserOrderPhone(params)
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

      if(params.start_date !== undefined && params.start_date !== ''){
        newParams.start_date = params.start_date
      }

      if(params.end_date !== undefined && params.end_date !== ''){
        newParams.end_date = params.end_date
      }

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }

      if(params.telno !== undefined && params.telno !== ''){
        newParams.telno = params.telno
      }     
      return newParams
    }
  }
}
</script>

<style scoped>

</style>