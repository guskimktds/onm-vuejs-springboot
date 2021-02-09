<template>
    <v-container>
      <v-card>
        <sensorInfo-query v-on:search="searchToSensorInfo"
        v-bind:param=searchParam></sensorInfo-query>
        <sensorInfo-list 
        v-bind:dsList="dsList"
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></sensorInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import SensorInfoList from "./sensorInfoList";
import SensorInfoQuery from "./sensorInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    SensorInfoList,
    SensorInfoQuery,
  },
  data() {
    return {
      title: "센서 정보 조회",
      dsList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      searchParam:{
        reg_date:'',
        user_id:'',
        sensor_name:''
      }
    }
  },
   created: function () {
     var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13010/get_sensor_list`

     var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.dsList = response.data.data.sensor_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.dsList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },
  methods: {
  searchToSensorInfo: function (params) {
    
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13010/get_sensor_list`

    var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.dsList = response.data.data.sensor_list;
          this.resPagingInfo = response.data.data.paging_info
    
        }else{
          this.dsList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
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

      this.searchToSensorInfo(params)
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

      if(params.reg_date !== undefined && params.reg_date !== ''){
        newParams.reg_date = params.reg_date
      }else if(
        this.searchParam.reg_date!==undefined&&
        this.searchParam.reg_date!==""
      ){
        newParams.reg_date=this.searchParam.reg_date
      }
      if(params.terminal_gw_id !== undefined && params.terminal_gw_id !== ''){
        newParams.terminal_gw_id = params.terminal_gw_id
      }else if(
        this.searchParam.terminal_gw_id!==undefined&&
        this.searchParam.terminal_gw_id!==""
      ){
        newParams.terminal_gw_id=this.searchParam.terminal_gw_id
      }
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }
      if(params.sensor_name !== undefined && params.sensor_name !== ''){
        newParams.sensor_name = params.sensor_name
      }else if(
        this.searchParam.sensor_name!==undefined&&
        this.searchParam.sensor_name!==""
      ){
        newParams.sensor_name=this.searchParam.sensor_name
      }


      return newParams
    }
  },
}
</script>

<style scoped>
</style>