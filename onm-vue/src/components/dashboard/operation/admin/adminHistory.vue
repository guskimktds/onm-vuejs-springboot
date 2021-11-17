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
        @pagination="setToSearchParams"></admin-history-list>
      </v-card>
    </v-container>
</template>

<script>
import AdminHistoryQuery from './adminHistoryQuery'
import AdminHistoryList from './adminHistoryList'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
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
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        admin_id: '',
        user_id: '',
        tel_no: '',
        login_key: '',
        admin_type: 'N',
        is_masking:'',
        order_category:'I'
      }
    }
  },

  methods: {
    searchToButton: function(params){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15005/get_mng_access_history`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  
      
      console.log('검색값')
      console.log(reqParams)
      if(!reqParams.date_yn&&!reqParams.user_id&&!reqParams.admin_id&&!reqParams.tel_no&&!reqParams.login_key){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, this.$store.state.headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
      
        if(resCode == 200){
          this.pList = response.data.data.mng_access_history_list;
          this.resPagingInfo = response.data.data.paging_info

        }else if(resCode==204){
          this.pList = [];
          this.resPagingInfo = {};
          console.log('[매장]관리자 접속 이력 데이터가 없습니다.');
        }else if(resCode==410){
          // alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      }
    },

    setToSearchParams(values) {
      console.log('페이지값')
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToButton(params);
    },

    handleParams: function(params){
      console.log(params)
      let newParams = {}
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }

      if (params.page_no === undefined || params.page_no === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page_no;
      }

      if (params.view_cnt === undefined || params.view_cnt === "") {
        newParams.view_cnt = this.reqPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.view_cnt;
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

       if (params.order_category !== undefined && params.order_category !== "") {
        newParams.order_category = params.order_category;
      } else if (
        this.searchParam.order_category !== undefined &&
        this.searchParam.order_category !== ""
      ) {
        newParams.order_category = this.searchParam.order_category;
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }

      newParams.admin_type = 'N'
      newParams.date_yn=this.searchParam.date_yn
      return newParams
    }

  },
}
</script>

<style scoped>

</style>