<template>
  <div>
    <v-container fluid>
      <v-card>
        <user-order-detail-query v-on:search="searchToUserOrderDetail"></user-order-detail-query>
        <!-- <user-order-detail-list v-bind:pList=pList></user-order-detail-list> -->
        <user-order-detail-object v-bind:pObject=pObject></user-order-detail-object>
      </v-card>
    </v-container>
  </div>

</template>

<script>
// import UserOrderDetailList from './user/order-detail/userOrderDetailList'
import UserOrderDetailObject from './user/order-detail/userOrderDetailObject'
import UserOrderDetailQuery from './user/order-detail/userOrderDetailQuery'

import axios from "axios"
//import EventBus from '../../../EventBus';

export default {
  components: {
    // UserOrderDetailList,
    UserOrderDetailObject,
    UserOrderDetailQuery
  },
  data () {
    return {
      title: '사용자 청약 오더 상세',
      pList: [],
      pObject: {},
      isArrayed : true
    }
  },
  methods: {
    searchToUserOrderDetail: function(params){
      console.log("부모 메소드 searchToUserOrderDetail 호출: "+JSON.stringify(params));

      var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_12002/get_user_subs_detail'
    // var params = {
    //   page_no: 1,
    //   view_cnt: 5
    // }
    var headers = {
      'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      'Content-Type': 'application/json'
    }

        axios.post(url, params, headers)
            // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
            //   params
            // })
            .then((result) => {
              console.log(result)
              //this.list = JSON.parse(result.data.menu)
              console.log(Array.isArray(result.data.data))
              if(Array.isArray(result.data.data)){
                this.pList = result.data.data                
              }else{
                console.log(result.data.data)
                this.pObject = result.data.data
                this.isArrayed = false
              }
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