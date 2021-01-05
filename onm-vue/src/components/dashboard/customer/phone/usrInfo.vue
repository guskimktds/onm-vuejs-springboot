<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar primary dense>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <usrInfo-query v-on:search="searchToUsrInfo"></usrInfo-query>
        <usrInfo-list v-bind:List=list></usrInfo-list>
      </v-card> 
    </v-container>
  </div>
</template>

<script>
import UsrInfoList from './usrInfoList'
import UsrInfoQuery from './usrInfoQuery'

import axios from "axios"

export default {
  components: {
    UsrInfoList,
    UsrInfoQuery
  },
  data () {
    return {
      title: '사용자 전화번호',
      list: []
      // pList: [
      //   {usrId:"0012484660", phoneNumber:"01011101110", numberType: "M", usrName: "홍길동", subId:800124846607000, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""},
      //   {usrId:"0012484661", phoneNumber:"01011101112", numberType: "S", usrName: "홍길순", subId:800124846607001, alarmAuth:"Y", approve:"Y", approveDate:"2020-11-03 02:00:04.173138", statusCode: "S", mgtCode: "S", etc: ""}
      // //Legacy octal literals are not allowed in strict mode 로 문자열처리
      // ]
    }
  },
  created: function(){
    axios
      .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone`)
      .then((result) => {
        console.log(result)
        this.list = JSON.parse(result.data.menu)
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
  },
  methods: {
    searchToUsrInfo: function(param){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(param));
      console.log(process.env);
      axios
            .get(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone`)
            .then((result) => {
              console.log(result)
              this.list = JSON.parse(result.data.menu)
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