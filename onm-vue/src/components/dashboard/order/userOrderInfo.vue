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
          <v-btn v-bind:color="changeColor(showDetailObject)"  v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
            오더상세{{showDetailObject?" Close":" Open"}}
          </v-btn>
        </v-container>
    
        <v-container
            id="regular-tables"
            fluid
            tag="section"
        >

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="clickToSearchSubDetailList()">
            사용자 청약오더List{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showKttList)" v-if=showDetailObject v-on:click="clickToSearchKTT()" >
            사용자-KTT{{showKttList?" Close":" Open"}}
          </v-btn>


        </v-container>

      <user-order-detail-object v-if=showDetailObject v-bind:pObject=pObject></user-order-detail-object>
      
      <v-container v-if=showDetailObject>

        <user-order-sub-detail-list 
          v-if=showSubDetailList
          v-bind:sdList=sdList >
        </user-order-sub-detail-list>

        <ktt-list 
          v-if=showKttList 
          v-bind:kttList=kttList
        ></ktt-list>

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
import dateInfo from '../../utils/common'

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
      oldValue:'',
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        said: '',
        guid: '',
        oderno: ''
      }
    }
  },

  methods: {
    searchToUserOrderInfo: function(params){

      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      
      

      axios.post(url, reqParams, headers)
      .then((response) => {
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

    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },

    clickToSearchDetailObject: function(values){

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
              
              this.showDetailObject = true
              this.isReloadDetailObject = true
              this.orderBtn=!this.orderBtn
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

      if(values!==this.oldValue){
          console.log('실행')
          this.showSubDetailList=false
          this.showKttList=false
      } 
        this.oldValue={}
        this.oldValue=values

    },
        
    clickToSearchSubDetailList:function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12003/get_subs_order_details_list`
    var params={
      guid: this.pObject.guid,
      page_no: '1',
      view_cnt: '999999'
    }

    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.sdList = response.data.data.list;
            this.showSubDetailList=!this.showSubDetailList;
            this.subBtn=!this.subBtn
          }else{
            this.sdList = [];
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
      view_cnt: '999999'
    }
    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(resCode)
          if(resCode == 200){
            this.kttList = response.data.data.list;

            this.showKttList =!this.showKttList
            this.kttBtn=!this.kttBtn
          }else{
            this.kttList = [];
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