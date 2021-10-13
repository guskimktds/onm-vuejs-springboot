<template>
    <v-container fluid>
      <v-card>
        <gw-accept-query
          v-on:gwid="changeGwId"
        ></gw-accept-query>
        <local-code-list v-bind:pList=pList></local-code-list>
      </v-card>
    </v-container>
</template>

<script>
import localCodeList from './localCodeList.vue'
import EventBus from '../../../../../EventBus'
import axios from "axios"
import GwAcceptQuery from './gwAcceptQuery.vue'

export default {
    components:{
        localCodeList,
        GwAcceptQuery
    },
    data () {
    return {
      title: '로컬 국사 정보 관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      changeParam: {
        local_gw_id: ""
      }
    }
},

mounted: function() {
    var params = this.reqPagingInfo
    this.searchToButton(params)
  },

  methods: {
    searchToButton: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`
      var reqParams = params
        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.local_gw_list;
            this.resPagingInfo = response.data.data.paging_info
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
             EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
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
    changeGwId: function(params){
      this.$fire({
        title: "변경하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니오',
      }).then(result=>{
        if(result.value){
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15019/set_user_acceptance`
          this.changeParam.local_gw_id=params
            axios.post(url, this.changeParam, this.$store.state.headers)
            .then((response) => {
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              console.log(response)
              if(resCode == 200){
                alert('변경이 완료되었습니다!')
              }else{
                alert('예기치 않은 문제가 생겨 작업이 완료되지 않았습니다.\n'+resMsg);
              }
            })
            .catch((ex) => {
              console.log(ex)
            })
        }else{
          console.log('취소')
        }
      })
    }
  }
    
}
</script>
