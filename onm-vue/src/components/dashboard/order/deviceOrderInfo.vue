<template>
  <v-container fluid>
      <v-card>    
        <device-order-info-query 
        v-on:search="searchToDeviceOrderInfo"
        v-bind:param="searchParam"></device-order-info-query>
        
        <device-order-info-list 
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo

        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"></device-order-info-list>
      </v-card>

      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <v-btn color="indigo" v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
          단말오더 상세{{showDetailObject?" Close":" Open"}}
         </v-btn>

        <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchDetailList()">
          단말오더 상세 내역{{showDetailList?" Close":" Open"}}
        </v-btn>

        <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchResultList()">
          단말오더 처리결과{{showResultList?" Close":" Open"}}
        </v-btn>

       </v-container>

      <device-order-object v-if=showDetailObject v-bind:pObject=pObject></device-order-object>

      <v-container v-if=showDetailObject>
        <device-order-detail-list v-if=showDetailList
        v-bind:dodList="dodList"
        v-bind:dodPagingInfo=dodPagingInfo></device-order-detail-list>
        
        <device-order-result-list v-if=showResultList
        v-bind:dorList="dorList"
        v-bind:dorPagingInfo=dorPagingInfo></device-order-result-list>
      
      </v-container>
    
    </v-container>
</template>

<script>
import DeviceOrderInfoList from './device-order-info/deviceOrderInfoList'
import DeviceOrderInfoQuery from './device-order-info/deviceOrderInfoQuery'
import DeviceOrderObject from './device-order-info/deviceOrderObject'
import DeviceOrderDetailList from './device-order-info/deviceOrderDetailList'
import DeviceOrderResultList from './device-order-result/deviceOrderResultList'

import axios from "axios"

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    DeviceOrderInfoList,
    DeviceOrderInfoQuery,
    DeviceOrderObject,
    DeviceOrderDetailList,
    DeviceOrderResultList
  },
  data () {
    return {
      title: '단말 청약 오더 정보',
      pList: [],
      pObject:{},
      showDetailObject:false,
      isReloadDetailObject:false,
      btnTitle: '단말오더 정보 상세Open',

      title2:'단말오더 상세 내역',
      dodList:[],
      showDetailList:false,
      btnTitle2:'단말오더 상세내역 open',

      title3:'단말오더 처리 결과',
      dorList:[],
      showResultList:false,
      btnTitle3:'단말오더 처리결과 open',

      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      dodPagingInfo:{},
      dorPagingInfo:{},
      searchParam:{
        appointdate:'',
        guid:'',
        oderno:'',
        said:''
      }
    }
  },

  methods: {
    searchToDeviceOrderInfo: function(params){
      console.log('검색값')
      console.log(params)
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12006/get_device_order`

      var reqParams=this.handleParams(params)

        axios.post(url, reqParams, headers)
            .then((response) => {
             console.log(response)
              var resCode=response.data.res_code;
              var resMsg=response.data.res_msg;
              if(resCode==200){
                this.pList=response.data.data.device_order_list;
                this.resPagingInfo=response.data.data.paging_info;
              }else{
                this.pList=[];
                this.resPagingInfo={};
                alert(resCode+" / "+ resMsg);
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
            .finally(function(){})
    },

    clickToSearchDetailObject: function(values){
      console.log(values)
      if(values) {
        this.showDetailObject = true
        this.isReloadDetailObject = true

        var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12007/get_device_order_detail`

        var params = {
          guid: values,
          page_no: '1',
          view_cnt: '5'
        }
      
        axios.post(url, params, headers)
        .then((response) => {
           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data
               console.log(this.pObject)
            }else{
              this.pObject = {};
              alert(resCode + " / " + resMsg);
            }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
    },

    clickToSearchDetailList:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12008/get_device_order_detail_list`

      var params={
      guid: this.pObject.guid,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dodList=response.data.data.device_order_detail_list;
              this.dodPagingInfo=response.data.data.paging_info;
              this.showDetailList=!this.showDetailList;
            }else{
              this.dodList=[];
              this.dodPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },
    
    clickToSearchResultList:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12012/get_device_order_result_list`

      var params={
        guid:this.pObject.guid,
        page_no: '1',
        view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dorList=response.data.data.device_order_result_list;
              this.dorPagingInfo=response.data.data.paging_info;
              this.showResultList=!this.showResultList;
            }else{
              this.dorList=[];
              this.dorPagingInfo={};
              alert(resCode+" / "+resMsg);
            }
          })
          .catch((ex)=>{
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

      this.searchToDeviceOrderInfo(params)
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

      if(params.appointdate !== undefined && params.appointdate !== ''){
        newParams.appointdate = params.appointdate
      }else if(
        this.searchParam.appointdate!==undefined&&
        this.searchParam.appointdate!==""
      ){
        newParams.appointdate=this.searchParam.appointdate
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
      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      ){
        newParams.said=this.searchParam.said
      }

      return newParams
    }
  }
}
</script>

<style scoped>

</style>