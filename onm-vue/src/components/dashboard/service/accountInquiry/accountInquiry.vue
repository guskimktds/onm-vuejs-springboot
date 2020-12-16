<style src="../../../../css/body.css"></style>

<template>
  <div>
    <p>{{ title }}</p>
    <process-query v-on:search="searchToProcess"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>

</template>

<script>
import List  from './accountInquiryList'
import Query from './accountInquiryQuery'

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  
  data(){
    return {
      title: '프로세스 현황 화면',
      pList: [
        {vo1: '91240282', vo2: '홍길동', vo3: "관리자", vo4: '2020-11-13 07:34:47', vo5:'2020-11-09 21:26:58', vo6:"홍길동"},
        {vo1: '91240283', vo2: '홍길순', vo3: "일반사용자", vo4: '2020-11-12 15:49:14', vo5:'2020-11-09 07:05:00', vo6:"홍길동"},
        {vo1: '91240284', vo2: '이대호', vo3: "일반사용자", vo4: '2020-11-12 15:25:39', vo5:'2020-11-09 21:26:58', vo6:"홍길순"},
        {vo1: '91240285', vo2: '박병호', vo3: "관리자", vo4: '2020-11-12 15:14:53', vo5:'2020-11-09 13:11:33', vo6:"홍길순"},
        {vo1: '91240286', vo2: '류현진', vo3: "운영자", vo4: '2020-11-11 17:13:50', vo5:'2020-11-09 17:32:51', vo6:"홍길순"},
        {vo1: '91240287', vo2: '손흥민', vo3: "운영자", vo4: '2020-11-09 21:24:17', vo5:'2020-11-09 13:07:53', vo6:"홍길순"},
        {vo1: '91240288', vo2: '김승우', vo3: "운영자", vo4: '2020-11-09 07:00:00', vo5:'2020-11-09 22:26:08', vo6:"홍길순"},
    ]
    }
  },

  methods: {
    searchToProcess: function(param){
      console.log("부모 메소드 searchToProcess 호출: "+JSON.stringify(param));
    }
  }

}
</script>