<template>
    <v-container fluid>
      <v-card>
        <change-history-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></change-history-query>
        <change-history-list v-bind:pList=pList></change-history-list>
      </v-card>

    </v-container>

</template>

<script>
import ChangeHistoryQuery from './changeHistoryQuery'
import ChangeHistoryList from './changeHistoryList'

//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"

export default {
  components:{
    ChangeHistoryQuery,
    ChangeHistoryList
  },
  data () {
    return {
      title: '[매장]관리자 변경(등록) 이력',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {   
        user_id: '',
        tel_no: '', 
        admin_type: '',
        is_masking:''
      }
    }
  },
  created: function() {
    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15004/get_mng_regi_history'
    // var url = API_URL+'/ONM_15004/get_mng_regi_history'
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15004/get_mng_regi_history`
    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.mng_regi_history_list
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
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15004/get_mng_regi_history`

        //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.mng_regi_history_list;
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

      if (params.user_id !== undefined && params.user_id !== "") {
        newParams.user_id = params.user_id;
      } else if (
        this.searchParam.user_id !== undefined &&
        this.searchParam.user_id !== ""
      ) {
        newParams.user_id = this.searchParam.user_id;
      }

      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }
      
      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }
      
      if (params.admin_type !== undefined && params.admin_type !== "") {
        newParams.admin_type = params.admin_type;
      } else if (
        this.searchParam.admin_type !== undefined &&
        this.searchParam.admin_type !== ""
      ) {
        newParams.admin_type = this.searchParam.admin_type;
      }

      return newParams
    }

  },
}
</script>

<style scoped>

</style>