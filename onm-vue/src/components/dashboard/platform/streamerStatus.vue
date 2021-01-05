<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <streamer-query v-on:search="searchToProcess"></streamer-query>
        <streamer-list v-bind:pList=pList></streamer-list>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import List from './streamer/streamerList'
import Query from './streamer/streamerQuery'

export default {
  components: {
    streamerList : List,
    streamerQuery : Query
  },
  data () {
    return {
      title: '스트리머 조회',
      pList: [
        {vo1:"2", vo2:"http", vo3:"192.168.91.162", vo4:"121.156.203.232", vo5:"test-tbstm2.ktvsaas.co.kr"
        ,vo6:"8087", vo7:"gigasurv", vo8:"Gigasurv@34", vo9:"1935", vo10:"1935"
        ,vo11:"8443", vo12:"http://192.168.91.162:58080", vo13:"N", vo14:"N", vo15:"8443"
        },
        {vo1:"1", vo2:"http", vo3:"192.168.91.161", vo4:"121.156.203.238", vo5:"test-tbstm11.ktvsaas.co.kr"
        ,vo6:"8087", vo7:"gigasurv", vo8:"Gigasurv@34", vo9:"1935", vo10:"1935"
        ,vo11:"8443", vo12:"http://192.168.91.162:58080", vo13:"Y", vo14:"Y", vo15:"8443"
        }  
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