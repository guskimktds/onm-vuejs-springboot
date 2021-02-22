<template>
  <v-container fluid>
      <v-card>
        <admin-history-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></admin-history-query>
        <admin-history-list 
        v-bind:pList=pList
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="searchToButton"></admin-history-list>
            
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
      mask:{},
      resPagingInfo: {},
      searchParam: {
        admin_id: '',
        user_id: '',
        tel_no: '',
        login_key: '',
        admin_type: 'N',
        is_masking:''
      }
    }
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
      console.log("======")
      console.log(params)
      let newParams = {}
      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if (params.admin_id !== undefined && params.admin_id !== "") {
        newParams.admin_id = params.admin_id;
      } else if (
        this.searchParam.admin_id !== undefined &&
        this.searchParam.admin_id !== ""
      ) {
        newParams.admin_id = this.searchParam.admin_id;
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

      if (params.login_key !== undefined && params.login_key !== "") {
        newParams.login_key = params.login_key;
      } else if (
        this.searchParam.login_key !== undefined &&
        this.searchParam.login_key !== ""
      ) {
        newParams.login_key = this.searchParam.login_key;
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      newParams.admin_type = this.searchParam.admin_type;

      return newParams
    }

  },
}
</script>

<style scoped>

</style>