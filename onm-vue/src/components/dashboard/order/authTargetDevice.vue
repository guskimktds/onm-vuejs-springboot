<template>
   <v-container fluid>
      <v-card>
        <auth-target-device-query v-on:search="searchToAuthTargetDevice"
        v-bind:param=searchParam></auth-target-device-query>
        <auth-target-device-list v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></auth-target-device-list>
      </v-card>

    </v-container>
</template>

<script>
import AuthTargetDeviceList from './auth-target-device/authTargetDeviceList'
import AuthTargetDeviceQuery from './auth-target-device/authTargetDeviceQuery'

import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    AuthTargetDeviceList,
    AuthTargetDeviceQuery
  },
  data () {
    return {
      title: '인증 대상 단말 정보',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        start_date: '',
        end_date: '',
        oderno:'',
        mac_id:'',
        open_oderno:''
      }
    }
  },  

  methods: {
    searchToAuthTargetDevice: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12009/get_auth_device_list`

      var reqParams=this.handleParams(params)

        axios.post(url, reqParams, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.auth_device_list;
            this.resPagingInfo=response.data.data.paging_info;
            console.log('전달리스트')
            console.log(this.pList)
            
          }else{
            this.pList = [];
            this.resPaingInfo={};
            alert(resCode + " / " + resMsg);
          }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },
      setToSearchParams:function(values){
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      this.searchToAuthTargetDevice(params)

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


      if (params.oderno !== undefined && params.oderno !== "") {
        newParams.oderno = params.oderno;
      } else if (
        this.searchParam.oderno !== undefined &&
        this.searchParam.oderno !== ""
      ) {
        newParams.oderno = this.searchParam.oderno;
      }

      if (params.mac_id !== undefined && params.mac_id !== "") {
        newParams.mac_id = params.mac_id;
      } else if (
        this.searchParam.mac_id !== undefined &&
        this.searchParam.mac_id !== ""
      ) {
        newParams.mac_id = this.searchParam.mac_id;
      }

      if (params.open_oderno !== undefined && params.open_oderno !== "") {
        newParams.open_oderno = params.open_oderno;
      } else if (
        this.searchParam.open_oderno !== undefined &&
        this.searchParam.open_oderno !== ""
      ) {
        newParams.open_oderno = this.searchParam.open_oderno;
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      return newParams
    }
  }
}
</script>

<style scoped>

</style>