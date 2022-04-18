<template>
    <v-container fluid>
      <v-card>
      <srs-send-history-query
          v-on:search="searchToSrsSendHistory"
          v-bind:param=searchParam
          @Items="saveItem"
        ></srs-send-history-query>
        <srs-send-history-list 
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo
          @pagination="setToSearchParams"
          @reset="reset"
        >
        </srs-send-history-list>
      </v-card>
    </v-container>
</template>

<script>
import SrsSendHistoryQuery from './srsSendHistory/srsSendHistoryQuery.vue'
import SrsSendHistoryList from './srsSendHistory/srsSendHistoryList.vue'

import EventBus from '../../../../EventBus'
import axios from "axios"

export default {
  components: {
    SrsSendHistoryQuery,
    SrsSendHistoryList

  },
  data () {
    return {
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
       cam_id : '',
       proc_type : '',
       request_from : '',
       start_date : '',
       end_date : ''
      },
    }
  },

  methods: {
      reset: function(){
      console.log(this.searchParam)
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15160/get_srs_send_history`
       var reqParams = this.handleParams(this.searchParam)
      axios
        .post(url, reqParams)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.srs_send_history_list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
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
    searchToSrsSendHistory: function(params){
      let url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15160/get_srs_send_history`
      console.log(params)
      var reqParams = this.handleParams(params)      
      console.log('넣어지는 값')
      console.log(reqParams)
  
      axios.post(url, reqParams)
      .then((response) => {
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          this.pList = response.data.data.srs_send_history_list;
          this.resPagingInfo = response.data.data.paging_info

        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("영상송출 이력 데이터가 없습니다.");
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          //console.log(resCode + " / " + resMsg);
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
        view_cnt: values.itemsPerPage,
      }

      console.log(params)

      this.searchToSrsSendHistory(params)
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

      if(params.cam_id !== undefined && params.cam_id !== ''){
        newParams.cam_id = params.cam_id
      }else if(
        this.searchParam.cam_id!==undefined&&
        this.searchParam.cam_id!==""
      ){
        newParams.cam_id=this.searchParam.cam_id
      }

      if(params.proc_type !== undefined && params.proc_type !== ''){
        newParams.proc_type = params.proc_type
      }else if(
        this.searchParam.proc_type!==undefined&&
        this.searchParam.proc_type!==""
      ){
        newParams.proc_type=this.searchParam.proc_type
      } 
      if(params.request_from !== undefined && params.request_from !== ''){
        newParams.request_from = params.request_from
      }else if(
        this.searchParam.request_from!==undefined&&
        this.searchParam.request_from!==""
      ){
        newParams.request_from=this.searchParam.request_from
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
      return newParams
    }
  }
}
</script>

<style scoped>

</style>