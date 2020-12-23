<template>
  <div>
    <p>{{ title }}</p>
    <account-query v-on:search="searchToButton"></account-query>
    <account-list v-bind:accountList=list></account-list>
  </div>

</template>

<script>
import AccountList from './manage/accountList'
import AccountQuery from './manage/accountQuery'
//로그인 시 서버에서 불러오면 수정해야함
import accountListMock from '../../../mock/accountListMock.json';


export default {
  components: {
    AccountList,
    AccountQuery
  },
  data () {
    return {
      title: '계정 조회',
      list: accountListMock
    }
  },
  methods: {
    searchToButton: function(param){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>
@import '~@/assets/body.css';
</style>