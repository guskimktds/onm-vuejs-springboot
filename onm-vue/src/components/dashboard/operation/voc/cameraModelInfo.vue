<template>
  <v-container fluid>
      <camera-model-query
      v-on:search="searchCameraModel"
      v-bind:param="searchParam">
      </camera-model-query>
      <camera-model-list
      v-bind:cmList="cmList"
      v-bind:cmPagingInfo="cmPagingInfo"
      @child="clickToSearchFirm"
      @pagination="setToSearchParams"
      @reset="reset"></camera-model-list>
      <firmware-list
      v-show="showFirmList"
      v-bind:fList="fList"
      v-bind:fPagingInfo="fPagingInfo"
      @reset="reset"
      @subPagination="setToSubPage"></firmware-list>
  </v-container>
</template>

<script>
import CameraModelList from "./cameraModelList.vue";
import CameraModelQuery from "./cameraModelQuery.vue";
import EventBus from '../../../../EventBus'
import axios from "axios";
import FirmwareList from './firmwareList.vue';

const headers = {
  "User-Agent":
    "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  components: {
    CameraModelList,
    CameraModelQuery,
    FirmwareList,
  },
  data() {
    return {
      title: "카메라 모델 정보 조회",
      cmList: [],
      fList: [],
      pObject: {},
      showFirmList: false,
      clickVal: '',
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      cmPagingInfo: {},
      fPagingInfo: {},
      searchParam: {
          dev_type: 'CAM',
          model_name: '',
          product_code: ''
      },
    };
  },

  methods: {
    searchCameraModel: function (params) {
      this.showFirmList = false;
       this.fPagingInfo={}
      console.log('보내는값')
      console.log(params)
      
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15040/get_cam_model_list`;

      var reqParams = this.handleParams(params);

      axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
     
          if (resCode == 200) {
            this.cmList = response.data.data.cam_model_list;
            this.cmPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
            this.cmList = [];
            this.cmPagingInfo = {};
            alert('카메라 정보 조회 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.cmList = [];
            this.cmPagingInfo = {};
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    },

    setToSearchParams: function (values) {
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      console.log(params);
      this.showFirmList=false
      this.searchCameraModel(params);
    },

    setToSubPage: function(values){
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }
      console.log(params)
      this.changeFirmPage(params)
    },

    clickToSearchFirm: function (value) {
        if(value){
            var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15030/get_cam_firmware_list`;

            var params = {
                dev_type: value.dev_type,
                product_code: value.product_code,
                page_no: "1",
                view_cnt: "10",
            }

            axios
                .post(url, params, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    console.log(response)
                    if(resCode == 200) {
                        this.showFirmList = true;
                        this.fList = response.data.data.cam_firmware_list
                        this.fPagingInfo = response.data.data.paging_info
                    }
                    else if(resCode == 204) {
                        this.fList = [];
                        this.fPagingInfo = {};
                        this.showFirmList = false;
                    } else {
                        this.showFirmList = false;
                        this.fPagingInfo = {};
                        console.log('Error');
                    }
                })
            if(value!=this.clickVal){
              this.showFirmList = false;
            }
            this.clickVal={}
            this.clickVal=value
        }
     },
     reset: function(){
       this.showFirmList = false;
       this.fPagingInfo={}
       var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15040/get_cam_model_list`;
       var reqParams = this.handleParams(this.searchParam)

        axios
        .post(url, reqParams, headers)
        .then((response) => {
          console.log(response);
          var resCode = response.data.res_code;
     
          if (resCode == 200) {
            this.cmList = response.data.data.cam_model_list;
            this.cmPagingInfo = response.data.data.paging_info;
          }else if(resCode==204){
            this.cmList = [];
            this.cmPagingInfo = {};
            alert('카메라 정보 조회 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.cmList = [];
            this.cmPagingInfo = {};
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
     },
    changeFirmPage: function(params){
      
      var reqParams ={
        page_no: params.page_no,
        view_cnt: params.view_cnt,
        dev_type: this.clickVal.dev_type,
        product_code: this.clickVal.product_code,
      }

      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15030/get_cam_firmware_list`;

              axios
                .post(url, reqParams, headers)
                .then((response) => {
                    var resCode = response.data.res_code;
                    console.log(response)
                    if(resCode == 200) {
                        this.showFirmList = true;
                        this.fList = response.data.data.cam_firmware_list
                        this.fPagingInfo = response.data.data.paging_info
                    }
                    else if(resCode == 204) {
                        this.fList = [];
                        this.fPagingInfo = {};
                        this.showFirmList = false;
                    } else {
                        this.showFirmList = false;
                        this.fPagingInfo = {};
                        console.log('Error');
                    }
                })

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

      if (params.dev_type !== undefined && params.dev_type !== "") {
        newParams.dev_type = params.dev_type;
      } else if (
        this.searchParam.dev_type !== undefined &&
        this.searchParam.dev_type !== ""
      ) {
        newParams.dev_type = this.searchParam.dev_type;
      }

      if (params.vendor_name !== undefined && params.vendor_name !== "") {
        newParams.vendor_name = params.vendor_name;
      } else if (
        this.searchParam.vendor_name !== undefined &&
        this.searchParam.vendor_name !== ""
      ) {
        newParams.vendor_name = this.searchParam.vendor_name;
      }

      if (params.model_name !== undefined && params.model_name !== "") {
        newParams.model_name = params.model_name;
      } else if (
        this.searchParam.model_name !== undefined &&
        this.searchParam.model_name !== ""
      ) {
        newParams.model_name = this.searchParam.model_name;
      }

      if (params.product_code !== undefined && params.product_code !== "") {
        newParams.product_code = params.product_code;
      } else if (
        this.searchParam.product_code !== undefined &&
        this.searchParam.product_code !== ""
      ) {
        newParams.product_code = this.searchParam.product_code;
      }
      
      
      return newParams;
    },
  },
};
</script>

<style scoped>
</style>