<template>
  <v-container fluid>
    <v-card>
      <term-order-info-query 
        v-on:search="searchSaid"
        v-bind:param=searchParam
      ></term-order-info-query>

      <!-- ## 오더 정보 사용자 청약 오더 정보 -->
      <user-order-info-list v-bind:uoiList=uoiList v-bind:resPagingInfo=resPagingInfo></user-order-info-list>

      <!-- ## 오더 상세 오더 처리 결과 -->  
      <user-order-detail-list v-bind:odList=odList v-bind:dodPagingInfo=dodPagingInfo></user-order-detail-list>

      <!-- updateType 화면 -->
      <pre-update-type v-bind:putList=putList ></pre-update-type>

      <!-- 청약 전화번호 -->      
      <user-order-phone-list v-bind:phList=phList v-bind:phPagingInfo=phPagingInfo></user-order-phone-list>
      <!-- KTT 정보 -->
      <ktt-list v-bind:kttList=kttList v-bind:kttPagingInfo=kttPagingInfo></ktt-list>

      <!-- 청약 결과 -->
      <user-order-result-list v-bind:pList=uorList v-bind:resPagingInfo=resPagingInfo></user-order-result-list>

      <!-- 로그인 관련:: 사용자-매장-전화번호-카메라 ONM_13001 -->
      <store-info-list v-bind:pList=siList v-bind:resPagingInfo="resPagingInfo"></store-info-list>

      <!-- 사용자정보 -->
      <store-detail-info-list v-bind:pList=sdiList v-bind:resPagingInfo=resPagingInfo></store-detail-info-list>

      <!-- 사용자-KTT정보 -->
      <user-ktt-info-list v-bind:kList=kList v-bind:kttPagingInfo=kttPagingInfo></user-ktt-info-list>

      <!-- 사용자상품정보 ONM-13002 확인 필요-->
      <store-product-info v-bind:pList=spiList v-bind:resPagingInfo=spiPagingInfo></store-product-info>

      <!-- 상품 요약정보 ONM_13005 -->
      <store-product-summary-info-list v-bind:psList=psList v-bind:psPagingInfo=psPagingInfo></store-product-summary-info-list>

      <!-- 사용자 전화번호 ONM_13004 -->
      <user-phone-info v-bind:pnList=upiList v-bind:resPagingInfo=upiPagingInfo></user-phone-info>

      <!-- 사용자 VA 상품 및 적용카메라 대수 등록 확인 -->
      <va-cam-count-list v-bind:vaList=vaList v-bind:vaPagingInfo=vaPagingInfo></va-cam-count-list>

      <!-- 사용자 센서 신청 현황 -->
      <user-sensor-order v-bind:soList=soList v-bind:soPagingInfo=soPagingInfo></user-sensor-order>
      <!-- 스냅샷 정보 -->
      <snapshot v-bind:pList=snList v-bind:snPagingInfo=snPagingInfo></snapshot>
    
      <!-- 연결된 IoT GW정보 -->
      <connected-iot-gw-list v-bind:iotList=iotList v-bind:iotPagingInfo=iotPagingInfo></connected-iot-gw-list>

      <!-- 연결된 Sensor 정보 -->
      <connected-sensor-info-list v-bind:dsList=dsList v-bind:dsPagingInfo=dsPagingInfo></connected-sensor-info-list>

      <!-- 카메라 그룹정보 12월 개발 예정 -->
      <camera-group-info v-bind:pList=cgiList v-bind:resPagingInfo=cgiPagingInfo></camera-group-info>

      <!-- 연결된 캠, 모델, 제조사 조회, 캠상태 -->
      <connected-camera-info v-bind:pList=dcList v-bind:resPagingInfo=dcPagingInfo></connected-camera-info>
      <!-- 단말오더 -->
      <device-order-info v-bind:pList=doiList v-bind:doiPagingInfo=doiPagingInfo></device-order-info>
      <!-- 단말오더 updateType -->
      <update-type v-bind:pList=doutList v-bind:resPagingInfo=doutPagingInfo></update-type>
      <!-- 단말오더 subline 정보 -->
      <device-order-subline-info v-bind:pList=dosuList v-bind:resPagingInfo=dosuPagingInfo></device-order-subline-info>

      <!-- 단말오더 처리결과 확인 -->
      <device-order-result-list v-bind:dorList=dorList v-bind:dorPagingInfo=dorPagingInfo></device-order-result-list>

      <!-- 인증 대상단말 정보 확인 -->
      <auth-target-device-list v-bind:authList=authList v-bind:authPagingInfo=authPagingInfo></auth-target-device-list>

      <!-- 단말 subline 정보 확인 -->
      <confirmed-device-subline-info v-bind:pList=dsubList v-bind:resPagingInfo=dsubPagingnfo></confirmed-device-subline-info>

      <!-- Snapshot 확인 -->
      <confirmed-device-order-snapshot v-bind:pList=dosList v-bind:resPagingInfo=dosPagingnfo></confirmed-device-order-snapshot>

      <!-- TEMP ID 오더확인 -->
      <confirmed-temp-id-order v-bind:pList=tmoList v-bind:resPagingInfo=tmoPagingnfo></confirmed-temp-id-order>

      <!-- TEMP ID 확인 -->
      <confirmed-temp-id v-bind:pList=tmList v-bind:resPagingInfo=tmPagingnfo></confirmed-temp-id>

      </v-card>
    </v-container>
</template>

<script>
//subsinfo 검색
import TermOrderInfoQuery from './subsinfo/termOrderInfoQuery'

//오더 정보
import UserOrderInfoList from './subsinfo/userOrderInfoList'
//오더 상세
import UserOrderDetailList from './subsinfo/userOrderDetailList'
//updateType 
import PreUpdateType from './subsinfo/preUpdateType'

//청약 전화번호
import UserOrderPhoneList from './subsinfo/userOrderPhoneList'
//KTT 정보
import KttList from './subsinfo/kttOrderInfoList'
//청약 결과
import UserOrderResultList from './subsinfo/userOrderResultList'

//로그인 관련:: 사용자-매장-전화번호-카메라(매장정보:ONM_13001)
import StoreInfoList from './subsinfo/storeInfoList'
//사용자정보 (=매장정보상세:ONM_13002)
import StoreDetailInfoList from './subsinfo/storeDetailInfoList'
//사용자-KTT 정보
import UserKttInfoList from './subsinfo/userKttInfoList'

//사용자상품정보 ONM-13002 확인 필요(신규)
import StoreProductInfo from './subsinfo/storeProductInfo'

//상품 요약정보 ONM_13005
import StoreProductSummaryInfoList from './subsinfo/storeProductSummaryInfoList'

//사용자 전화번호 ONM_13004
import UserPhoneInfo from './subsinfo/userPhoneInfo'

//사용자 VA 상품 및 적용카메라 대수 등록 확인
import VaCamCountList from './subsinfo/vaCamCountList'

//사용자 센서 신청 현황 (신규)
import UserSensorOrder from './subsinfo/userSensorOrderInfo'
//스냅샷 정보
import Snapshot from './subsinfo/snapshot'

//연결된 IoT GW정보
import ConnectedIotGwList from './subsinfo/connectedIotGwInfo'

//연결된 Sensor 정보
import ConnectedSensorInfoList from './subsinfo/connectedSensorInfo'

//카메라 그룹정보 (12월 개발 예정)
import CameraGroupInfo from './subsinfo/cameraGroupInfo'

//연결된 캠, 모델, 제조사 조회, 캠상태(신규)
import ConnectedCameraInfo from './subsinfo/connectedCameraInfo'

//단말오더 정보 확인(신규)
import DeviceOrderInfo from './subsinfo/deviceOrderInfo'
//updateType(신규)
import UpdateType from './subsinfo/updateType'
//단말오더 subline 정보
import DeviceOrderSublineInfo from './subsinfo/deviceOrderSublineInfo'

//단말오더 처리결과 확인
import DeviceOrderResultList from './subsinfo/deviceOrderResultList'

//인증 대상단말 정보 확인
import AuthTargetDeviceList from './subsinfo/authTargetDeviceList'

//단말 subline 정보 확인
import ConfirmedDeviceSublineInfo from './subsinfo/confirmedDeviceSublineInfo' 
//Snapshot 확인
import ConfirmedDeviceOrderSnapshot from './subsinfo/confirmedDeviceOrderSnapshot'
//TEMP ID 오더확인
import ConfirmedTempIdOrder from './subsinfo/confirmedTempIdOrder'
//TEMP ID 확인
import ConfirmedTempId from './subsinfo/confirmedTempId'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    TermOrderInfoQuery,
    UserOrderInfoList,
    UserOrderDetailList,
    PreUpdateType,
    UserOrderPhoneList,
    KttList,
    UserOrderResultList,
    StoreInfoList,
    StoreDetailInfoList,
    UserKttInfoList,

    //사용자상품정보(신규)
    StoreProductInfo,

    StoreProductSummaryInfoList,
    UserPhoneInfo,
    VaCamCountList,

    //사용자 센서 신청 현황,
    UserSensorOrder,
    //스냅샷,
    Snapshot,

    ConnectedIotGwList,
    ConnectedSensorInfoList,
    CameraGroupInfo,

    //연결된 캠, 모델, 제조사 조회, 캠상태
    ConnectedCameraInfo,
    //단말오더 정보 확인
    DeviceOrderInfo,
    //updateType
    UpdateType,
    //단말오더 subline 정보
    DeviceOrderSublineInfo,

    DeviceOrderResultList,
    AuthTargetDeviceList,

    //단말 subline 정보 확인
    ConfirmedDeviceSublineInfo,
    //Snapshot 확인
    ConfirmedDeviceOrderSnapshot,
    //TEMP ID 오더확인
    ConfirmedTempIdOrder,
    //TEMP ID 확인
    ConfirmedTempId,
  
  },
  data () {
    return {
      // title: '사용자 청약 오더 정보',
      pList: [],
      uoiList:[],
      odList: [],
      putList: [], // pre updateType res
      uorList: [],
    //   pObject: {        
    //   },
      pSaid: '',
      pGuid: '',
      pUserid: '',
      showDetailObject: false,
      isReloadDetailObject: false,
    //   btnTitle: '청약오더상세open',
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 100
      },

      default_page_no: 1,
      default_view_cnt: 100,

    //   title2: '사용자 청약오더 List',
      sdList:[],
    // showSubDetailList:false,
    //   btnTitle2: '사용자 청약오더List open',

      // title3: '사용자-KTT 정보 조회',
      kttList:[],
      // showKttList:false,
      // btnTitle3: '사용자-KTT open',
      
      // title4: '사용자 청약 전화번호',
      phList:[],
      // showUserOrderPhone:false,
      // btnTitle4: '사용자 청약 전화번호 조회',
      siList: [], //로그인 관련:: 사용자-매장-전화번호-카메라 ONM_13001
      sdiList: [], //사용자정보

      // title5: '인증 대상 단말',
      authList:[],
      showAuthDevice:false,
      btnTitle5: '인증 대상 단말',
      
      title6: '단말오더 처리결과',
      dorList:[],
      showDeviceOrderResult:false,
      btnTitle6: '단말오더 처리결과',

      // title7: '사용자 ktt정보 ',
      kList: [],
      // showKttInfoList:false,
      // btnTitle7: '사용자 ktt 정보',
      spiList: [],
      // title8: '상품 요약정보 ',
      psList: [], //상품 요약정보
      // showStoreProductSummaryInfo:false,
      // btnTitle8: '상품 요약정보',

      pnList: [], //사용자 전화번호

      soList: [], //사용자 센서 신청현황
      snList: [], //스냅샷 정보

      // title9: '사용자별 센서 신청 현황',
      vaList: [],
      // showVaCamCountList:false,
      // btnTitle9: '사용자별 센서 신청 현황',

      // title10: '카메라정보',
      dcList: [],
      // showCameraInfoList:false,
      // btnTitle10: '카메라정보',

      // title11: 'IOT GW',
      iotList: [],  //연결된 iot gw 정보
      // showConnectedIotGwList:false,
      // btnTitle11: 'IOT GW',

      // title12: 'Sensor 정보',
      dsList: [], //연결된 Sensor 정보
      // showConnectedSensorInfoList:false,
      // btnTitle12: 'Sensor 정보',
      dsubList: [],
      dosList: [],

      tmoList: [],
      tmList: [],
      cgiList: [],
      doiList: [],
      doutList: [],
      dosuList: [],
   
      resPagingInfo: {},
      kttPagingInfo:{},
      phPagingInfo:{},
      authPagingInfo:{},
      dorPagingInfo:{},
      psPagingInfo: {},
      vaPagingInfo:{},
      dcPagingInfo: {},
      iotPagingInfo: {},
      dsPagingInfo: {},
      dodPagingInfo: {},
      spiPagingInfo: {},
      upiPagingInfo: {},
      soPagingInfo: {}, //사용자 센서 신청
      snPagingInfo: {}, //스냅샷
      dsubPagingnfo: {},
      dosPagingnfo: {},
      tmoPagingnfo: {},
      tmPagingnfo: {},
      cgiPagingInfo: {},
      doiPagingInfo: {},
      doutPagingInfo: {},
      dosuPagingInfo: {},

      oldValue:'',

      searchParam: {
        said: '',
        is_masking:'',
        page_no: 1,
        view_cnt: ''
      }
    }
  },

  methods: {

      searchSaid: function(params){
              console.log('검색값'+params)
              //사용자오더 정보 api 호출
              this.searchToUserOrderInfo(params)
              //오더상세
              this.SearchToUserOrderDetailList(params)
              //updateType api 호출
              this.searchToUserOrderUpdateType(params)
              //청약 전화번호 api 호출
              this.searchToUserOrderPhone(params)
              // KTT 정보 (12월 개발예정)
              this.clickToSearchKTT(params)
              // 청약 결과 ONM_12011/get_user_subs_result_list
              this.searchToUserOrderResult(params)
              //로그인 관련:: 사용자-매장-전화번호-카메라(매장정보:ONM_13001)
              this.searchToStoreInfo(params)
              //사용자정보 (=매장정보상세:ONM_13002)
              this.searchToStoreDetailInfo(params)
              //사용자상품정보 ONM-15039 확인 필요
              this.searchToStoreProductInfo(params)
              //상품 요약정보
              this.searchToStoreProductSummaryInfo(params)
              //사용자 전화번호
              this.searchToUserPhone(params)
              //사용자 VA 상품 및 적용카메라 대수 등록 확인
              this.searchToVaCamCount(params)
              // 사용자 센서 신청 현황
              this.searchUserSensorOrderInfo(params)
              //스냅샷 정보
              this.searchToSnapshotInfo(params)
              //연결된 IoT GW정보
              this.searchToConnectedIotGWInfo(params)
              //연결된 Sensor 정보
              this.searchToConnectedSensorInfo(params)

              //카메라 그룹정보
              this.searchToCameraGroupInfo(params)

              //연결된 캠, 모델, 제조사 조회, 캠상태
              this.searchToConnectedCameraInfo(params)

              //단말오더 정보 확인(ONM_12006, 12007)
              this.searchToDeviceOrderInfo(params)

              //단말오더 updateType
              this.searchToDeviceOrderUpdateType(params)

              //단말오더 subline 정보
              this.searchToDeviceOrderSubline(params)

              //단말오더 처리결과 확인
              this.searchToDeviceOrderResult(params)
              //인증 대상단말 정보 확인
              this.searchToAuthTargetDevice(params)
              //단말 subline 정보 확인(ONM_15035)
              this.searchToDeviceSubline(params)
              //단말오더 Snapshot 확인(onm_15038)
              this.searchToDeviceOrderSnapshot(params)

              //TEMP ID 오더확인
              this.searchToTempIdOrder(params)

              //TEMP ID 확인
              this.searchToTempId(params)
  },

    // 오더정보 : ONM_12001/get_user_subs_order_info
    searchToUserOrderInfo: function(params){
      // this.showDetailObject=false
      // this.isReloadDetailObject=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`
  
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      
      console.log(reqParams)

      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code; 
        var resMsg = response.data.res_msg;
        // this.is_masking = reqParams.is_masking;
        // this.said = reqParams.said;

        if(resCode == 200){
          this.uoiList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info
          console.log('테스트')
          console.log(this.uoiList)
        }else if(resCode==204){
          this.uoiList = [];
          this.resPagingInfo = {};
          //alert("사용자 청약 오더 정보 데이터가 없습니다.");
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => {console.log(res.status)})
            .catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.uoiList = [];
          this.resPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    // 오더 상세 리스트로 대체 ONM_12002 -> ONM_12010    
    // 오더 상세 : ONM_12010/get_subs_details_list
    SearchToUserOrderDetailList: function(params){

        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12010/get_subs_details_list`
        
          var reqParams = this.handleParams(params)
          axios.post(url, reqParams, headers)
          .then((response) => {
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              console.log('테스트2'+response)
              this.odList = response.data.data.order_detail_list;     
              this.dodPagingInfo = response.data.data.paging_info              
            }else if(resCode==204){
              this.odList = [];
            }else{
              this.odList = [];
              console(resCode + " / " + resMsg);
              }
          })
          .catch((ex) => {
            console.log('조회 실패',ex)
          })

    },
    

    // updateType 화면 조회
    searchToUserOrderUpdateType: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15037/get_bss_updatetype`

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
            this.putList = response.data.data.list;
            // this.dodPagingInfo = response.data.data.paging_info  
            // this.phPagingInfo = response.data.data.paging_info
          }else if(resCode==204){
              this.putList = [];
              // this.phPagingInfo = {};
          }else if(resCode==410){
            // console.log("로그인 세션이 만료되었습니다.");
            this.putList = [];
            // EventBus.$emit('top-path-logout');
            //   this.$store
            //   .dispatch("LOGOUT")
            //   .then( res => { 
            //   console.log(res.status)}).catch(({ message }) => (this.msg = message))
            //   this.$router.replace('/signin')
            //   this.showUserOrderPhone=false;
          }else{
            this.putList = [];
            // this.phPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    // 청약 전화번호
    searchToUserOrderPhone: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`

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
          this.phList = response.data.data.tel_no_list;
          this.phPagingInfo = response.data.data.paging_info
          // this.showUserOrderPhone=!this.showUserOrderPhone;
        }else if(resCode==204){
            this.phList = [];
            this.phPagingInfo = {};
            // this.showUserOrderPhone=!this.showUserOrderPhone;
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
            // this.showUserOrderPhone=false;
        }else{
          this.phList = [];
          this.phPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      // }
    },

    // KTT 정보 (12월 개발예정)
    clickToSearchKTT: function(params){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12005/get_user_ktt_subs`

    var reqParams = this.handleParams(params) 
    axios.post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code
          var resMsg = response.data.res_msg
          // console.log(resCode)
          if(resCode == 200){
            this.kttList = response.data.data.list
            this.kttPagingInfo = response.data.data.paging_info
            // this.showKttList =!this.showKttList
          }else if(resCode==204){
            this.kttList = [];
            // this.showKttList=!this.showKttList
          }else{
            this.kttList = [];
            console.log(resCode + " / " + resMsg)
            this.showKttList=false
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
          
        })
    },

    // 청약 결과 ONM_12011/get_user_subs_result_list
    searchToUserOrderResult: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12011/get_user_subs_result_list`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      

      // console.log(reqParams)
      // if(!reqParams.start_date&&!reqParams.said&&!reqParams.guid){
      //   this.$fire({
      //         title: "검색값을 입력해주세요.",
      //         type: "error"})
      // }else{
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.uorList = response.data.data.subs_result_list
          this.resPagingInfo = response.data.data.paging_info

        }else if(resCode==204){
            this.uorList = [];
            this.resPagingInfo = {};
            console.log("사용자 청약 오더 처리 결과 데이터가 없습니다.");
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.uorList = [];
          this.resPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      // }
    },

    //로그인 관련:: 사용자-매장-전화번호-카메라(매장정보:ONM_13001)
    searchToStoreInfo: function (params) {
      // this.showDetailObject=false
      // this.isReloadDetailObject=false
      console.log("searchToStoreInfo")
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13001/get_user_list`;

      var reqParams = this.handleParams(params);
      // console.log(reqParams)
      // if(!reqParams.start_date&&!reqParams.said&&!reqParams.user_name&&!reqParams.user_id&&!reqParams.tel_no){
      //        this.$fire({
      //         title: "검색값을 입력해주세요.",
      //         type: "error"})
      // }else{
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          // console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.siList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info;
            this.searchKTTInfo()
          }else if(resCode==204){
            this.siList = [];
            this.resPagingInfo = {};
            console.log('매장정보 조회 데이터가 없습니다.');
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.siList = [];
            this.resPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      // }
    },
 
    //사용자정보 (=매장정보상세:ONM_13002)
    searchToStoreDetailInfo: function (params) {
      // this.showDetailObject=false
      // this.isReloadDetailObject=false
      console.log("searchToStoreDetailInfo")
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13002/get_user_detail`;

      var reqParams = this.handleParams(params);
      // console.log(reqParams)
      // if(!reqParams.start_date&&!reqParams.said&&!reqParams.user_name&&!reqParams.user_id&&!reqParams.tel_no){
      //        this.$fire({
      //         title: "검색값을 입력해주세요.",
      //         type: "error"})
      // }else{
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.sdiList = response.data.data.user_detail_list;
            this.resPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
            this.sdiList = [];
            this.resPagingInfo = {};
            console.log('매장정보 조회 데이터가 없습니다.');
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.sdiList = [];
            this.resPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      // }
    },

    
    //사용자-KTT 정보
    searchKTTInfo: function (params) {
      // this.pUserid = this.siList[0].user_id
      // var params ={
      //     user_id: this.siList[0].user_id
      // }
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13003/get_user_ktt_info_list`

      var reqParams=this.handleParams(params)

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.kList = response.data.data.ktt_info_list;
          this.kttPagingInfo = response.data.data.paging_info
          // this.showKttInfoList =! this.showKttInfoList
        }else if(resCode==204){
          this.kList = [];
          this.kttPagingInfo = {};
          // this.showKttInfoList =! this.showKttInfoList
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.kList = [];
          this.kttPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      .finally(function(){})
    
    },

    //사용자상품정보 ONM-15039 확인 필요(신규api)
    searchToStoreProductInfo: function (params) {
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15039/get_user_prod_list`

      var reqParams=this.handleParams(params)  

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.spiList = response.data.data.list;
          this.spiPagingInfo = response.data.data.paging_info;
          // this.showStoreProductSummaryInfo =! this.showStoreProductSummaryInfo
   
        }else if(resCode==204){
          this.spiList = [];
          this.spiPagingInfo = {};
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.spiList = [];
          this.spiPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
  
    },

    //상품 요약정보
    searchToStoreProductSummaryInfo: function (params) {  
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13005/get_prod_summary_list`

      var reqParams=this.handleParams(params)
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.psList = response.data.data.prod_summary_list;
          this.psPagingInfo = response.data.data.paging_info;
          // this.showStoreProductSummaryInfo =! this.showStoreProductSummaryInfo
   
        }else if(resCode==204){
          this.psList = [];
          this.psPagingInfo = {};
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.psList = [];
          this.psPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
  
    },

    //사용자 전화번호
    searchToUserPhone: function (params) {
      console.log('searchToUserPhone')
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13004/get_user_tel_list`;

      axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.upiList = response.data.data.tel_no_list;
            this.upiPagingInfo = response.data.data.paging_info;
            // this.showPhoneList = !this.showPhoneList;
          } else if(resCode==204){
            this.upiList = [];
            console.log('사용자 전화번호 데이터가 없습니다.');
          } else {
            this.upiList = [];
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    //사용자 VA 상품 및 적용카메라 대수 등록 확인
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
          // this.showVaCamCountList =! this.showVaCamCountList;
        }else if(resCode==204){
          this.vaList = [];
          this.vaPagingInfo = {};
          console.log('VA 상품 및 카메라 대수 확인');
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.vaList = [];
          this.vaPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    // 사용자 센서 신청 현황
    searchUserSensorOrderInfo: function (params) {   
      console.log('searchUserSensorOrderInfo')
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13007/get_sensor_status_list`

      var reqParams=this.handleParams(params)
    
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.soList = response.data.data.sensor_list;
          this.soPagingInfo = response.data.data.paging_info
    
        }else if(resCode==204){
          this.soList = [];
          this.soPagingInfo = {};
          console.log('센서 신청 현황 데이터가 없습니다.');
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.soList = [];
          this.soPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //스냅샷 정보
    searchToSnapshotInfo: function (params) {   
      console.log('searchToSnapshotInfo')
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15036/get_bss_snapshot_list`

      var reqParams=this.handleParams(params)
    
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.snList = response.data.data.list;
          this.snPagingInfo = response.data.data.paging_info
    
        }else if(resCode==204){
          this.snList = [];
          this.snPagingInfo = {};
          console.log('센서 신청 현황 데이터가 없습니다.');
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.snList = [];
          this.snPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //연결된 IoT GW정보
    searchToConnectedIotGWInfo: function (params) {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13009/get_iotgw_list`;

      var reqParams = this.handleParams(params);

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response);
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.iotList = response.data.data.iotgw_list;
          this.iotPagingInfo = response.data.data.paging_info;
          // this.showConnectedIotGwList =!this.showConnectedIotGwList;
        }else if(resCode==204){
          this.iotList = [];
          this.iotPagingInfo = {};
          // this.showConnectedIotGwList =!this.showConnectedIotGwList;
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else {
          this.iotList = [];
          this.iotPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
      
    },

    //연결된 Sensor 정보
    searchToConnectedSensorInfo: function (params) {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13010/get_sensor_list`;

      var reqParams = this.handleParams(params)
  
      axios.post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.dsList = response.data.data.sensor_list;
            this.dsPagingInfo = response.data.data.paging_info;
            this.showConnectedSensorInfoList =!this.showConnectedSensorInfoList;
          }else if(resCode==204){
            this.dsList = [];
            this.dsPagingInfo = {};
            this.showConnectedSensorInfoList =!this.showConnectedSensorInfoList;
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else {
            this.dsList = [];
            this.dsPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //카메라 그룹정보(12월 개발 예정)
    searchToCameraGroupInfo: function (params) {
      // 12월 개발된 api 로 변경 필요
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15047/get_cam_group_info`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.cgiList = response.data.data.cam_group_list;
            this.cgiPagingInfo = response.data.data.paging_info;
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.cgiList = [];
            this.cgiPagingInfo = {};
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.cgiList = [];
            this.cgiPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //연결된 캠, 모델, 제조사 조회, 캠상태
    searchToConnectedCameraInfo: function (params) {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13008/get_cam_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.dcList = response.data.data.cam_list;
            this.dcPagingInfo = response.data.data.paging_info;
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.dcList = [];
            this.dcPagingInfo = {};
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.dcList = [];
            this.dcPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //단말오더 정보 확인(ONM_12006, 12007, 12월개발)
    searchToDeviceOrderInfo: function (params) {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12008/get_device_order_detail_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.doiList = response.data.data.list;
            this.doiPagingInfo = response.data.data.paging_info;
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.doiList = [];
            this.doiPagingInfo = {};
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.doiList = [];
            this.doiPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //단말오더 updateType (12월 신규 개발)
    searchToDeviceOrderUpdateType: function (params) {
      // 12월개발 후 api 변경해야함
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15042/get_oss_updatetype`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.doutList = response.data.data.list;
            this.doutPagingInfo = response.data.data.paging_info;
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.doutList = [];
            this.doutPagingInfo = {};
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.doutList = [];
            this.doutPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //단말오더 subline 정보(12월)
    searchToDeviceOrderSubline: function (params) {
      // 12월개발 후 api 변경해야함
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15043/get_oss_subline_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if (resCode == 200) {
            this.dosuList = response.data.data.list;
            this.dosuPagingInfo = response.data.data.paging_info;
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.dosuList = [];
            this.dosuPagingInfo = {};
            // this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.dosuList = [];
            this.dosuPagingInfo = {};
            console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

    //단말오더 처리결과 확인
    searchToDeviceOrderResult: function(params){
      console.log('searchToDeviceOrderResult')
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12012/get_device_order_result_list`
      // var params = {
      //     guid: this.pGuid,
      //   }

      var reqParams = this.handleParams(params) 
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          console.log(response.data.data.device_order_result_list);
          this.dorList = response.data.data.device_order_result_list;
          this.dorPagingInfo=response.data.data.paging_info;
          // this.showDeviceOrderResult =!this.showDeviceOrderResult
  
        }else if(resCode==204){
          this.dorList = [];
          this.dorPagingInfo={};
          // this.showDeviceOrderResult =!this.showDeviceOrderResult
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.dorList = [];
          this.dorPagingInfo={};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },
   
    //인증 대상단말 정보 확인
    searchToAuthTargetDevice: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12009/get_auth_device_list`

      var reqParams = this.handleParams(params) 
      axios.post(url,  reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.authList = response.data.data.auth_device_list
          this.authPagingnfo=response.data.data.paging_info
          // this.showAuthDevice=!this.showAuthDevice          
        }else if(resCode==204){
          this.authList = [];
          this.authPaingInfo={};
          // this.showAuthDevice=!this.showAuthDevice
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.")
          EventBus.$emit('top-path-logout')
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.authList = []
          this.authPaingInfo={}
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //단말 subline 정보 확인(ONM_15035)
    searchToDeviceSubline: function(params){
      console.log('searchToDeviceSubline')
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15035/get_term_subline_list`

      var reqParams = this.handleParams(params) 
      axios.post(url,  reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.dsubList = response.data.data.list
          this.dsubPagingnfo=response.data.data.paging_info
          // this.showAuthDevice=!this.showAuthDevice          
        }else if(resCode==204){
          this.dsubList = [];
          this.dsubPagingnfo={};
          // this.showAuthDevice=!this.showAuthDevice
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.")
          EventBus.$emit('top-path-logout')
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.dsubList = []
          this.dsubPagingnfo={}
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //단말오더 Snapshot 확인(onm_15038)
    searchToDeviceOrderSnapshot: function(params){
      console.log('searchToDeviceOrderSnapshot')
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15038/get_oss_snapshot_list`

      var reqParams = this.handleParams(params) 
      axios.post(url,  reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.dosList = response.data.data.list
          this.dosPagingnfo=response.data.data.paging_info
          // this.showAuthDevice=!this.showAuthDevice          
        }else if(resCode==204){
          this.dosList = [];
          this.dosPagingnfo={};
          // this.showAuthDevice=!this.showAuthDevice
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.")
          EventBus.$emit('top-path-logout')
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.dosList = []
          this.dosPagingnfo={}
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //TEMP ID 오더확인(12월)
    searchToTempIdOrder: function(params){
      console.log('searchToTempIdOrder')

      //12월 개발 후 api 변경해야함
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15044/get_oss_worker_id`

      var reqParams = this.handleParams(params) 
      axios.post(url,  reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.tmoList = response.data.data.list
          this.tmoPagingnfo=response.data.data.paging_info
          // this.showAuthDevice=!this.showAuthDevice          
        }else if(resCode==204){
          this.tmoList = [];
          this.tmoPagingnfo={};
          // this.showAuthDevice=!this.showAuthDevice
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.")
          EventBus.$emit('top-path-logout')
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.tmoList = []
          this.tmoPagingnfo={}
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    //TEMP ID 확인(12월)
    searchToTempId: function(params){
      console.log('searchToTempId')
      
      //12월 개발 후 api 변경 필요
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15045/get_worker_id_info`

      var reqParams = this.handleParams(params) 
      axios.post(url,  reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code
        var resMsg = response.data.res_msg
        if(resCode == 200){
          this.tmList = response.data.data.list
          this.tmPagingnfo=response.data.data.paging_info
          // this.showAuthDevice=!this.showAuthDevice          
        }else if(resCode==204){
          this.tmList = [];
          this.tmPagingnfo={};
          // this.showAuthDevice=!this.showAuthDevice
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.")
          EventBus.$emit('top-path-logout')
          this.$store
          .dispatch("LOGOUT")
          .then( res => { 
          console.log(res.status)}).catch(({ message }) => (this.msg = message))
          this.$router.replace('/signin')
        }else{
          this.tmList = []
          this.tmPagingnfo={}
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },

    // 파라미터 설정
    handleParams: function(params){
      let newParams = {}
      if(params.page_no === undefined || params.page_no === ''){
        newParams.page_no = this.reqPagingInfo.page_no
      }else{
        newParams.page_no = params.page_no
      }
     
      if(params.view_cnt === undefined || params.view_cnt === ''){
        newParams.view_cnt = this.searchParam.view_cnt
      }else{
        newParams.view_cnt = this.searchParam.view_cnt
      }
      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }
      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }

      if (params.said !== undefined && params.said !== "") {
        newParams.said = params.said;
      } else if (
        this.searchParam.said !== undefined &&
        this.searchParam.said !== ""
      ) {
        newParams.said = this.searchParam.said;
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
  }
}
</script>

<style scoped>

</style>