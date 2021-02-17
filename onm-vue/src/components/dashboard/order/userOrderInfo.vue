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
    
        <v-container
            id="regular-tables"
            fluid
            tag="section"
        >

          <v-btn color="indigo" v-if=showDetailObject v-on:click="clickToSearchSubDetailList()" >
            사용자 청약오더List{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if=showDetailObject v-on:click="clickToSearchKTT()" >
            사용자-KTT{{showKttList?" Close":" Open"}}
          </v-btn>

        </v-container>

      <user-order-detail-object v-if=showDetailObject v-bind:pObject=pObject></user-order-detail-object>
      
      <v-container v-if=showDetailObject>

        <user-order-sub-detail-list v-if=showSubDetailList
        v-bind:sdList=sdList
        v-bind:sdPagingInfo=sdPagingInfo></user-order-sub-detail-list>

        <ktt-list v-if=showKttList 
        v-bind:kttList=kttList
        v-bind:kttPagingInfo=kttPagingInfo></ktt-list>

      </v-container>
      </v-card>
    </v-container>
</template>

<script>
import UserOrderInfoList from './user/order-info/userOrderInfoList'
import UserOrderInfoQuery from './user/order-info/userOrderInfoQuery'
import UserOrderDetailObject from './user/order-detail/userOrderDetailObject'
import UserOrderSubDetailList from './user/order-detail/userOrderSubDetailList'
import KttList from './ktt-order/kttOrderInfoList'


import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderInfoList,
    UserOrderInfoQuery,
    UserOrderDetailObject,
    UserOrderSubDetailList,
    KttList,
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

      title2: '사용자 청약오더 List',
      sdList:[],
      showSubDetailList:false,
      btnTitle2: '사용자 청약오더List open',

      title3: '사용자-KTT 정보 조회',
      kttList:[],
      showKttList:false,
      btnTitle3: '사용자-KTT open',

      resPagingInfo: {},
      sdPagingInfo:{},
      kttPagingInfo:{},
      
      searchParam: {
        appointdate:'',
        said: '',
        guid: '',
        oderno: ''
      }
    }
  },
  created: function() {

    // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12001/get_user_subs_order_info'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    //this.$store.state.headers

    axios.post(url, params, headers)
    .then((response) => {
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
  methods: {
    searchToUserOrderInfo: function(params){

      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      
      

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log('전달된 sub order 정보')
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
     
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12002/get_user_subs_detail`
        var params = {
          guid: values
        }

        console.log(params)

        axios.post(url, params, headers)
        .then((response) => {
          console.log(response)
          console.log(response.data.data)
          
           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data
              // this.isArrayed = false
              this.showDetailObject = true
              this.isReloadDetailObject = true
            }else{
              this.pObject = {};
              this.showDetailObject = false
              this.isReloadDetailObject = false
              alert(resCode + " / " + resMsg);
            }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
    },
        
    clickToSearchSubDetailList:function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12003/get_subs_order_details_list`
    var params={
      guid: this.pObject.guid,
      page_no: '1',
      view_cnt: '5'
    }
    console.log('파라미터')
    console.log(params)
    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.sdList = response.data.data.list;
            this.sdPagingInfo = response.data.data.paging_info;

            this.showSubDetailList=!this.showSubDetailList;
          }else{
            this.sdList = [];
            this.sdPagingInfo = {};
            this.showSubDetailList=false
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
    },

    clickToSearchKTT: function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12005/get_user_ktt_subs`
    var params={
      guid: this.pObject.guid,
      page_no: '1',
      view_cnt: '5'
    }
    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(resCode)
          if(resCode == 200){
            this.kttList = response.data.data.list;
            this.kttPagingInfo = response.data.data.paging_info

            this.showKttList =!this.showKttList
          }else{
            this.kttList = [];
            this.kttPagingInfo = {};
            alert(resCode + " / " + resMsg);
            this.showKttList=false
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
    },

    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,

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
      if(params.appointdate !== undefined && params.appointdate !== ''){
        newParams.appointdate = params.appointdate
      }else if(
        this.searchParam.appointdate!==undefined&&
        this.searchParam.appointdate!==""
      ){
        newParams.appointdate=this.searchParam.appointdate
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
      if(params.oderno !== undefined && params.oderno !== ''){
        newParams.oderno = params.oderno
      }else if(
        this.searchParam.oderno!==undefined&&
        this.searchParam.oderno!==""
      ){
        newParams.oderno=this.searchParam.oderno
      } 
      return newParams
    }
  }
}
</script>

<style scoped>

</style>