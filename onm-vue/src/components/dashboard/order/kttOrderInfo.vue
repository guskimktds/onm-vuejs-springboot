<template>
    <v-container fluid>
      <v-card>
        <ktt-order-info-query v-on:search="searchToKTTOrderInfo"
        v-bind:param=searchParam></ktt-order-info-query>
        <ktt-order-info-list v-bind:kList=kList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></ktt-order-info-list>
      </v-card>
    </v-container>
</template>

<script>
import KttOrderInfoList from './ktt-order/kttOrderInfoList'
import KttOrderInfoQuery from './ktt-order/kttOrderInfoQuery'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    KttOrderInfoList,
    KttOrderInfoQuery
  },
  data () {
    return {
      title: 'KTT 청약 정보',
      kList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        start_date: '',
        end_date: '',
        said:'',
        guid:'',
        service_no:'',
        contract_id:''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12005/get_user_ktt_subs`
    
    var params =this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.kList = response.data.data.tel_no_list;
            this.resPagingInfo=response.data.data.paging_info
          }else{
            this.kList = [];
            this.resPagingInfo={};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    searchToKTTOrderInfo: function(params){
      console.log("부모 메소드 searchToKTTOrderInfo 호출: "+JSON.stringify(params));
      // var url = 'https://test-onm.ktvsaas.co.kr:8443/V110/ONM_12005/get_user_ktt_subs'
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12005/get_user_ktt_subs`

      var reqParams=this.handleParams(params)

      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.kList = response.data.data.tel_no_list;
            this.resPagingInfo=response.data.data.paging_info
          }else{
            this.kList = [];
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

      this.searchToKTTOrderInfo(params)

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

      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }

      if(params.service_no !== undefined && params.service_no !== ''){
        newParams.service_no = params.service_no
      }   

      if(params.contract_id !== undefined && params.contract_id !== ''){
        newParams.contract_id = params.contract_id
      }     
      return newParams
    }
  }
}
</script>

<style scoped>

</style>