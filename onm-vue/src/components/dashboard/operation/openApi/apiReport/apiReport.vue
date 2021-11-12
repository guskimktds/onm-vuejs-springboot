<template>
    <v-container fluid>
      <v-card>
        <count-api-tab></count-api-tab>
          <api-report-query
          v-bind:param=param>
          </api-report-query>    
          <api-graph
          v-bind:param="checkDate(param)"
          >
          </api-graph>
      </v-card>
    </v-container>
</template>

<script>
import apiReportQuery from './apiReportQuery'
import CountApiTab from './countApiTab.vue'
import dateInfo from "../../../../utils/common"
import ApiGraph from './apiGraph.vue'

export default {
  components: {
    apiReportQuery,
    CountApiTab,
    ApiGraph,
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
        }

  }
}
</script>

<style scoped>

</style>