<template>
    <v-container fluid>
      <v-card>
        <term-order-info-query 
          v-on:search="searchToUserOrderInfo"
          v-bind:param=searchParam
        ></term-order-info-query>
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

          <v-btn
           v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="clickToSearchSubDetailList()">
            사용자 청약오더List / 전체 호출{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="clickToSearchKTT()" >
            사용자-KTT{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToUserOrderPhone()" >
            사용자 청약 전화번호{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToAuthTargetDevice()" >
            인증대상 단말 정보 확인{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToDeviceOrderResult()" >
            단말 오더 처리결과 확인{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchKTTInfo()" >
            사용자 ktt정보{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToStoreProductSummaryInfo()" >
            상품 요약정보{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToVaCamCount()" >
            사용자별 센서 신청 현황{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToCameraInfo()" >
            카메라정보{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToIotGWInfo()" >
            IOT GW{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="searchToSensorInfo()" >
            Sensor 정보{{showSubDetailList?" Close":" Open"}}
          </v-btn>
        </v-container>

      <user-order-detail-object v-if=showDetailObject v-bind:pObject=pObject></user-order-detail-object>
      
      <v-container
        id="regular-tables"
        fluid 
        tag="section"
        v-if=showDetailObject>
        <v-row>
          <v-col>
            <user-order-sub-detail-list  
              v-if=showSubDetailList
              v-bind:sdList=sdList >
            </user-order-sub-detail-list>
          </v-col>
     
          <v-col>
            <ktt-list 
              v-if=showSubDetailList
              v-bind:kttList=kttList
            ></ktt-list>
          </v-col>
    
          <v-col>
            <user-order-phone-list
              v-if=showSubDetailList 
              v-bind:phList=phList
              v-bind:phPagingInfo=phPagingInfo
            ></user-order-phone-list>
          </v-col>

         <v-col>
          <auth-target-device-list
            v-if=showSubDetailList
            v-bind:authList=authList
            v-bind:authPagingInfo=authPagingInfo
          >
          </auth-target-device-list>
         </v-col>

          <v-col>
            <device-order-result-list
              v-if=showSubDetailList
              v-bind:dorList=dorList
              v-bind:dorPagingInfo=dorPagingInfo
            >
            </device-order-result-list>
          </v-col>

          <v-col>
            <ktt-info-list
              v-if=showSubDetailList
              v-bind:kList=kList
              v-bind:kttPagingInfo="kttPagingInfo"
            >
            </ktt-info-list>
          </v-col>

          <v-col>
            <store-product-summary-info-list
              v-if=showSubDetailList
              v-bind:psList=psList
              v-bind:psPagingInfo=psPagingInfo
            >
            </store-product-summary-info-list>
          </v-col>

          <v-col>
            <va-cam-count-list
              v-if=showSubDetailList
              v-bind:vaList=vaList
              v-bind:vaPagingInfo=vaPagingInfo
            >
            </va-cam-count-list>
          </v-col>

          <v-col>
            <camera-info-list
            v-if=showSubDetailList
            v-bind:dcList=dcList
            v-bind:dcPagingInfo=dcPagingInfo
            >
            </camera-info-list>
          </v-col>
          
          <v-col>
            <iot-gw-list
              v-if=showSubDetailList
              v-bind:iotList=iotList
              v-bind:iotPagingInfo=iotPagingInfo
            >
            </iot-gw-list>
          </v-col>

          <v-col>
            <sensor-info-list
                v-if=showSubDetailList
                v-bind:dsList=dsList
                v-bind:dsPagingInfo=dsPagingInfo
            >
            </sensor-info-list>
          </v-col>
        </v-row>

      </v-container>
      </v-card>
    </v-container>
</template>

<script>
import UserOrderInfoList from '../../order/user/order-info/userOrderInfoList'
import TermOrderInfoQuery from './termOrderInfoQuery'
import UserOrderDetailObject from '../../order/user/order-detail/userOrderDetailObject'
import UserOrderSubDetailList from '../../order/user/order-detail/userOrderSubDetailList'
import KttList from '../../../dashboard/order/ktt-order/kttOrderInfoList.vue'
import UserOrderPhoneList from '../../order/user-order-phone/userOrderPhoneList'
import AuthTargetDeviceList from '../../order/auth-target-device/authTargetDeviceList'
import DeviceOrderResultList from '../../order/device-order-result/deviceOrderResultList'
import KttInfoList from '../../store/ktt/kttInfoList.vue'
import StoreProductSummaryInfoList from '../../store/product-summary/storeProductSummaryInfoList.vue'
import VaCamCountList from '../../store/va-cam-count/vaCamCountList.vue'
import CameraInfoList from '../../store/device-camera/cameraInfoList.vue'
import IotGwList from '../../store/device-iotgw/iotgwInfoList.vue'
import SensorInfoList from '../../store/device-sensor/sensorInfoList'

import EventBus from '../../../../EventBus'
import axios from "axios"


const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderInfoList,
    TermOrderInfoQuery,
    UserOrderDetailObject,
    UserOrderSubDetailList,
    KttList,
    UserOrderPhoneList,
    AuthTargetDeviceList,
    DeviceOrderResultList,
    KttInfoList,
    StoreProductSummaryInfoList,
    VaCamCountList,
    CameraInfoList,
    IotGwList,
    SensorInfoList
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
      
      title4: '사용자 청약 전화번호',
      phList:[],
      showUserOrderPhone:false,
      btnTitle4: '사용자 청약 전화번호 조회',

     title5: '인증 대상 단말',
      authList:[],
      showAuthDevice:false,
      btnTitle5: '인증 대상 단말',
      
      title6: '단말오더 처리결과',
      dorList:[],
      showDeviceOrderResult:false,
      btnTitle6: '단말오더 처리결과',

      title7: '사용자 ktt정보 ',
      kList :[],
      showKttInfoList:false,
      btnTitle7: '사용자 ktt 정보',

      title8: '상품 요약정보 ',
      psList: [],
      showStoreProductSummaryInfo:false,
      btnTitle8: '상품 요약정보',

      title9: '사용자별 센서 신청 현황',
      vaList: [],
      showVaCamCountList:false,
      btnTitle9: '사용자별 센서 신청 현황',

      title10: '카메라정보',
      dcList: [],
      showCameraInfoList:false,
      btnTitle10: '카메라정보',

      title11: 'IOT GW',
      iotList: [],
      showIotGwList:false,
      btnTitle11: 'IOT GW',

      title12: 'Sensor 정보',
      dsList: [],
      showSensorInfoList:false,
      btnTitle12: 'Sensor 정보',

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

      oldValue:'',

      searchParam: {
        said: '',
        is_masking:'',
        user_id:"",
      }
    }
  },

  methods: {
    searchToUserOrderInfo: function(params){
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`
  
      console.log(params)
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      
      // console.log('넣어지는 값')
      // console.log(reqParams)
      // if(!reqParams.said&&!reqParams.start_date&&!reqParams.guid&&!reqParams.oderno){
      //   this.$fire({
      //         title: "검색값을 입력해주세요.",
      //         type: "error"})
      // }else{
        console.log(reqParams)
        // this.said = reqParams.said
      axios.post(url, reqParams, headers)
      .then((response) => {
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        
        this.is_masking = reqParams.is_masking;
        this.said = reqParams.said;

        if(resCode == 200){
          this.pList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info
     
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("사용자 청약 오더 정보 데이터가 없습니다.");
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          // console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      // }
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
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12002/get_user_subs_detail`
        var params = {
          guid:values.guid,
          is_masking: this.searchParam.is_masking? "N" : "Y"
        }

          this.showDetailObject = !this.showDetailObject
          if(this.showDetailObject == true){

            axios.post(url, params, headers)
        .then((response) => {
           var resCode = response.data.res_code;
             
            if(resCode == 200){
              this.pObject = response.data.data
              this.isReloadDetailObject = !this.isReloadDetailObject
              console.log(this.pObject)
              this.clickToSearchSubDetailList()
            }else if(resCode==204){
              this.pObject = {};
              this.showDetailObject =  !this.showDetailObject
              this.isReloadDetailObject =  !this.isReloadDetailObject
  
            }else{
              this.pObject = {};
              this.showDetailObject = !this.showDetailObject
              this.isReloadDetailObject = !this.isReloadDetailObject
              alert("Error");
            }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
          }

    },
        
    clickToSearchSubDetailList:function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12003/get_subs_order_details_list`
    var params={
      said: this.pObject.said,
      
    }
    // this.showSubDetailList=!this.showSubDetailList;
    // if( this.showSubDetailList == true){
      this.showSubDetailList=!this.showSubDetailList;
      this.isReloadDetailObject = !this.isReloadDetailObject
      if(this.showSubDetailList == true){

        var reqParams = this.handleParams(params) 
    axios.post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          
          if(resCode == 200){
            this.sdList = response.data.data.order_detail_list;
            // this.subBtn=!this.subBtn
          }else if(resCode==204){
           this.sdList = [];
            this.showSubDetailList=!this.showSubDetailList;
          }else{
            this.sdList = [];
            this.showSubDetailList=false
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
        this.clickToSearchKTT()
        this.searchToUserOrderPhone()
        this.searchToAuthTargetDevice()
        this.searchToDeviceOrderResult()
        this.searchKTTInfo()
        this.searchToStoreProductSummaryInfo()
        this.searchToVaCamCount()
        this.searchToCameraInfo()
        this.searchToIotGWInfo()
        this.searchToSensorInfo()
      // }
      }         
    },
    searchToUserOrderPhone: function(){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`

      var params = {
        guid: this.pObject.guid,
        page_no: 1,
        view_cnt: 10,
        is_masking: this.is_masking
      }
      axios.post(url, params, headers)
      // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
      //   params
      // })

      .then((response) => {
        console.log(response.data)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          this.phList = response.data.data.tel_no_list;
          this.phPagingInfo = response.data.data.paging_info
          this.showUserOrderPhone=!this.showUserOrderPhone;
        }else if(resCode==204){
            this.phList = [];
            this.phPagingInfo = {};
            this.showUserOrderPhone=!this.showUserOrderPhone;
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
            this.showUserOrderPhone=false;
        }else{
          this.phList = [];
          this.phPagingInfo = {};
          // console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      // }
    },

    clickToSearchKTT: function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12005/get_user_ktt_subs`
    var params={
      guid: this.pObject.guid,
      is_masking: this.is_masking
    }
     var reqParams = this.handleParams(params) 
    axios.post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
         
          console.log(resCode)
          if(resCode == 200){
            this.kttList = response.data.data.list;
            this.showKttList =!this.showKttList
          }else if(resCode==204){
            this.kttList = [];
            this.showKttList=!this.showKttList
          }else{
            this.kttList = [];
            alert("Error");
            this.showKttList=false
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
          
        })
    },
    searchToAuthTargetDevice: function(){

      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12009/get_auth_device_list`
      var params = {
        said: ( this.said || this.pObject.said),
        is_masking: this.is_masking
      }
      console.log(params)
      var reqParams = this.handleParams(params) 
        axios.post(url,  reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
         
          if(resCode == 200){
            this.authList = response.data.data.auth_device_list;
            this.authPagingnfo=response.data.data.paging_info;
            this.showAuthDevice=!this.showAuthDevice;
            console.log('전달리스트')
            console.log(this.authList)
            
          }else if(resCode==204){
            this.authList = [];
            this.authPaingInfo={};
            this.showAuthDevice=!this.showAuthDevice;
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.authList = [];
            this.authPaingInfo={};
            // console.log(resCode + " / " + resMsg);
          }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },
     searchToDeviceOrderResult: function(){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12012/get_device_order_result_list`
     var params = {
      guid: this.pObject.guid,
      }
      console.log(params)
       var reqParams = this.handleParams(params) 
        axios.post(url, reqParams, headers)
        .then((response) => {
              console.log(response)
          var resCode = response.data.res_code;
          
          if(resCode == 200){
            console.log(response.data.data.device_order_result_list);
            this.dorList = response.data.data.device_order_result_list;
            this.dorPagingInfo=response.data.data.paging_info;
            this.showDeviceOrderResult =!this.showDeviceOrderResult
    
          }else if(resCode==204){
            this.dorList = [];
            this.dorPagingInfo={};
            this.showDeviceOrderResult =!this.showDeviceOrderResult
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.dorList = [];
            this.dorPagingInfo={};
            alert("Error");
          }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },
   searchKTTInfo: function () {
     var params ={
         user_id: this.pObject.user_id
     }
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13003/get_user_ktt_info_list`

  console.log(params)
    var reqParams=this.handleParams(params)

    console.log('요구하는 페이지 정보')
    console.log(reqParams)

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
 
        if(resCode == 200){
          this.kList = response.data.data.ktt_info_list;
          this.kttPagingInfo = response.data.data.paging_info
          this.showKttInfoList =! this.showKttInfoList
        }else if(resCode==204){
          this.kList = [];
          this.kttPagingInfo = {};
          this.showKttInfoList =! this.showKttInfoList
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
          // console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      .finally(function(){})
    
    },
  searchToStoreProductSummaryInfo: function () {
  
  var params = {
      user_id: this.pObject.user_id
  }
  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13005/get_prod_summary_list`

  var reqParams=this.handleParams(params)

  console.log(params.prodnm)

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        
        if(resCode == 200){
          this.psList = response.data.data.prod_summary_list;
          this.psPagingInfo = response.data.data.paging_info;
          this.showStoreProductSummaryInfo =! this.showStoreProductSummaryInfo
   
        }else if(resCode==204){
          this.psList = [];
          this.psPagingInfo = {};
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.psList = [];
          this.psPagingInfo = {};
          alert("Error");
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
  
    },
  searchToVaCamCount: function () {
   var params ={
      user_id: this.pObject.user_id
   }
   var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13006/get_user_va_list`

   var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        
        if(resCode == 200){
          this.vaList = response.data.data.va_prod_list;
          this.vaPagingInfo = response.data.data.paging_info
          this.showVaCamCountList =! this.showVaCamCountList;
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
          // console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },
       searchToCameraInfo: function () {
      var params = {
      user_id: this.pObject.user_id
      }
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13008/get_cam_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          
          if (resCode == 200) {
            this.dcList = response.data.data.cam_list;
            this.dcPagingInfo = response.data.data.paging_info;
            this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==204){
            this.dcList = [];
            this.dcPagingInfo = {};
            this.showCameraInfoList =! this.showCameraInfoList;
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.dcList = [];
            this.dcPagingInfo = {};
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },
   searchToIotGWInfo: function () {
     var params = {
        user_id: this.pObject.user_id
    }
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13009/get_iotgw_list`;

      var reqParams = this.handleParams(params);

      axios.post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
           
          if (resCode == 200) {
            this.iotList = response.data.data.iotgw_list;
            this.iotPagingInfo = response.data.data.paging_info;
            this.showIotGwList =!this.showIotGwList;
          }else if(resCode==204){
            this.iotList = [];
            this.iotPagingInfo = {};
            this.showIotGwList =!this.showIotGwList;
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
            // console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
    },

   searchToSensorInfo: function () {
      var params = {
        user_id: this.pObject.user_id
      }
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13010/get_sensor_list`;

      var reqParams = this.handleParams(params)
  
      axios.post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
          
          if (resCode == 200) {
            this.dsList = response.data.data.sensor_list;
            this.dsPagingInfo = response.data.data.paging_info;
            this.showSensorInfoList =!this.showSensorInfoList;
          }else if(resCode==204){
            this.dsList = [];
            this.dsPagingInfo = {};
            this.showSensorInfoList =!this.showSensorInfoList;
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
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      
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