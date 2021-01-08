<template>
  <div>
    <!-- <p>{{ title }}</p>-->
    <v-container fluid>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <code-query v-on:search="searchToButton"></code-query>
        <code-list v-bind:codeList=list></code-list>
      </v-card>

    </v-container>
    
    <!-- <router-view></router-view> -->
    <!-- <operation-history-query></operation-history-query>
    <operation-history-list v-bind:operationHistoryList=list></operation-history-list> -->
  </div>
</template>

<script>
import CodeQuery from './codeQuery'
import CodeList from './codeList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"
// import { eventBus } from '../../../../main'
import EventBus from '../../../../../EventBus';

export default {
  components:{
    CodeQuery,
    CodeList
  },
  data () {
    return {
      title: '코드관리',
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

    // EventBus.$on('createItem', parameter => {
    //     axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`, parameter)
    //         .then((result) => {
    //           console.log(result)
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    // })
  },
  mounted: function() {
     EventBus.$on('createItem', parameter => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        axios
            .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code`, parameter)
            .then((result) => {
              console.log(result)
              // this.list = JSON.parse(result.data.menu)
              // this.list = result.data
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
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
    },
    // saveToData: function(){
    //   console.log('saveToData Method call : ',process.env);
    //   axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone/query`, {       
    //               params
    //         })
    //         .then((result) => {
    //           console.log(result)
    //           // this.list = JSON.parse(result.data.menu)
    //           this.list = result.data
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    // }

    
  },
}
</script>

<style scoped>

</style>