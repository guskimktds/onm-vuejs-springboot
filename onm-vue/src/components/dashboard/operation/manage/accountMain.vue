<template>
  <v-container fluid>
      <v-card>
        <account-query 
          v-on:search="searchToButton"
          @searchToAuthMenu="searchToAuthMenuButton"
          v-bind:param=searchParam
        ></account-query>
        <account-list v-bind:pList=pList></account-list>
        <auth-menu-list v-if=isAuthMenu v-bind:authGroupList=authGroupList></auth-menu-list>
       </v-card>
    </v-container>

</template>

<script>
import AccountList from './accountList'
import AccountQuery from './accountQuery'
import AuthMenuList from './authMenuList'
import axios from "axios"
import EventBus from '../../../../EventBus'

// const resourceHost = "http://localhost:3000"

// const API_URL = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}`

export default {
  components: {
    AccountList,
    AccountQuery,
    AuthMenuList
  },
  data () {
    return {
      title: '계정 조회',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        onm_user_id: '',
        name: '',
        auth_group_id: ''
      },
      authGroupList:[],
      isAuthMenu: false
    }
  },
  created: function() {
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15001/get_account`

      // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    axios
      .post(url, params, this.$store.state.headers)
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
  mounted: function() {
     EventBus.$on('createItemAccount', params => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

        axios.post(url, params, this.$store.state.headers)
          .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              //현재 목록에서 선택한 Item을 삭제한다.
              this.pList.unshift(params)
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
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15001/get_account`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  
      console.log(reqParams)
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            // this.authGroupList = response.data.data.auth_group_list
            // this.isAuthMenu = true
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            // this.authGroupList = [];
            // this.isAuthMenu = false
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    searchToAuthMenuButton: function(params){
      console.log("부모 메소드 searchToAuthMenuButton 호출: "+JSON.stringify(params));
      if(this.isAuthMenu) {        
        this.isAuthMenu = false
        return
      }
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10003/get_auth_menu_list`
      
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  
      console.log(reqParams)
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.authGroupList = response.data.data.auth_group_list
            this.isAuthMenu = true
            // this.pList = response.data.data.account_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            // this.pList = [];
            this.authGroupList = [];
            this.isAuthMenu = false
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

      if(params.onm_user_id !== undefined && params.onm_user_id !== ''){
        newParams.onm_user_id = params.onm_user_id
      }

      if(params.name !== undefined && params.name !== ''){
        newParams.name = params.name
      }

      if(params.auth_group_id !== undefined && params.auth_group_id !== ''){
        newParams.auth_group_id = params.auth_group_id
      }

      return newParams
    }
  }
  
}
</script>

<style scoped>

</style>