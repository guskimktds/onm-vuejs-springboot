<template>
  <div>
    <!-- <p>{{ title }}</p> -->
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <account-query v-on:search="searchToButton"></account-query>
        <account-list v-bind:accountList=list></account-list>
       </v-card>
    </v-container>
  </div>

</template>

<script>
import AccountList from './manage/accountList'
import AccountQuery from './manage/accountQuery'
//로그인 시 서버에서 불러오면 수정해야함
// import accountListMock from '../../../mock/accountListMock.json';
import axios from "axios"

const resourceHost = "http://localhost:3000"

export default {
  components: {
    AccountList,
    AccountQuery
  },
  data () {
    return {
      title: '계정 조회',
      // list: accountListMock
      list: []
    }
  },
  methods: {
    searchToButton: function(param){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(param));
            axios
                .get(`${resourceHost}/accountlist`)
                .then((result) => {
                  console.log(result)
                  this.list = JSON.stringify(result.data.menu)
                })
                .catch((ex) => {
                  console.log('조회 실패',ex)
                })
    }
  },
  created: function() {
    axios
        .get(`${resourceHost}/accountlist`)
        .then((result) => {
          console.log(result)
          console.log(JSON.stringify(result.data.menu))
          console.log(result.data.status)
          if(result.data.status === 200){
            this.list = JSON.stringify(result.data.menu)
          }
          else this.list = []
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>