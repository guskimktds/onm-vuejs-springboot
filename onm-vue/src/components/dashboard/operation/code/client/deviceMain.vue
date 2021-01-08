<template>
  <div>
    <!-- <p>{{ title }}</p> -->
    <v-container fluid>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <device-query v-on:search="searchToButton"></device-query>
        <device-list v-bind:localCodeList=list></device-list>
      </v-card>

    </v-container>
    
    <!-- <router-view></router-view> -->
    <!-- <operation-history-query></operation-history-query>
    <operation-history-list v-bind:operationHistoryList=list></operation-history-list> -->
  </div>
</template>

<script>
import deviceQuery from './deviceQuery'
import deviceList from './deviceList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"
// import { eventBus } from '../../../../main'
import EventBus from '../../../../../EventBus';

export default {
  components:{
    deviceQuery,
    deviceList
  },
  data () {
    return {
      title: 'client 단말 관리',
      list: []
    }
  },
  created: function() {
    axios
        .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/device`)
        .then((result) => {
          console.log(result)
          this.list = result.data
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })

  },
  mounted: function() {[
    EventBus.$on('createItem', parameter => {
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode`, parameter)
            .then((result) => {
              console.log(result)
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }),
    EventBus.$on('editedItem', (parameter, index) => {
      // console.log(parameter, index)
          axios
                .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/update`, parameter )
                .then((result) => {
                  console.log(result)
                  // this.list = JSON.parse(result.data.menu)
                  // this.list = result.data
                  Object.assign(this.this.list[index], parameter)
                })
                .catch((ex) => {
                  console.log('조회 실패',ex)
                })
        })
    ]

  },
  methods: {
    searchToButton: function(params){
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/localcode/query`, {
              params
            })
            .then((result) => {
              console.log(result)
              this.list = result.data
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    }    
  }
}
</script>

<style scoped>
.container {
  
}
</style>