<template>
    <v-container fluid>
      <v-card>
        <!-- <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar> -->
        <user-order-info-query v-on:search="searchToUserOrderInfo"></user-order-info-query>
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

import EventBus from '../../../EventBus';

export default {
  components: {
    UserOrderInfoList,
    UserOrderInfoQuery,
    UserOrderDetailObject
  },
  data () {
    return {
      title: '사용자 청약 오더 정보',
      pList: [
        // {tranId:"GPNA_20201029133825838_LVSPWS0001", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0002", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0003", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "55", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
        // {tranId:"GPNA_20201029133825838_LVSPWS0004", contractId:"S00347106", productCode: "B162", moProductName: "GiGAeyes i-slim(2)", storeName:'홍길동', orderType:"4201", orderNumber:"20303DO9519190", orderSeq:1, changeTypeCode: "5560", hopeDate:"2020110315",usageType:"T", createDate: "20-10-29 13:38"},
      ],
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
    }
  },
  created: function() {

    var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12001/get_user_subs_order_info'
    // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12001/get_user_subs_order_info`
    // var params = {
    //   page_no: 1,
    //   view_cnt: 5
    // }
    var headers = {
      'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      // 'Content-Type': 'application/json'
    }

    console.log('VUE_APP_BACKEND_SERVER_URL_TB:', url)
    console.log(process.env)
    console.log(this.reqPagingInfo)
    var params = this.reqPagingInfo
    console.log(params)
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

    // axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}`;
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
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
  mounted: function() {
     EventBus.$on('createItem', params => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12001/get_user_subs_order_info'
        // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12001/get_user_subs_order_info`
        var headers = {
          'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
          'Content-Type': 'application/json'
        }

        axios
        .post(url, params, headers)
        .then((response) => {
          // console.log(response.data)
          //this.list = JSON.parse(result.data.menu)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list;

          }else{
            this.pList = [];
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    })
  },
  methods: {
    searchToUserOrderInfo: function(params){

    var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12001/get_user_subs_order_info'
    // var params = {
    //   page_no: 1,
    //   view_cnt: 5
    // }
    var headers = {
      'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      'Content-Type': 'application/json'
    }

        axios.post(url, params, headers)
            // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
            //   params
            // })
            .then((result) => {
              console.log(result)
              //this.list = JSON.parse(result.data.menu)
              this.list = result.data
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

        var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12002/get_user_subs_detail'
        var params = {
          guid: values
        }

        console.log(params)
        var headers = {
          'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
          'Content-Type': 'application/json'
        }

        axios.post(url, params, headers)
            // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
            //   params
            // })
            .then((result) => {
              console.log(result)
              //this.list = JSON.parse(result.data.menu)
              // console.log(Array.isArray(result.data.data))
              // if(Array.isArray(result.data.data)){
              //   this.pList = result.data.data                
              // }else{
                console.log(result.data.data)
                this.pObject = result.data.data
                this.isArrayed = false
              // }
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
    }
  }
}
</script>

<style scoped>

</style>