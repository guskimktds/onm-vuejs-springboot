<template>
    <v-container fluid>
      <v-card>
        <sensorOrderInfo-query
          v-on:search="searchSensorOrderInfo"
          v-bind:param=searchParam></sensorOrderInfo-query>
        <sensorOrderInfo-list 
        v-bind:soList="soList"
        v-bind:soPagingInfo=soPagingInfo
        
        @pagination="setToSearchParams"></sensorOrderInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import SensorOrderInfoList from "./sensorOrderInfoList";
import SensorOrderInfoQuery from "./sensorOrderInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    SensorOrderInfoList,
    SensorOrderInfoQuery,
  },
  data() {
    return {
      title: "사용자 센서 신청 현황",
      soList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      soPagingInfo:{},
      searchParam:{
        sensor_prod_id:'',
        status_code:'',
        sensor_prod_name:''
      }
    }
  },

 methods: {
  searchSensorOrderInfo: function (params) {
    console.log(params)
    console.log('fdsafdsa ')
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13007/get_sensor_status_list`

    var reqParams=this.handleParams(params)
    console.log('센서id')
    console.log(params.sensor_prod_id)
  
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
          alert('센서 신청 현황 데이터가 없습니다.');
        }else{
          this.soList = [];
          this.soPagingInfo = {};
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

      this.searchSensorOrderInfo(params)
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

      if(params.sensor_prod_id !== undefined && params.sensor_prod_id !== ''){
        newParams.sensor_prod_id = params.sensor_prod_id
      }else if(
        this.searchParam.sensor_prod_id!==undefined&&
        this.searchParam.sensor_prod_id!==""
      ){
        newParams.sensor_prod_id=this.searchParam.sensor_prod_id
      }
      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }else if(
        this.searchParam.status_code!==undefined&&
        this.searchParam.status_code!==""
      ){
        newParams.status_code=this.searchParam.status_code
      }
      if(params.sensor_prod_name !== undefined && params.sensor_prod_name !== ''){
        newParams.sensor_prod_name = params.sensor_prod_name
      }else if(
        this.searchParam.sensor_prod_name!==undefined&&
        this.searchParam.sensor_prod_name!==""
      ){
        newParams.sensor_prod_name=this.searchParam.sensor_prod_name
      }

      return newParams
    }
  },
}

</script>

<style scoped>
</style>