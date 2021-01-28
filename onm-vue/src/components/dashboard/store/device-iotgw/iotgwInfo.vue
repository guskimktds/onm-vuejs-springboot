<template>
    <v-container>
      <v-card>
        <iotgwInfo-query v-on:search="searchToIotGWInfo"
        v-bind:param=searchParam></iotgwInfo-query>
        <iotgwInfo-list 
        v-bind:iotList="iotList"
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></iotgwInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import IotGWInfoList from './iotgwInfoList'
import IotGWInfoQuery from './iotgwInfoQuery'

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    'iotgwInfo-list': IotGWInfoList,
    'iotgwInfo-query': IotGWInfoQuery
  },
  data () {
    return {
      title: 'IoT GW 정보 조회',
      iotList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      searchParam:{
        mod_date:'',
        prod_code:'',
        user_id:''
      }
    }
  },
 created: function () {
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13009/get_iotgw_list`

    var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.iotList = response.data.data.iotgw_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.iotList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },
  methods: {
  searchToIotGWInfo: function (params) {
    
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13009/get_iotgw_list`


    var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.iotList = response.data.data.iotgw_list;
          this.resPagingInfo = response.data.data.paging_info
    
        }else{
          this.iotList = [];
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

      this.searchToIotGWInfo(params)
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

      if(params.open_date !== undefined && params.open_date !== ''){
        newParams.open_date = params.open_date
      }
      if(params.gw_id !== undefined && params.gw_id !== ''){
        newParams.gw_id = params.gw_id
      }
      if(params.gw_name !== undefined && params.gw_name !== ''){
        newParams.gw_name = params.gw_name
      }
      if(params.gw_model_code !== undefined && params.gw_model_code !== ''){
        newParams.gw_model_code = params.gw_model_code
      }


      return newParams
    }
  },
}
</script>

<style scoped>

</style>