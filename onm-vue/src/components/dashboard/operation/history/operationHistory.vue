<template>
  <div>
    <!-- <p>{{ title }}</p>-->
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <operation-history-query v-on:search="searchToButton"></operation-history-query>
        <operation-history-list v-bind:operationHistoryList=list></operation-history-list>
      </v-card>

    </v-container>
    
    <!-- <router-view></router-view> -->
    <!-- <operation-history-query></operation-history-query>
    <operation-history-list v-bind:operationHistoryList=list></operation-history-list> -->
  </div>
</template>

<script>
import OperationHistoryQuery from './operationHistoryQuery'
import OperationHistoryList from './operationHistoryList'

//로그인 시 서버에서 불러오면 수정해야함
//import operationMenuMock from '../../../mock/operationListMock.json';
import axios from "axios"

export default {
  components:{
    OperationHistoryQuery,
    OperationHistoryList
  },
  data () {
    return {
      title: '처리 이력',
      list: []
    }
  },
  created: function() {
    axios
        .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/operation-history`)
        .then((result) => {
          console.log(result)
          this.list = JSON.parse(result.data.menu)
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    searchToButton: function(){
        axios
            .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/operation-history`)
            .then((result) => {
              console.log(result)
              this.list = JSON.parse(result.data.menu)
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }
  },
}
</script>

<style scoped>

</style>