<template>
    <v-container fluid>
      <v-card>
        <query 
          v-on:search="searchToProcess"
          v-bind:param=searchParam
        ></query>

        <list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="setToSearchParams"
        ></list>
      </v-card>
    </v-container>
</template>

<script>
import List from './usrInfoList'
import Query from './usrInfoQuery'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13004/get_user_tel_list`;

export default {
  
  components: {
    List, Query
  },
  
  data () {
    return {
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        user_name: '',
        user_id: '',
        tel_no: ''
      },
      
    }
  },
  methods: {
    searchToProcess: function(params){

      var reqParams = this.handleParams(params);
      console.log(reqParams)
      if(!reqParams.start_date&&!reqParams.user_name&&!reqParams.user_id&&!reqParams.tel_no){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        
        if (resCode == 200) {
          this.pList = response.data.data.tel_no_list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
          this.pList = [];
          this.resPagingInfo = {};
          console.log('사용자 전화번호 데이터가 없습니다.');
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else {
          this.pList = [];
          this.resPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        // alert("Error")
      })
      .finally(function () {
        // always executed
      });
      }
    },

    setToSearchParams: function(values){
      console.log(values)
      var params = {
        page: values.page,
        itemsPerPage: values.itemsPerPage
      }

      this.searchToProcess(params)
    },

    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
      }
      console.log(this.searchParam.date_yn)

      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.resPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
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

      if (params.user_name !== undefined && params.user_name !== "") {
        newParams.user_name = params.user_name;
      } else if (
        this.searchParam.user_name !== undefined &&
        this.searchParam.user_name !== ""
      ) {
        newParams.user_name = this.searchParam.user_name;
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
      
      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>