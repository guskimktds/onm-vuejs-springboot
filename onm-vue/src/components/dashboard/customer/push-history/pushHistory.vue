<template>
  
<div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <pushHistory-query
          v-on:search="searchToPushHistory"
        ></pushHistory-query>
        <pushHistory-list v-bind:List="list"></pushHistory-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import PushHistoryList from './pushHistoryList'
import PushHistoryQuery from './pushHistoryQuery'

import axios from "axios";

export default {
  components: {
    PushHistoryList,
    PushHistoryQuery
  },
  data () {
    return {
      title: '푸시 발송 이력',
      list: [],
      // pList: [
      //   {pushHistoryId:"0000122668", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId:"1000001226681001", storeName:"홍길동"},
      //   {pushHistoryId:"000012268", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId: "1000001226681001", storeName :"홍길동"},
      //   {pushHistoryId:"00001268", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId: "1000001226681001", storeName:"홍길동"},
      //   {pushHistoryId:"0002668", usrId:"0012484661", alarmId:"4441275", alarmInfo: "카메라1에서 카메라 훼손이 감지되었습니다.", alarmTagName: "카메라 회손 감지", alarmStartTime:"2020-11-03 02:00:04.173138", alarmEndTime: "2020-11-03 02:00:04.173138", camId:"1000001226681001", storeName:"홍길동"},
      // ]
    }
  },
  created: function () {
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-push-history`)
      .then((result) => {
        console.log(result);
        // this.list = JSON.parse(result.data.menu)
        this.list = result.data;
      })
      .catch((ex) => {
        console.log("조회 실패", ex);
      });
  },
  methods: {
    searchToPushHistory: function(params){
      console.log("부모 메소드 searchToPushHistory 호출: "+JSON.stringify(params));
    console.log(process.env);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-push-history/query`,
          {
            params,
          }
        )
        .then((result) => {
          console.log(result);
          // this.list = JSON.parse(result.data.menu)
          this.list = result.data;
        })
        .catch((ex) => {
          console.log("조회 실패", ex);
        });
    }
  }
}
</script>

<style scoped>

</style>