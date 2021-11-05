<template>
    <v-container fluid>
      <v-card>
          <!-- v-on:search="searchToProcess" -->
        <customer-api-query
          v-on:search="searchToDeviceOrderInfo"
          v-bind:param="searchParam"
        ></customer-api-query>
        <count-api
          v-bind:cList=cList 
        >
        </count-api>
      <v-row>
        <v-col>
          <customer-api-list
            v-bind:pList=pList
            v-bind:resPagingInfo=resPagingInfo
            @pagination="setToSearchParams"
          ></customer-api-list>
        </v-col>
        <v-col>
          <store-api-list 
            v-bind:pList=pList
            v-bind:resPagingInfo="resPagingInfo"
            @pagination="setToSearchParams"
          ></store-api-list>
        </v-col>
      </v-row>

      </v-card>     
    </v-container>
</template>

<script>
import customerApiQuery from './customerApiQuery'
import customerApiList from './customerApiList'
import StoreApiList from './storeApiList.vue'
import countApi from './countApiTab.vue'
import dateInfo from "../../../utils/common"
import EventBus from '../../../../EventBus'
import axios from "axios"
  const headers={
'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
'Content-Type': 'application/json'
}
export default {
  
  components: {
    customerApiQuery,
    customerApiList,
    countApi,
    StoreApiList
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
        start_date: dateInfo().threeMonthDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      }
    }
  },
  methods: {   
    searchSiteApi: function(params){
      var reqParams = this.handleParams(params);
      console.log(reqParams)
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15112/get_site_open_api_access`
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.cList = response.data.data.site_openapi_access;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
          this.cList = [];
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
          this.cList = [];
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
   searchCustomerApi: function(params){
       console.log('이벤트 버스 타기')
      var reqParams = this.handleParams(params);
      console.log(reqParams)
  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15113/get_site_open_api_acess/api`
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
    handleParams: function (params) {
      console.log(params);
      let newParams = {};
  
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
        if(params.end_date !== undefined && params.end_date !== ''){
          newParams.end_date = params.end_date.replace(/-/g,"")
        }else if(
          this.searchParam.end_date!==undefined&&
          this.searchParam.end_date!==""
        ){
          newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
        }
      return newParams;
    }
  }
}
</script>

<style scoped>

</style>