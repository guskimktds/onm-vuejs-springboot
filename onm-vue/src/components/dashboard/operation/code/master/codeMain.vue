<template>
    <v-container fluid>
      <v-card>
        <code-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></code-query>
        <code-list v-bind:pList=pList></code-list>
      </v-card>

    </v-container>
</template>

<script>
import CodeQuery from './codeQuery'
import CodeList from './codeList'

//로그인 시 서버에서 불러오면 수정해야함
import axios from "axios"
import EventBus from '../../../../../EventBus';

export default {
  components:{
    CodeQuery,
    CodeList
  },
  data () {
    return {
      title: '코드 마스터 관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        code_master_id: '',
        code_master_name: ''
      }
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15015/get_code_master`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list
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
     EventBus.$on('createItemMasterCode', params => {
        console.log('codeMain.vue eventbus : param : ', params)
        console.log(params)
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15016/set_code_master`

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
    })
  },
  methods: {
    searchToButton: function(params){
    console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15015/get_code_master`

    //params : 페이징 + 검색조건
    var reqParams = this.handleParams(params)  

      axios.post(url, reqParams, this.$store.state.headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.list;
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

    handleParams: function(params){
      let newParams = {}
      if(params.page_no === undefined || params.page_no === ''){
        newParams.page_no = this.reqPagingInfo.page_no
      }else{
        newParams.page_no = params.page_no
      }

      if(params.view_cnt === undefined || params.view_cnt === ''){
        newParams.view_cnt = this.reqPagingInfo.view_cnt
      }else{
        newParams.view_cnt = params.view_cnt
      }

      if(params.code_master_id !== undefined && params.code_master_id !== ''){
        newParams.code_master_id = params.code_master_id
      }

      if(params.code_master_name !== undefined && params.code_master_name !== ''){
        newParams.code_master_name = params.code_master_name
      }

      return newParams
    }

    
  },

}
</script>

<style scoped>

</style>