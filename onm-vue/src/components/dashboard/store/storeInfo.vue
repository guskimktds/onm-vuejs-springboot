<template>
  <v-container fluid>
    <v-card>
      <storeInfo-query
        v-on:search="searchToStoreInfo"
        v-bind:param="searchParam"
      ></storeInfo-query>
      <storeInfo-list
        v-bind:pList="pList"
        v-bind:resPagingInfo="resPagingInfo"
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"
      >
      </storeInfo-list>

      <v-container id="regular-tables" fluid tag="section">
        <v-btn
          v-bind:color="changeColor(showDetailObject)"
          v-if="isReloadDetailObject"
          v-on:click="showDetailObject = !showDetailObject"
        >
          매장상세{{ showDetailObject ? " Close" : " Open" }}
        </v-btn>
      </v-container>

      <v-container id="regular-tables" fluid tag="section">
        <v-btn
          v-bind:color="changeColor(showKttList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchKTT()"
        >
          사용자-KTT{{ showKttList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showProdSummaryList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchProdSummary()"
        >
          상품 요약 정보{{ showProdSummaryList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showVACountList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchVACount()"
        >
          VA 정보 조회{{ showVACountList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showSensorOrderList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchSensorOrder()"
        >
          센서 정보 조회{{ showSensorOrderList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showDeviceCameraList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchDeviceCamera()"
        >
          단말 카메라 정보 조회{{ showDeviceCameraList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showIotGwList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchIotGw()"
        >
          단말 IoT GW 정보 조회{{ showIotGwList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showDeviceSensorList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchDeviceSensor()"
        >
          단말 센서 정보 조회{{ showDeviceSensorList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-bind:color="changeColor(showPhoneList)"
          v-if="showDetailObject"
          v-on:click="clickToSearchPhone()"
        >
          사용자 전화번호{{ showPhoneList ? " Close" : " Open" }}
        </v-btn>

        <v-btn
          v-if="showDetailObject"
          v-on:click="clickToChangeDay()">
          저장기간 변경
        </v-btn>

      </v-container>
      <storeInfo-detail-object
        v-if="showDetailObject"
        v-bind:pObject="pObject"
      ></storeInfo-detail-object>

      <v-container v-if="showDetailObject">
        <ktt-list
          v-if="showKttList"
          v-bind:kList="kList"
        ></ktt-list>

        <prod-summary-list
          v-if="showProdSummaryList"
          v-bind:psList="psList"
        ></prod-summary-list>

        <va-cam-count
          v-if="showVACountList"
          v-bind:vaList="vaList"
        ></va-cam-count>

        <sensor-order-list
          v-if="showSensorOrderList"
          v-bind:soList="soList"
        ></sensor-order-list>

        <device-camera-list
          v-if="showDeviceCameraList"
          v-bind:dcList="dcList"
        ></device-camera-list>

        <iot-gw-list
          v-if="showIotGwList"
          v-bind:iotList="iotList"
        ></iot-gw-list>

        <device-sensor-list
          v-if="showDeviceSensorList"
          v-bind:dsList="dsList"
        ></device-sensor-list>

        <phone-list
          v-if="showPhoneList"
          v-bind:pnList="pnList"
        ></phone-list>
      </v-container>
    </v-card>
  </v-container>
</template>
              
<script>
import StoreInfoList from "./info/storeInfoList";
import StoreInfoQuery from "./info/storeInfoQuery";
import StoreInfoDetailObject from "./store-detail/storeDetailObject";

import KttList from "./info/detail/kttList.vue"
import ProdSummaryList from "./info/detail/productSummaryList.vue";
import VaCamCount from "./info/detail/vaCamCountList.vue";
import SensorOrderList from "./info/detail/sensorOrderList.vue";
import DeviceCameraList from "./info/detail/deviceCameraList.vue";
import IotGwList from "./info/detail/iotGwList.vue";
import DeviceSensorList from "./info/detail/deviceSensorList.vue";
import PhoneList from "./info/detail/phoneList.vue";

import dateInfo from '../../utils/common'
import EventBus from '../../../EventBus'
import axios from "axios";

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

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
    PhoneList,
  },
  data() {
    return {
      title: "매장 정보 조회",
      pList: [],
      pObject: {},
      showDetailObject: false,
      isReloadDetailObject: false,
      btnTitle: "매장정보상세Open",

      title2: "사용자-KTT 정보 조회",
      kList: [],
      showKttList: false,
      btnTitle2: "사용자-KTT open",

      title3: "상품 요약 정보 조회",
      psList: [],
      showProdSummaryList: false,
      btnTitle3: "상품 요약 open",

      title4: "VA 정보 조회",
      vaList: [],
      showVACountList: false,
      btnTitle4: "VA 정보 open",

      title5: "센서 정보 조회",
      soList: [],
      showSensorOrderList: false,
      btnTitle5: "센서 정보 open",

      title6: "단말 카메라 정보 조회",
      dcList: [],
      showDeviceCameraList: false,
      btnTitle6: "단말 카메라 정보 open",

      title7: "IoT GW 정보 조회",
      iotList: [],
      showIotGwList: false,
      btnTitle7: "IoT GW 정보 open",

      title8: "단말 센서 정보 조회",
      dsList: [],
      showDeviceSensorList: false,
      btnTitle8: "단말 센서 정보 open",

      title9: "사용자 전화번호 조회",
      pnList: [],
      showPhoneList: false,
      btnTitle9: "사용자 전화번호 open",

      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },

      resPagingInfo: {},

      oldValue:'',
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        said: "",
        user_name: "",
        user_id: "",
        tel_no: "",
        is_masking:"",
        date_yn: true
      },

    };
  },

  methods: {
    searchToStoreInfo: function (params) {
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13001/get_user_list`;

      var reqParams = this.handleParams(params);
      console.log(reqParams)
      if(!reqParams.start_date&&!reqParams.said&&!reqParams.user_name&&!reqParams.user_id&&!reqParams.tel_no){
             this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          
          if (resCode == 200) {
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info;
            console.log(this.pList)
            console.log('페이지값')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('매장정보 조회 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
      }
    },

    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },

    clickToSearchDetailObject: function (values) {
      if (values) {
        var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13002/get_user_detail`;

        var params = {
          user_id: values,
          page_no: "1",
          view_cnt: "10",
          is_masking: this.searchParam.is_masking? "N" : "Y"
        };

        axios
          .post(url, params, headers)
          .then((response) => {
            var resCode = response.data.res_code;
          
            if (resCode == 200) {
              this.showDetailObject = true;
              this.isReloadDetailObject = true;
              this.pObject = response.data.data.user_detail_list[0];
              console.log(this.pObject)
              console.log(response)
            }else if(resCode==204){
              this.showDetailObject = false;
              this.isReloadDetailObject = false;
              this.pObject = {};
              alert("매장 상세 데이터가 없습니다.");
              console.log(response)
            } else {
              console.log(response)
              this.pObject = {};
              alert("Error");
            }
          })
          .catch((ex) => {
            console.log("조회 실패", ex);
          });
      }
      
      if(values!==this.oldValue){
          this.showKttList=false
          this.showProdSummaryList=false
          this.showVACountList=false
          this.showPhoneList=false
          this.showSensorOrderList=false
          this.showDeviceCameraList=false
          this.showIotGwList=false
          this.showDeviceSensorList=false
      } 
        this.oldValue={}
        this.oldValue=values
    },
    clickToSearchKTT: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13003/get_user_ktt_info_list`;
      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data);
          var resCode = response.data.res_code;
        
          console.log(resCode);
          if (resCode == 200) {
            this.kList = response.data.data.ktt_info_list;
            this.showKttList = !this.showKttList;
          }else if(resCode==204){
            this.kList = [];
            alert('사용자-KTT 데이터가 없습니다.');
          } else {
            this.kList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },
    clickToSearchProdSummary: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13005/get_prod_summary_list`;
      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data);
          var resCode = response.data.res_code;
          
          if (resCode == 200) {
            this.psList = response.data.data.prod_summary_list;
            this.showProdSummaryList = !this.showProdSummaryList;
          }else if(resCode==204){
            this.psList = [];
            alert('상품 요약 정보 데이터가 없습니다.');
          } else {
            this.psList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToSearchVACount: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13006/get_user_va_list`;
      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
         
          if (resCode == 200) {
            this.vaList = response.data.data.va_prod_list;
            this.showVACountList = !this.showVACountList;
          } else if(resCode==204){
            this.vaList = [];
            alert('VA 정보 데이터가 없습니다.');
          } else {
            this.vaList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToSearchSensorOrder: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13007/get_sensor_status_list`;

      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          
          if (resCode == 200) {
            this.soList = response.data.data.sensor_list;
            this.showSensorOrderList = !this.showSensorOrderList;
            console.log("resCode");
            console.log(resCode);
          } else if(resCode==204){
            this.soList = [];
            alert('센서 정보 데이터가 없습니다.');
          } else {
            this.soList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToSearchDeviceCamera: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13008/get_cam_list`;

      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
        
          if (resCode == 200) {
            this.dcList = response.data.data.cam_list;
            this.showDeviceCameraList = !this.showDeviceCameraList;
          } else if(resCode==204){
            this.dcList = [];
            alert('단말 카메라 정보 데이터가 없습니다.');
          }else {
            this.dcList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToSearchIotGw: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13009/get_iotgw_list`;

      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
 
          if (resCode == 200) {
            this.iotList = response.data.data.iotgw_list;
            this.showIotGwList = !this.showIotGwList;
          }else if(resCode==204){
            this.iotList = [];
            alert('단말 IOT GW 정보 데이터가 없습니다.');
          }else {
            this.iotList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToSearchDeviceSensor: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13010/get_sensor_list`;

      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
     
          if (resCode == 200) {
            this.dsList = response.data.data.sensor_list;
            this.showDeviceSensorList = !this.showDeviceSensorList;
          } else if(resCode==204){
            this.dsList = [];
            alert('단말 센서 정보 데이터가 없습니다.');
          } else {
            this.dsList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },
    clickToSearchPhone: function () {
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13004/get_user_tel_list`;

      var params = {
        user_id: this.pObject.user_id,
        is_masking: this.searchParam.is_masking? "N" : "Y"
      };
      axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
     
          if (resCode == 200) {
            this.pnList = response.data.data.tel_no_list;
            this.showPhoneList = !this.showPhoneList;
          } else if(resCode==204){
            this.pnList = [];
            alert('사용자 전화번호 데이터가 없습니다.');
          } else {
            this.pnList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    clickToChangeDay: function(){
      this.$fire({
        title: "추가할 영상저장기간을 입력해주세요.",
        input: 'text',
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '입력',
        cancelButtonText: '취소',
        inputPlaceholder: '추가 기간 입력',
        inputAttributes: {
          min: 0,
          max: 25,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      }).then(result=>{
        if(result.value>=0){
          var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13017/set_user_storage_add_day`

          var param = {
            user_id: this.pObject.user_id,
            old_store_day: this.pObject.storage_chg_day,
            add_day: result.value
          }
          console.log(param)
          axios.post(url,param,this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode =response.data.res_code;

              if(resCode==200){
                alert('변경이 성공적으로 완료되었습니다.')
              } else if(resCode==204){
                alert('영상저장기간 데이터가 없습니다.')
              } else {
                alert('에러가 발생하여 요청을 완료하지 못했습니다.')
              }
            })
        }else if(result.value<0){
          alert('추가 기간은 음수를 입력할 수 없습니다.')
        }else{
          alert('입력값이 정수가 아닙니다.')
        }
      })
    },

    setToSearchParams: function (values) {
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToStoreInfo(params);
    },

    handleParams: function (params) {
      let newParams = {};
      if (params.page_no === undefined || params.page_no === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page_no;
      }
      if (params.view_cnt === undefined || params.view_cnt === "") {
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.view_cnt;
      }

      if(params.date_yn==undefined){
          params.date_yn=this.searchParam.date_yn
      }

      if(params.date_yn==true){
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
      }

      if (params.said !== undefined && params.said !== "") {
        newParams.said = params.said;
      } else if (
        this.searchParam.said !== undefined &&
        this.searchParam.said !== ""
      ) {
        newParams.said = this.searchParam.said;
      }
      if (params.user_id !== undefined && params.user_id !== "") {
        newParams.user_id = params.user_id;
      } else if (
        this.searchParam.user_id !== undefined &&
        this.searchParam.user_id !== ""
      ) {
        newParams.user_id = this.searchParam.user_id;
      }
      if (params.user_name !== undefined && params.user_name !== "") {
        newParams.user_name = params.user_name;
      } else if (
        this.searchParam.user_name !== undefined &&
        this.searchParam.user_name !== ""
      ) {
        newParams.user_name = this.searchParam.user_name;
      }
      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }
      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
      return newParams;
    },
  },
};
</script>

<style scoped>
</style>