<template>
    <v-container fluid>
      <v-card>
        <stats-query 
          v-on:search="searchToProcess"
          v-bind:param=searchParam></stats-query>
        <stats-list 
          v-bind:pList=pList
          v-bind:pHeader=pHeader
         ></stats-list>
      </v-card>
    </v-container>
</template>


<script>
import StatsList from './productStatsList'
import StatsQuery from './productStatsQuery'
import dateInfo from '../../../../utils/common'

import EventBus from '../../../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};


export default {
  components: {
   StatsList,
   StatsQuery
  },
  data () {
    return {
      title: '상품 통계',
      pList: [],
      pHeader:[],

      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      },
    }
  },
  
  mounted(){
   this.searchToProcess(this.searchParam)
  },

  methods: {
    searchToProcess: function(params){
     var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11009/get_prod_stat`;
     
     var reqParams=this.handleParams(params)

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        
        if (resCode == 200) {
          this.pHeader=response.data.data.header_list;
          this.pList = response.data.data.prod_list;
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("상품 통계 데이터가 없습니다.");
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else {
          this.pHeader=[];
          this.pList = [];
        
          console.log("Error");
        }

      })
      .catch(function (error) {
        console.log(error);
        console.log("Error")
      })
      .finally(function () {
        // always executed
      });
    },

     handleParams: function (params) {
      
      var newParams ={
        start_date: params.start_date.replace(/-/g,""),
        end_date: params.end_date.replace(/-/g,"")
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
  },

}
</script>

<style scoped>

</style>