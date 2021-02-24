<template>
    <v-container fluid>
        <v-card>
            <masking-history-query></masking-history-query>
            <masking-history-list v-bind:pList=pList></masking-history-list>
        </v-card>
    </v-container>
</template>

<script>
import maskingHistoryQuery from './maskingHistoryQuery'
import maskingHistoryList from './maskingHistoryList'

import axios from "axios"
import EventBus from '../../../../EventBus'

export default {
  components: {
       maskingHistoryQuery,
       maskingHistoryList 
       },
       data(){
           return{
            title: 'masking 이력 관리',
            pList: [],
            reqPagingInfo:{
                page_no:1,
                view_cnt:10
            },
            resPagingInfo: {},
           }
       },

  created: function() {
      console.log('시작')
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
              this.$fire({
                       title: "등록 되었습니다.",
                       type : "success"})
            }else{
              this.$fire({
                       title: "등록 실패하였습니다.",
                       html: resMsg,
                       type : "error"})
            }
          })
          .catch((ex) => {
            this.$fire({
                       title: "등록 실패하였습니다.",
                       text: ex,
                       type : "error"})
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