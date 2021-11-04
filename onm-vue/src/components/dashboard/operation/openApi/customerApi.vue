<template>
    <v-container fluid>
      <v-card>
          <!-- v-on:search="searchToProcess" -->
        <customer-api-query
          v-bind:param="searchParam"
        ></customer-api-query>
        <count-api></count-api>
    
          <v-row>
<v-col>
        <customer-api-list
          v-bind:resPagingInfo="resPagingInfo"
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
   
    setToSearchParams: function(values){
      console.log(values)
      var params = {
        page: values.page,
        itemsPerPage: values.itemsPerPage
      }

     EventBus.$on('getCustomerApiList',params)  
    }
  }
  
}
</script>

<style scoped>

</style>