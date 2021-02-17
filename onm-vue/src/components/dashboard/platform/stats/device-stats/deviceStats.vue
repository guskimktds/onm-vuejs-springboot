<template>
    <v-container fluid>
      <v-card>

        <status-query 
          v-on:search="searchToProcess"
          v-bind:param=searchParam></status-query>

        <stats-list
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo

          @pagination="setToSearchParams"></stats-list>

      </v-card>
    </v-container>
</template>


<script>
import StatsList from './deviceStatsList'
import StatusQuery from './deviceStatsQuery'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

export default {
  components: {
    StatsList,
    StatusQuery
  },
  data () {
    return {
      title: '청약 통계',
      pList: [],
      reqPagingInfo:{
        start_date: "19000101",
        end_date: "20210201",
      },
      resPagingInfo:{},
      searchParam: {
        dateRangeText: '',
        approveDate: ["", ""],
      },

    }
  },
  created:function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11007/get_subs_stat`
    
    var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.subs_stat_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },

  methods: {
    searchToProcess: function(params){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_11007/get_subs_stat`

      var reqParams = this.handleParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.subs_stat_list;
          this.resPagingInfo = response.data.data.paging_info;
        } else {
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
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToVaCamCount(params)
    },
    handleParams: function (params) {

      let newParams = {};

      if (params.appoint_date !== undefined && params.appoint_date !== "") {
        newParams.appoint_date = params.appoint_date;
      } else if (
        this.searchParam.appoint_date !== undefined &&
        this.searchParam.appoint_date !== ""
      ) {
        newParams.appoint_date = this.searchParam.appoint_date;
      }

      return newParams;
    },
    
  }
}
</script>

<style scoped>

</style>