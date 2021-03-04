<template>
    <v-container fluid>
      <v-card>
        <customer-transfer-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
          @items="saveItem"
        ></customer-transfer-query>
        <customer-transfer-list 
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></customer-transfer-list>
      </v-card>
    </v-container>
</template>

<script>
import customerTransferQuery from './customerTransferQuery'
import customerTransferList from './customerTransferList'

import axios from "axios"
import dateInfo from '../../../utils/common'
// import EventBus from '../../../../EventBus';


export default {
  components:{
    customerTransferQuery,
    customerTransferList
  },
  data () {
    return {
      title: '고객이전 조회',
      pList: [],
      reqPagingInfo: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        page_no: 1,
        view_cnt: 10,
        status_code: '',
        order_category: 'S'
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        user_id: '',
        status_code: '',
        order_category: 'S'
      }
    }
  },


  // mounted: function() {
  //    EventBus.$on('createItemTransfer', params => {
  //       console.log(params)
  //       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15013/move_local`

  //       axios.post(url, params, this.$store.state.headers)
  //           .then((response) => {
  //             console.log(response)
  //             var resCode = response.data.res_code;
  //             var resMsg = response.data.res_msg;
  //             if(resCode == 200){
  //               //현재 목록에서 선택한 Item을 삭제한다.
  //               console.log(params)
  //               // this.pList.unshift(params)
  //               this.$fire({
  //                      title: "등록 되었습니다.",
  //                      type : "success"})
  //             }else{
  //               this.$fire({
  //                      title: "등록 실패하였습니다.",
  //                      html: resMsg,
  //                      type : "error"})
  //             }
  //           })
  //           .catch((ex) => {
  //             this.$fire({
  //                      title: "등록 실패하였습니다.",
  //                      text: ex,
  //                      type : "error"})
  //           })
  //   })
  // },
  mounted:function(){
    var params=this.reqPagingInfo
    this.searchToButton(params);
  },
  methods: {
    searchToButton: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15012/get_user_mig_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      console.log('전달값')
      console.log(reqParams)

      axios.post(url, reqParams, this.$store.state.headers)
          .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pList = response.data.data.user_mig_info_list;
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

  saveItem(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15013/move_local`

    axios.post(url,params,this.$store.state.headers)
      .then((response)=>{
        var resCode=response.data.res_code
        var resMsg=response.data.res_msg
        if(resCode==200){
          this.pList.unshift(params)

          this.$fire({
            title: "등록 되었습니다.",
            type: "success"})
        }else{
          this.$fire({
            title: "등록 실패하였습니다.",
            html: resMsg,
            type: "error"})
        }
      })
      .catch((ex)=>{
        this.$fire({
          title: "등록 실패하였습니다.",
          text: ex,
          type: "error"})
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

      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }

      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }

      if(params.order_category !== undefined && params.order_category !== ''){
        newParams.order_category = params.order_category
      }

      return newParams
    }
  }
}
</script>

<style scoped>

</style>