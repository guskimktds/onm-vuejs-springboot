<template>
    <v-container fluid>
      <v-card>
        <!-- <device-query v-on:search="searchToButton"></device-query> -->
        <device-query
        @Items="saveItems"></device-query>
        <device-list v-bind:pList=pList></device-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceQuery from './deviceQuery'
import deviceList from './deviceList'

import axios from "axios"

export default {
  components:{
    deviceQuery,
    deviceList
  },
  data () {
    return {
      title: 'APP(Client) 단말 관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      // searchParam: { 
      //   app_version_id: '',
      //   // code_id: '',
      //   os_type: '',
      //   // code_type: ''
      // }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15010/get_app_info`
    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code
          var resMsg = response.data.res_msg
          if(resCode == 200){
            this.pList = response.data.data.app_info_list
            this.resPagingInfo = response.data.data.paging_info

          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  methods: {
    saveItems(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15011/set_app_info`

      axios.post(url,params,this.$store.state.headers)
        .then((response)=>{
          var resCode=response.data.res_code;
          var resMsg=response.data.res_msg;
          if(resCode==200){
            this.pList.unshift(params)
            this.$fire({
              title : "등록 되었습니다.",
              type : "success"})
          }else{
            this.$fire({
              title: "등록 실패하였습니다.",
              html: resMsg,
              type: "error"})
          }
        })
        .catch((ex)=>{
          this.$fire({
            title: "등록 실패하였습니다.",
            text: ex,
            type: "error"
          })
        })
    }
  },
 
}
</script>

<style scoped>
</style>