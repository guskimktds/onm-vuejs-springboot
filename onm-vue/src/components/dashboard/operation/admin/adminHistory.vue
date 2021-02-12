<template>
  <v-container fluid>
      <v-card>
        <admin-history-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></admin-history-query>
        <admin-history-list v-bind:pList=pList></admin-history-list>
      </v-card>

    </v-container>
</template>

<script>
import AdminHistoryQuery from './adminHistoryQuery'
import AdminHistoryList from './adminHistoryList'
import axios from "axios"

export default {
  components:{
    AdminHistoryQuery,
    AdminHistoryList
  },
  data () {
    return {
      title: '[매장]관리자 접속 이력',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        admin_id: '',
        user_id: '',
        tel_no: '',
        login_key: '',
        admin_type: ''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15005/get_mng_access_history`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.mng_access_history_list;
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
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15005/get_mng_access_history`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, this.$store.state.headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.mng_access_history_list;
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

      if(params.admin_id !== undefined && params.admin_id !== ''){
        newParams.admin_id = params.admin_id
      }

      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }

      if(params.tel_no !== undefined && params.tel_no !== ''){
        newParams.tel_no = params.tel_no
      }

      if(params.login_key !== undefined && params.login_key !== ''){
        newParams.login_key = params.login_key
      }

      if(params.admin_type !== undefined && params.admin_type !== ''){
        newParams.admin_type = params.admin_type
      }

      return newParams
    }

  },
}
</script>

<style scoped>

</style>