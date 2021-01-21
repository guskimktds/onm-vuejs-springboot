<template>
    <v-container fluid>
      <v-card>
        <user-order-info-query 
          v-on:search="searchToUserOrderInfo"
          v-bind:param=searchParam
        ></user-order-info-query>
        <user-order-info-list 
          v-bind:pList=pList 
          v-bind:resPagingInfo=resPagingInfo 
          @child="clickToSearchDetailObject" 
          @pagination="setToSearchParams"
        >
        </user-order-info-list>
        <v-container
            id="regular-tables"
            fluid
            tag="section"
        >
          <v-btn color="indigo" v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
            오더상세{{showDetailObject?" Close":" Open"}}
          </v-btn>
        </v-container>
        <user-order-detail-object v-if=showDetailObject v-bind:pObject=pObject></user-order-detail-object>
      </v-card>
    </v-container>
</template>

<script>
import UserOrderInfoList from './user/order-info/userOrderInfoList'
import UserOrderInfoQuery from './user/order-info/userOrderInfoQuery'
import UserOrderDetailObject from './user/order-detail/userOrderDetailObject'

import axios from "axios"

// import EventBus from '../../../EventBus';

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderInfoList,
    UserOrderInfoQuery,
    UserOrderDetailObject
  },
  data () {
    return {
      title: '사용자 청약 오더 정보',
      pList: [],
      pObject: {        
      },
      showDetailObject: false,
      isReloadDetailObject: false,
      btnTitle: '청약오더상세open',
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {}
      ,
      searchParam: {
        /*
    "start_date": null,
    "end_date": null,
    "said": "",
    "guid": "",
    "oderno": "",
    "page_no": 1,
    "view_cnt": 10
        */
        start_date: '',
        end_date: '',
        said: '',
        guid: '',
        oderno: ''
      }
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12001/get_user_subs_order_info'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list;
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
  // mounted: function() {
  //    EventBus.$on('createItem', params => {
  //       //console.log('codeMain.vue eventbus : param : ',parameter)
  //       var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12001/get_user_subs_order_info'
  //       // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12001/get_user_subs_order_info`
  //       var headers = {
  //         'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  //         'Content-Type': 'application/json'
  //       }

  //       axios
  //       .post(url, params, headers)
  //       .then((response) => {
  //         // console.log(response.data)
  //         //this.list = JSON.parse(result.data.menu)
  //         var resCode = response.data.res_code;
  //         var resMsg = response.data.res_msg;
  //         if(resCode == 200){
  //           this.pList = response.data.data.list;

  //         }else{
  //           this.pList = [];
  //           alert(resCode + " / " + resMsg);
  //         }
  //       })
  //       .catch((ex) => {
  //         console.log('조회 실패',ex)
  //       })
  //   })
  // },
  methods: {
    searchToUserOrderInfo: function(params){

      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      

      console.log(reqParams)

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.list;
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

    clickToSearchDetailObject: function(values){
      console.log(values)
      if(values) {
        this.showDetailObject = true
        this.isReloadDetailObject = true

        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12002/get_user_subs_detail`
        var params = {
          guid: values
        }

        console.log(params)

        axios.post(url, params, headers)
        .then((response) => {
          console.log(response)
          //this.list = JSON.parse(result.data.menu)
          // console.log(Array.isArray(result.data.data))
          // if(Array.isArray(result.data.data)){
          //   this.pList = result.data.data                
          // }else{
            console.log(response.data.data)
            // this.pObject = response.data.data
            // this.isArrayed = false
          // }

           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data
              // this.isArrayed = false
            }else{
              this.pObject = {};
              // this.resPagingInfo = {};
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
      // this.reqPagingInfo.page_no = values.page
      // this.reqPagingInfo.view_cnt = values.itemsPerPage
      // console.log(this.reqPagingInfo)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToUserOrderInfo(params)
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

      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }

      if(params.oderno !== undefined && params.oderno !== ''){
        newParams.oderno = params.oderno
      }

      return newParams

    }
  }
}
</script>

<style scoped>

</style>