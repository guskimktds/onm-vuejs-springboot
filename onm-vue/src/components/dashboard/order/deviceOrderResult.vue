<template>
   <v-container fluid>
      <v-card>
        <device-order-result-query v-on:search="searchToDeviceOrderResult"
        v-bind:param=searchParam></device-order-result-query>
        <device-order-result-list v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></device-order-result-list>
      </v-card>
    </v-container>
</template>

<script>
import DeviceOrderResultList from './device-order-result/deviceOrderResultList'
import DeviceOrderResultQuery from './device-order-result/deviceOrderResultQuery'

import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    DeviceOrderResultList,
    DeviceOrderResultQuery
  },
  data () {
    return {
      title: '단말 청약 오더 처리결과',
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
        guid:''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12012/get_device_order_result_list`
    
    var params = this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.device_order_result_list;
            this.resPagingInfo=response.data.data.paging_info;
          }else{
            this.pList = [];
            this.resPagingInfo={};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    searchToDeviceOrderResult: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_12012/get_device_order_result_list`

    var reqParams=this.handleParams(params)

        axios.post(url, reqParams, headers)
            .then((response) => {
              console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            console.log(response.data.data.device_order_result_list);
            this.pList = response.data.data.device_order_result_list;
            this.resPagingInfo=response.data.data.paging_info;
          }else{
            this.pList = [];
            this.resPagingInfo={};
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

      this.searchToDeviceOrderResult(params)

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

      if(params.start_date !== undefined && params.start_date !== ''){
        newParams.start_date = params.start_date
      }

      if(params.end_date !== undefined && params.end_date !== ''){
        newParams.end_date = params.end_date
      }

      if(params.oderno !== undefined && params.oderno !== ''){
        newParams.oderno = params.oderno
      }     

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }
      return newParams
    }


  }
}
</script>

<style scoped>

</style>