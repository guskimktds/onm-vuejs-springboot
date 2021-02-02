<template>
    <v-container fluid>
      <v-card>
        <storeInfo-query
         v-on:search="searchToStoreInfo"
         v-bind:param=searchParam></storeInfo-query>
        <storeInfo-list
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"

        >
        </storeInfo-list>

        <v-container
          id="regular-tables"
          fluid
          tag="section"
        >
          <v-btn color="indigo" v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
            매장상세{{showDetailObject?" Close":" Open"}}
          </v-btn>
        </v-container>

        <v-container
          id="regular-tables"
          fluid
          tag="section"
        >

          <v-btn color="indigo" v-if=showDetailObject v-on:click="clickToSearchKTT()" >
            사용자-KTT{{showKttList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if=showDetailObject v-on:click="clickToSearchProdSummary()">
            상품 요약 정보{{showProdSummaryList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchVACount()" >
            VA 정보 조회{{showVACountList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchSensorOrder()">
            센서 정보 조회{{showSensorOrderList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchDeviceCamera()" >
            단말 카메라 정보 조회{{showDeviceCameraList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchIotGw()" >
           단말 IoT GW 정보 조회{{showIotGwList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchDeviceSensor()">
            단말 센서 정보 조회{{showDeviceSensorList?" Close":" Open"}}
          </v-btn>

          <v-btn color="indigo" v-if="showDetailObject" v-on:click="clickToSearchPhone()">
            사용자 전화번호{{showPhoneList?" Close":" Open"}}
          </v-btn>

        </v-container>
        <storeInfo-detail-object v-if=showDetailObject v-bind:pObject=pObject></storeInfo-detail-object>

      <v-container v-if=showDetailObject>
        <ktt-list v-if=showKttList 
        v-bind:kList=kList
        v-bind:resPagingInfo=resPagingInfo
        ></ktt-list>

        <prod-summary-list v-if=showProdSummaryList 
        v-bind:psList=psList
        v-bind:resPagingInfo=resPagingInfo></prod-summary-list>
        
        <va-cam-count v-if=showVACountList
        v-bind:vaList=vaList
        v-bind:resPagingInfo=resPagingInfo></va-cam-count>

        <sensor-order-list v-if=showSensorOrderList
        v-bind:soList=soList
        v-bind:resPagingInfo=resPagingInfo></sensor-order-list>

        <device-camera-list v-if=showDeviceCameraList
        v-bind:dcList=dcList
        v-bind:resPagingInfo=resPagingInfo></device-camera-list>

        <iot-gw-list v-if=showIotGwList
        v-bind:iotList="iotList"
        v-bind:resPagingInfo=resPagingInfo></iot-gw-list>


        <device-sensor-list v-if=showDeviceSensorList
        v-bind:dsList="dsList"
        v-bind:resPagingInfo=resPagingInfo></device-sensor-list>

        <phone-list v-if=showPhoneList
        v-bind:pnList="pnList"
        v-bind:resPagingInfo=resPagingInfo></phone-list>
      </v-container>

      </v-card>
    </v-container>
</template>

<script>

import StoreInfoList from "./info/storeInfoList";
import StoreInfoQuery from "./info/storeInfoQuery";
import StoreInfoDetailObject from './store-detail/storeDetailObject';

import KttList from './ktt/kttInfoList';
import ProdSummaryList from './product-summary/storeProductSummaryInfoList';
import VaCamCount from './va-cam-count/vaCamCountList'
import SensorOrderList from './sensor-order/sensorOrderInfoList'
import DeviceCameraList from './device-camera/cameraInfoList'
import IotGwList from './device-iotgw/iotgwInfoList'
import DeviceSensorList from './device-sensor/sensorInfoList'
import PhoneList from './info/storePhoneList'


import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    StoreInfoList,
    StoreInfoQuery,
    StoreInfoDetailObject,
    KttList,
    ProdSummaryList,
    VaCamCount,
    SensorOrderList,
    DeviceCameraList,
    IotGwList,
    DeviceSensorList,
    PhoneList
  },
  data() {
    return {
      title: '매장 정보 조회',
      pList: [],
      pObject:{},
      showDetailObject: false,                                                                                                    
      isReloadDetailObject: false,
      btnTitle: '매장정보상세Open',

      title2: '사용자-KTT 정보 조회',
      kList:[],
      showKttList:false,
      btnTitle2: '사용자-KTT open',

       title3: '상품 요약 정보 조회',
      psList:[],
      showProdSummaryList:false,
      btnTitle3: '상품 요약 open',

      title4: 'VA 정보 조회',
      vaList:[],
      showVACountList:false,
      btnTitle4: 'VA 정보 open',

      title5: '센서 정보 조회',
      soList:[],
      showSensorOrderList:false,
      btnTitle5: '센서 정보 open',

      title6: '단말 카메라 정보 조회',
      dcList:[],
      showDeviceCameraList:false,
      btnTitle6: '단말 카메라 정보 open',

      title7: 'IoT GW 정보 조회',
      iotList:[],
      showIotGwList:false,
      btnTitle7: 'IoT GW 정보 open',

      title8: '단말 센서 정보 조회',
      dsList:[],
      showDeviceSensorList:false,
      btnTitle8: '단말 센서 정보 open',

      title9: '사용자 전화번호 조회',
      pnList:[],
      showPhoneList:false,
      btnTitle9: '사용자 전화번호 open',

      reqPagingInfo:{
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo:{},
      searchParam:{
        said:'',
        user_name:'',
        user_id:'',
        tel_no:''
      },
    
    }
  },
  created: function () {
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13001/get_user_list`

    var params=this.reqPagingInfo

    axios
      .post(url, params, headers)
      .then((response) => {
        var resCode=response.data.res_code;
        var resMsg=response.data.res_msg;
        if(resCode==200){
          this.pList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },

  methods: {
    searchToStoreInfo: function (params) {

      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13001/get_user_list`

      var reqParams=this.handleParams(params)

      axios.post(url, reqParams, headers)
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
        console.log('조회 실패',ex)
      })
    },

    clickToSearchDetailObject: function(values){
      if(values) {
        this.showDetailObject = true
        this.isReloadDetailObject = true

        var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13002/get_user_detail`

        var params = {
          said: values,
          page_no: '1',
          view_cnt: '5'
        }
      
        axios.post(url, params, headers)
        .then((response) => {
           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data.user_detail_list[0]
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
    clickToSearchKTT: function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13003/get_user_ktt_info_list`
    var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
    }
    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(resCode)
          if(resCode == 200){
            this.kList = response.data.data.ktt_info_list;
            this.resPagingInfo = response.data.data.paging_info

            this.showKttList =!this.showKttList
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
    clickToSearchProdSummary: function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13005/get_prod_summary_list`
    var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
    }
    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.psList = response.data.data.prod_summary_list;
            this.resPagingInfo = response.data.data.paging_info
            this.showProdSummaryList =!this.showProdSummaryList
          }else{
            this.psList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })

    },

    clickToSearchVACount: function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13006/get_user_va_list`
      var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.vaList=response.data.data.va_prod_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showVACountList=!this.showVACountList
            }else{
              this.vaList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })

    },

    clickToSearchSensorOrder:function(){
     var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13007/get_sensor_status_list`
     
     var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.soList=response.data.data.sensor_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showSensorOrderList=!this.showSensorOrderList
              console.log('resCode')
              console.log(resCode)
            }else{
               console.log('resCode')
              console.log(resCode)
              this.soList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },

    clickToSearchDeviceCamera:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13008/get_cam_list`

      var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dcList=response.data.data.cam_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showDeviceCameraList=!this.showDeviceCameraList
            }else{
              this.dcList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },

    clickToSearchIotGw:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13009/get_iotgw_list`

      var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.iotList=response.data.data.iotgw_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showIotGwList=!this.showIotGwList
            }else{
              this.iotList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },

    clickToSearchDeviceSensor:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13010/get_sensor_list`
      
      var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dsList=response.data.data.sensor_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showDeviceSensorList=!this.showDeviceSensorList
            }else{
              this.dsList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },
    clickToSearchPhone:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13004/get_user_tel_list`

      var params={
      user_id: this.pObject.user_id,
      page_no: '1',
      view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.pnList=response.data.data.tel_no_list;
              this.resPagingInfo=response.data.data.paging_info
              this.showPhoneList=!this.showPhoneList
            }else{
              this.pnList=[];
              this.resPagingInfo={};
              alert(resCode + " / "+ resMsg);
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },

    setToSearchParams: function(values){

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      this.searchToStoreInfo(params)
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

      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }
      if(params.user_name !== undefined && params.user_name !== ''){
        newParams.user_name = params.user_name
      }
      if(params.tel_no !== undefined && params.tel_no !== ''){
        newParams.tel_no = params.tel_no
      }

      return newParams
    }
  }
};
</script>

<style scoped>
</style>