<template>
    <v-container fluid>
      <v-card>
        <count-api-tab
        v-bind:apiCountInfo="apiCountInfo"
        ></count-api-tab>
          <!-- v-on:search="searchToGraph" -->
          <api-report-query
            v-bind:param="param">
          </api-report-query>    
          <api-graph
          v-bind:param="checkDate(param)"
          >
          </api-graph>
          <api-table
          v-bind:param="param"
          ></api-table>

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
  },

  data () {
    return {
      param: {
        start_date: dateInfo().currentDateDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      },
      pList: [],
      cList:[],
      apiCountInfo:{
        total:'',
        unusedApi:0,
        usedApi:0,
        arr:[]
      }
    }
  },
  created(){
    this.fillApiCountTab()
  },

  methods: {   
        checkDate: function(value){
          console.log("DDDDDDDDDDDDDDDDDDDD")
            let newParams={}
            if(Number(value.start_date.replace(/-/g,""))-Number(value.end_date.replace(/-/g,""))>0){
                alert('형식에 맞는 날짜 검색값을 입력해주세요')
                this.param.start_date=dateInfo().threeMonthDashFormat
                this.param.end_date=dateInfo().currentDateDashFormat
            }else{
                newParams=value
            }
            return newParams;
        },

     fillApiCountTab: function(){
      // console.log("!!!!!!!!!!!!!!!!!!api 사이트 아이디 " + reqParams.view_cnt+"페이징"+reqParams.page_no)

       var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13049/get_total_apiList`
      axios
      .post(url, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
      
        this.cList = response.data.data.comm_code_list;  
        this.apiCountInfo.total = 0;
        this.apiCountInfo.unusedApi = 0;
        this.apiCountInfo.unusedApi = 0;
        
        this.apiCountInfo.total = this.cList.length;
         for(var i = 0; i < this.cList.length; i++){
            if(this.cList[i].use_yn === 'Y'){
              this.apiCountInfo.usedApi += 1;
            }else if(this.cList[i].use_yn === 'N'){
              this.apiCountInfo.unusedApi += 1;
            }
          }
          for(var j in this.cList){
            var obj = new Object();
            obj.key = this.cList[j].api_no
            obj.value = this.cList[j].api_no
          this.apiCountInfo.arr.push(obj);
        }

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
  

  }
}
</script>

<style scoped>

</style>