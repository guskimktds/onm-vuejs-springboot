<template>
    <v-container fluid>
      <v-card>
        <customer-transfer-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></customer-transfer-query>
        <customer-transfer-list v-bind:pList=pList></customer-transfer-list>
      </v-card>
    </v-container>
</template>

<script>
import customerTransferQuery from './customerTransferQuery'
import customerTransferList from './customerTransferList'

import axios from "axios"
import EventBus from '../../../../EventBus';

export default {
  components:{
    customerTransferQuery,
    customerTransferList
  },
  data () {
    return {
      title: '고객이전 조회',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        start_date: '',
        end_date: '',
        user_id: '',
        status_code: ''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15012/get_user_mig_info`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.user_mig_info_list;
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
  mounted: function() {
     EventBus.$on('createItemTransfer', params => {
        console.log(params)
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15013/move_local`

        axios.post(url, params, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                //현재 목록에서 선택한 Item을 삭제한다.
                console.log(params)
                // this.pList.unshift(params)
              }else{
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('변경 실패',ex)
            })
    })
  },
  methods: {
    searchToButton: function(params){
      console.log(params);
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15012/get_user_mig_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, this.$store.state.headers)
          .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pList = response.data.data.user_mig_info_list;
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
    }
  }
}
</script>

<style scoped>

</style>