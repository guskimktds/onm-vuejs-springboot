<template>
    <v-container fluid>
      <v-card>
        <customer-api-query
          v-on:search="searchToProcess"
          v-bind:param=searchParam
        ></customer-api-query>

        <customer-api-list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="setToSearchParams"
        ></customer-api-list>
      </v-card>
    </v-container>
</template>

<script>
import customerApiQuery from './customerApiQuery'
import customerApiList from './customerApiList'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15111/get_site_open_api`;

export default {
  
  components: {
    customerApiQuery,
    customerApiList
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
        site_id: '',
        api_no: '',
      },
      
    }
  },
  methods: {
    searchToProcess: function(params){

      var reqParams = this.handleParams(params);
      console.log(reqParams)

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.api_list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
          this.pList = [];
          this.resPagingInfo = {};
          alert('사용자 API 데이터가 없습니다.');
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else {
          this.pList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      })
      .finally(function () {
        // always executed
      });
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

      if (params.site_id !== undefined && params.site_id !== "") {
        newParams.site_id = params.site_id;
      } else if (
        this.searchParam.site_id !== undefined &&
        this.searchParam.site_id !== ""
      ) {
        newParams.site_id = this.searchParam.site_id;
      }

      if (params.api_no !== undefined && params.api_no !== "") {
        newParams.api_no = params.api_no;
      } else if (
        this.searchParam.api_no !== undefined &&
        this.searchParam.api_no !== ""
      ) {
        newParams.api_no = this.searchParam.api_no;
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