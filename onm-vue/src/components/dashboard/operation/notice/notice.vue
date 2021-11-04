<template>
  <v-container fluid>
      <v-card>
        <notice-query 
          v-on:search="searchToButton"
          @searchToAuthMenu="searchToAuthMenuButton"
          v-bind:param=searchParam
          @Items="saveItems"
        ></notice-query>
        <notice-list 
        v-bind:pList=pList
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
        @reset="reset"></notice-list>
       
       </v-card>
    </v-container>

</template>

<script>
import NoticeList from './noticeList'
import noticeQuery from './noticeQuery'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios"


// const resourceHost = "http://localhost:3000"

// const API_URL = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}`

export default {
  components: {
    NoticeList,
    noticeQuery,
  },
  data () {
    return {
      title: '계정 조회',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn:true,
        onm_user_id: '',
        name: '',
        auth_group_id: '',
        order_category:'R',
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        onm_user_id: '',
        name: '',
        auth_group_id: '',
        order_category:'R',
      },
      authGroupList:[],
      isAuthMenu: false
    }
  },
  // mounted() {
  //   this.searchToButton(this.searchParam)
  // },
  methods: {
      reset: function(){
      console.log(this.searchParam)
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15001/get_account`
      var reqParams = this.handleParams(this.searchParam)

      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            // this.authGroupList = response.data.data.auth_group_list
            // this.isAuthMenu = true
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else{
            // this.authGroupList = [];
            // this.isAuthMenu = false
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    searchToButton: function(params){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15001/get_account`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)
      console.log('요청하는 값')  
      console.log(reqParams)
      if(!reqParams.date_yn&&!reqParams.onm_user_id&&!reqParams.name&&!reqParams.auth_group_id){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            // this.authGroupList = response.data.data.auth_group_list
            // this.isAuthMenu = true
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('계정 정보 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            // this.authGroupList = [];
            // this.isAuthMenu = false
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
    },

    searchToAuthMenuButton: function(params){
      console.log("부모 메소드 searchToAuthMenuButton 호출: "+JSON.stringify(params));
      if(this.isAuthMenu) {        
        this.isAuthMenu = false
        return
      }
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10003/get_auth_menu_list`
      
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  
      console.log(reqParams)
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.authGroupList = response.data.data.auth_group_list
            this.isAuthMenu = true
            // this.pList = response.data.data.account_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            // this.pList = [];
            this.authGroupList = [];
            this.isAuthMenu = false
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    saveItems(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`
      var changeParams=this.changeIp(params)
      console.log('보내는 값')
      console.log(changeParams)
      axios.post(url, changeParams, this.$store.state.headers)
            .then((response) => {
                console.log(response)
                var resCode = response.data.res_code;
                var resMsg = response.data.res_msg;
                if(resCode == 200){
                //현재 목록에서 선택한 Item을 삭제한다.
                this.pList.unshift(params)
                this.$fire({
                        title: "등록 되었습니다.",
                        type : "success"})
                this.searchToButton(this.reqPagingInfo)
                }else{
                console.log('오류메세지')
                console.log(resMsg)
                this.$fire({
                        title: "등록 실패하였습니다.",
                        html: resMsg,
                        type : "error"})
                }
            })
            .catch((ex) => {
                this.$fire({
                        title: "등록 실패하였습니다.",
                        text: ex,
                        type : "error"})
            })

    },

    changeIp(values){
            let newParams={}
            newParams.onm_user_id=values.onm_user_id
            newParams.auth_group_id=values.auth_group_id
            newParams.cmd_type=values.cmd_type
            newParams.accept_ip=values.accept_ip.replace(" ","").split(',')
            return newParams
        },
    setToSearchParams(values) {
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToButton(params);
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

      if(params.onm_user_id !== undefined && params.onm_user_id !== ''){
        newParams.onm_user_id = params.onm_user_id
      }

      if(params.name !== undefined && params.name !== ''){
        newParams.name = params.name
      }

      if(params.auth_group_id !== undefined && params.auth_group_id !== ''){
        newParams.auth_group_id = params.auth_group_id
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
      
      newParams.date_yn=this.searchParam.date_yn

      return newParams
    },
    
  }
  
}
</script>

<style scoped>

</style>