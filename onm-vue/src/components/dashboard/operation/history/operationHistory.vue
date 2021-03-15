<template>
 <v-container fluid>
      <v-card>
        <operation-history-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></operation-history-query>
        <operation-history-list 
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></operation-history-list>
      </v-card>

  </v-container>
</template>

<script>
import OperationHistoryQuery from './operationHistoryQuery'
import OperationHistoryList from './operationHistoryList'
import dateInfo from '../../../utils/common'
//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"

export default {
  components:{
    OperationHistoryQuery,
    OperationHistoryList
  },
  data () {
    return {
      title: '[O&M]처리 이력',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        onm_user_id: '',
        cmd_type: '',
        uri: '',
        is_masking: false
      }
    }
  },
  mounted() {
    var params=this.searchParam
    if(params.cmd_type==""||params.cmd_type==undefined){
      params.cmd_type='All'
    }
    this.searchToButton(params)
  },
  methods: {
    searchToButton: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15003/get_onm_use_history`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)
      if(reqParams.cmd_type=='All'){ 
        delete reqParams.cmd_type
      }  
      console.log('전달값')
      console.log(reqParams)

      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.pList)
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
    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToButton(params)
    },

    handleParams: function(params){
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
      }

      if (params.onm_user_id !== undefined && params.onm_user_id !== "") {
        newParams.onm_user_id = params.onm_user_id;
      } else if (
        this.searchParam.onm_user_id !== undefined &&
        this.searchParam.onm_user_id !== ""
      ) {
        newParams.onm_user_id = this.searchParam.onm_user_id;
      }

      if (params.cmd_type !== undefined && params.cmd_type !== "") {
        newParams.cmd_type = params.cmd_type;
      } else if (
        this.searchParam.cmd_type !== undefined &&
        this.searchParam.cmd_type !== ""
      ) {
        newParams.cmd_type = this.searchParam.cmd_type;
      }

      if (params.uri !== undefined && params.uri !== "") {
        newParams.uri = params.uri;
      } else if (
        this.searchParam.uri !== undefined &&
        this.searchParam.uri !== ""
      ) {
        newParams.uri = this.searchParam.uri;
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
  },
}
</script>

<style scoped>

</style>