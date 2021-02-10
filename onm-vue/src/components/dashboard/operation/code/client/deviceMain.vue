<template>
    <v-container fluid>
      <v-card>
        <!-- <device-query v-on:search="searchToButton"></device-query> -->
        <device-query></device-query>
        <device-list v-bind:pList=pList></device-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceQuery from './deviceQuery'
import deviceList from './deviceList'

import axios from "axios"
import EventBus from '../../../../../EventBus';

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
  mounted: function() {[
    EventBus.$on('createItemApp', params => {
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15011/set_app_info`

      axios.post(url, params, this.$store.state.headers)
          .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              //현재 목록에서 선택한 Item을 삭제한다.
              console.log(params)
              this.pList.unshift(params)
            }else{
              alert(resCode + " / " + resMsg);
            }
          })
          .catch((ex) => {
            console.log('변경 실패',ex)
          })
    }),
    EventBus.$on('editedItemApp', (params, updateIndex) => {
      console.log(params, updateIndex)
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15011/set_app_info`

        axios.post(url, params, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                //현재 목록에서 선택한 item 을 변경해준다.
                this.pList.splice(updateIndex, 1, params)
              }else{
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('변경 실패',ex)
            })
      })
    ]

  }
}
</script>

<style scoped>
</style>