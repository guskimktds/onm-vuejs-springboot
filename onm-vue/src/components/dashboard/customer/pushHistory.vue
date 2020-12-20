<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <pushHistory-query v-on:search="searchToPushHistory"></pushHistory-query>
    <pushHistory-list v-bind:pList=pList></pushHistory-list>
  </div>

</template>

<script>
import PushHistoryList from './push-history/pushHistoryList'
import PushHistoryQuery from './push-history/pushHistoryQuery'

export default {
  components: {
    'pushHistory-list': PushHistoryList,
    'pushHistory-query': PushHistoryQuery
  },
  data () {
    return {
      title: '푸시 발송 이력',
      pList: [
        {pushHistoryId:"0000122668", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId:"1000001226681001", storeName:"홍길동"},
        {pushHistoryId:"000012268", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId: "1000001226681001", storeName :"홍길동"},
        {pushHistoryId:"00001268", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId: "1000001226681001", storeName:"홍길동"},
        {pushHistoryId:"0002668", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId:"1000001226681001", storeName:"홍길동"},
      ]
    }
  },
  methods: {
    searchToPushHistory: function(param){
      console.log("부모 메소드 searchToPushHistory 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>