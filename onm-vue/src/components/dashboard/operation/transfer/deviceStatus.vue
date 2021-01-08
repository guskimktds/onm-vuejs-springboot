<template>
  <!-- <div> -->
    <v-container fluid class="red ma-0">
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <device-status-query v-on:search="searchToButton"></device-status-query>
        <device-status-list v-bind:deviceList=list></device-status-list>
      </v-card>
    </v-container>
  <!-- </div> -->
</template>

<script>
import deviceStatusQuery from './deviceStatusQuery'
import deviceStatusList from './deviceStatusList'

//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"

export default {
  components:{
    deviceStatusQuery,
    deviceStatusList
  },
  data () {
    return {
      title: '단말상태 조회',
      list: []
    }
  },
  created: function() {
    axios
        .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`)
        .then((result) => {
          console.log(result)
          //this.list = JSON.parse(result.data.menu)
          this.list = result.data
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    searchToButton: function(params){
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
              params
            })
            .then((result) => {
              console.log(result)
              //this.list = JSON.parse(result.data.menu)
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

</style>