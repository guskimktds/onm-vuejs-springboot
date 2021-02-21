<template>
 <v-container fluid>
      <v-card>
        <operation-history-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></operation-history-query>
        <operation-history-list v-bind:pList=pList></operation-history-list>
      </v-card>

  </v-container>
</template>

<script>
import OperationHistoryQuery from './operationHistoryQuery'
import OperationHistoryList from './operationHistoryList'

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
        onm_user_id: '',
        cmd_type: '',
        uri: '',
        is_masking: false
      }
    }
  },
  created: function() {
    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15003/get_proc_history'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15003/get_onm_use_history`
    
    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.proc_history_list;
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
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15003/get_onm_use_history`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.proc_history_list;
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

      if (params.cmd_type !== undefined && params.cmd_type !== "") {
        newParams.cmd_type = params.cmd_type;
      } else if (
        this.searchParam.cmd_type !== undefined &&
        this.searchParam.cmd_type !== ""
      ) {
        newParams.cmd_type = this.searchParam.cmd_type;
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