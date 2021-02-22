<template>
    <v-container fluid>
      <v-card>
        <device-status-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></device-status-query>
        <device-status-list v-bind:pList=pList></device-status-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceStatusQuery from './deviceStatusQuery'
import deviceStatusList from './deviceStatusList'
import dateInfo from '../../../utils/common'

//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"
// import EventBus from '../../../../../EventBus';

export default {
  components:{
    deviceStatusQuery,
    deviceStatusList
  },
  data () {
    return {
      title: '고객이전 단말상태 조회',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        mig_seq: '',
        device_type: '',
        device_id: '',
        status_code: ''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15014/get_user_mig_device`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.user_mig_device_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    searchToButton: function(params){
      console.log(params);
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15014/get_user_mig_device`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.user_mig_device_list;
            this.resPagingInfo = response.data.data.paging_info

          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
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

      if(params.mig_seq !== undefined && params.mig_seq !== ''){
        newParams.mig_seq = params.mig_seq
      }

      if(params.device_type !== undefined && params.device_type !== ''){
        newParams.device_type = params.device_type
      }   
      
      if(params.device_id !== undefined && params.device_id !== ''){
        newParams.device_id = params.device_id
      } 

      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }  

      return newParams
    }
  }
}
</script>

<style scoped>

</style>