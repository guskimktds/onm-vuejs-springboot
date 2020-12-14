<template>
  <div>
    <p>{{ title }}</p>
    <process-query v-bind:search="search"></process-query>
    <process-list v-bind:pList=pList></process-list>
  </div>
</template>

<script>
import ProcessList from './process/processList'
import ProcessQuery from './process/processQuery'

export default {
  components: {
    'process-list': ProcessList,
    'process-query': ProcessQuery
  },
  data () {
    return {
      title: '프로세스 현황 화면',
      pList: [
        { code: '1', type: 'STM01', name: "STREAMER", status: 'U', lastDate:'2020-12-14 10:20:11'},
        { code: '2', type: 'INT', name: "LV_SAAS_INT", status: 'U', lastDate:'2019-12-14 10:20:11'},
        { code: '3', type: 'CTRL', name: "LV_SAAS_CTRL", status: 'U', lastDate:'2020-12-14 10:20:11'},
        { code: '4', type: 'VA', name: "VMS", status: 'U', lastDate:'2020-11-14 10:20:11'},
        { code: '5', type: 'STM02', name: "STREAMER", status: 'U', lastDate:'2018-12-14 10:20:11'},
        { code: '6', type: 'STM03', name: "STREAMER", status: 'U', lastDate:'2019-09-14 10:20:11'},
        { code: '7', type: 'STM04', name: "STREAMER", status: 'U', lastDate:'2020-10-14 10:20:11'},
      ]
    }
  },
  methods: {
    search: function(){
      console.log("부모 메소드 search 호출");
    }
  }
}
</script>

<style scoped>

</style>