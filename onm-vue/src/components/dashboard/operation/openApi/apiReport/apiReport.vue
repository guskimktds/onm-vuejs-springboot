<template>
    <v-container fluid>
      <v-card>
        <count-api-tab
         v-bind:cList=cList
        ></count-api-tab>
          <!-- v-on:search="searchToGraph" -->
          <api-report-query
          v-bind:param=param>
          </api-report-query>    
          <api-graph
          v-bind:param="checkDate(param)"
          >
          </api-graph>
          <api-table></api-table>
             <!-- <v-row>
        <v-col cols="6">
       
          <api-count
          dense 
            v-bind:pList=pList
            v-bind:resPagingInfo="resPagingInfo"
            @pagination="setToSearchParams"
          ></api-count>
        </v-col>
        <v-col cols="6">
          <service-count
          dense
            v-bind:storeList=storeList
            v-bind:storeResPagingInfo="storeResPagingInfo"
            @pagination="setToSearchParams"
          ></service-count>
        </v-col>
      </v-row> -->
      </v-card>
    </v-container>
</template>

<script>
import apiReportQuery from './apiReportQuery'
import CountApiTab from './countApiTab.vue'
import dateInfo from "../../../../utils/common"
import ApiGraph from './apiGraph.vue'
import ApiTable from './apiTable.vue'
import EventBus from '../../../../../EventBus'
import axios from "axios"

const headers={
'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
'Content-Type': 'application/json'
}
export default {
  components: {
    apiReportQuery,
    CountApiTab,
    ApiGraph,
    ApiTable,
    // ServiceCount,
    // ApiCount,
  },

  data () {
    return {
      param: {
        start_date: dateInfo().threeMonthDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      },
      pList: [],
      cList: [],

    }
  },

  methods: {   
        checkDate: function(value){
          console.log("DDDDDDDDDDDDDDDDDDDD")
            let newParams={}
            if(Number(value.start_date.replace(/-/g,""))-Number(value.end_date.replace(/-/g,""))>0){
              alert('형식에 맞는 날짜 검색값을 입력해주세요')
              newParams.start_date=dateInfo().lastMonthDefault
                newParams.end_date=dateInfo().currentMonthDefault
                this.param.start_date=dateInfo().threeMonthDashFormat
                this.param.end_date=dateInfo().currentDateDashFormat
            }else{
              newParams=value
            }
              console.log("vkflalxj"+JSON.stringify(newParams))
            return newParams;
        },
     searchCustomerApi: function(params){
      var reqParams = this.handleParams(params);
      // reqParams.site_id ='JHC_CTRL_001'
      console.log("api 사이트 아이디 " + reqParams.view_cnt+"페이징"+reqParams.page_no)

  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15113/get_site_open_api_access/api`
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
      
          this.cList = response.data.data.access_cnt;

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
  
  }
}
</script>

<style scoped>

</style>