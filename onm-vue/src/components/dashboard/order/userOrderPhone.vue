<template>
  <div>
    <v-container fluid>
      <v-card>
        <user-order-phone-query v-on:search="searchToUserOrderPhone"
        v-bind:param=searchParam></user-order-phone-query>
        <user-order-phone-list v-bind:phList=phList
        v-bind:phPagingInfo=phPagingInfo
        @pagination="setToSearchParams"
        ></user-order-phone-list>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import UserOrderPhoneList from './user-order-phone/userOrderPhoneList'
import UserOrderPhoneQuery from './user-order-phone/userOrderPhoneQuery'
import dateInfo from '../../utils/common'

import EventBus from '../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderPhoneList,
    UserOrderPhoneQuery,
  },
  data () {
    return {
      title: '사용자 청약 전화번호',
      phList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      phPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        telno:'',
        guid:'',
        is_masking:'',
      }
    }
  },

  methods: {
    searchToUserOrderPhone: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)    
      console.log('요청하는 파람')
      console.log(reqParams)
      if(!reqParams.start_date&&!reqParams.telno&&!reqParams.guid){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, headers)
      // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
      //   params
      // })
      .then((response) => {
        
        console.log(response.data)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.phList = response.data.data.tel_no_list;
          this.phPagingInfo = response.data.data.paging_info
        }else if(resCode==204){
            this.phList = [];
            this.phPagingInfo = {};
            alert("사용자 청약 전화번호 데이터가 없습니다.");
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.phList = [];
          this.phPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      }
    },

    setToSearchParams:function(values){
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      this.searchToUserOrderPhone(params)
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
      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }

      if(params.telno !== undefined && params.telno !== ''){
        newParams.telno = params.telno
      }else if(
        this.searchParam.telno!==undefined&&
        this.searchParam.telno!==""
      ){
        newParams.telno=this.searchParam.telno
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
      return newParams
    }
  }
}
</script>

<style scoped>

</style>