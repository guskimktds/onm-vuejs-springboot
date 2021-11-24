<template>
    <v-container fluid>
      <v-card>
        <count-api-tab></count-api-tab>
          <!-- v-on:search="searchToGraph" -->
          <api-report-query
            v-bind:param="param">
          </api-report-query>    
          <api-graph
          v-bind:param="checkDate(param)"
          >
          </api-graph>

             <v-row>
        <v-col cols="6">
       
          <!-- <api-count
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
          ></service-count> -->
        </v-col>
      </v-row>
      </v-card>
    </v-container>
</template>

<script>
import apiReportQuery from './apiReportQuery'
import CountApiTab from './countApiTab.vue'
import dateInfo from "../../../../utils/common"
import ApiGraph from './apiGraph.vue'
import EventBus from '../../../../../EventBus'
// import ServiceCount from './serviceCount.vue'
// import ApiCount from './apiCount.vue'
// import axios from "axios"
export default {
  components: {
    apiReportQuery,
    CountApiTab,
    ApiGraph,
    // ServiceCount,
    // ApiCount,
  },

  data () {
    return {
      param: {
        start_date: dateInfo().threeMonthDashFormat,
        end_date: dateInfo().currentDateDashFormat,
      }
    }
  },
  methods: {   
    checkDate: function(value){
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

    searchAllGraph: function(){
      EventBus.$emit('search-graph', this.param);
    }
  }
}
</script>

<style scoped>

</style>