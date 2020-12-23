<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <userOrderPhone-query v-on:search="searchToUserOrderPhone"></userOrderPhone-query>
    <userOrderPhone-list v-bind:pList=pList></userOrderPhone-list>
  </div>

</template>

<script>
import UserOrderPhoneList from './user-order-phone/userOrderPhoneList'
import UserOrderPhoneQuery from './user-order-phone/userOrderPhoneQuery'

export default {
  components: {
    'userOrderPhone-list': UserOrderPhoneList,
    'userOrderPhone-query': UserOrderPhoneQuery
  },
  data () {
    return {
      title: '사용자 청약 전화번호',
      pList: [
        {tranId:"GPNA_20201029133825838_LVSPWS0001", contractType:"M", phoneNumber:"01021203500", createDate: "2020-10-29 13:38:04.427517"},
        {tranId:"GPNA_20201029133825838_LVSPWS0002", contractType:"M", phoneNumber:"01021203500", createDate: "2020-10-29 13:38:04.427517"},
        {tranId:"GPNA_20201029133825838_LVSPWS0003", contractType:"M", phoneNumber:"01021203500", createDate: "2020-10-29 13:38:04.427517"},
        {tranId:"GPNA_20201029133825838_LVSPWS0004", contractType:"M", phoneNumber:"01021203500", createDate: "2020-10-29 13:38:04.427517"},
      ]
    }
  },
  methods: {
    searchToUserOrderPhone: function(param){
      console.log("부모 메소드 searchToUserOrderPhone 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>