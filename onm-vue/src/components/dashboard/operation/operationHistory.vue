<template>
  <div>
    <p>{{ title }}</p>
    <!-- <router-view></router-view> -->
    <operation-history-query></operation-history-query>
    <operation-history-list v-bind:operationHistoryList=list></operation-history-list>
  </div>
</template>

<script>
import OperationHistoryQuery from './operationHistoryQuery'
import OperationHistoryList from './operationHistoryList'

//로그인 시 서버에서 불러오면 수정해야함
import operationMenuMock from '../../../mock/operationListMock.json';

export default {
  components:{
    OperationHistoryQuery,
    OperationHistoryList
  },
  data () {
    return {
      title: '처리 이력',
      list: operationMenuMock
    }
  }
}
</script>

<style scoped>

</style>