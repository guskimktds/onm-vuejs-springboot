<template>
   <v-container fluid>
      <v-card>
        <device-order-result-query v-on:search="searchToDeviceOrderResult"
        v-bind:param=searchParam></device-order-result-query>
        <device-order-result-list v-bind:dorList=dorList
        v-bind:dorPagingInfo=dorPagingInfo
        @pagination="setToSearchParams"></device-order-result-list>
      </v-card>
    </v-container>
</template>

<script>
import DeviceOrderResultList from './device-order-result/deviceOrderResultList'
import DeviceOrderResultQuery from './device-order-result/deviceOrderResultQuery'
import dateInfo from '../../utils/common'

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
      dorList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      dorPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        oderno:'',
        guid:''
      }
    }
  },

  methods: {
    searchToDeviceOrderResult: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12012/get_device_order_result_list`

    var reqParams=this.handleParams(params)

        axios.post(url, reqParams, headers)
            .then((response) => {
              console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            console.log(response.data.data.device_order_result_list);
            this.dorList = response.data.data.device_order_result_list;
            this.dorPagingInfo=response.data.data.paging_info;
          }else{
            this.dorList = [];
            this.dorPagingInfo={};
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
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }

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
        if(params.oderno !== undefined && params.oderno !== ''){
          newParams.oderno = params.oderno
        }     
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