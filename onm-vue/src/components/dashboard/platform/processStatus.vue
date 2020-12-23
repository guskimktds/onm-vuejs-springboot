<template>
  <div>
    <p class="title">{{ title }}</p>
    <process-query v-on:search="searchToProcess"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import ProcessList from './process/processList'
import ProcessQuery from './process/processQuery'
//로그인 시 서버에서 불러오면 수정해야함
import processMock from '../../../mock/processMock.json';


export default {
  components: {
    'process-list': ProcessList,
    'process-query': ProcessQuery
  },
  data () {
    return {
      title: '프로세스 현황 화면',
      pList: processMock
    }
  },
  methods: {
    searchToProcess: function(param){
      console.log("부모 메소드 searchToProcess 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>