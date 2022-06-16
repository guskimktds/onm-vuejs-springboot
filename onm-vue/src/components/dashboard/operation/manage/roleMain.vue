<template>
  <v-container fluid>
      <v-card>
        <role-query 
          v-on:search="searchToRoleMain"
          v-bind:param=searchParam
        ></role-query>
        <role-list 
        v-bind:rList=rList
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"></role-list>
       </v-card>
    </v-container>
</template>

<script>
import RoleList from './roleList'
import RoleQuery from './roleQuery'

import EventBus from '../../../../EventBus'
import axios from "axios"


export default {
  components: {
    RoleList,
    RoleQuery
  },
  data () {
    return {
      title: '메뉴그룹 조회',
      rList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
        auth_group_id: ''
      },
      resPagingInfo: {},
      searchParam: {
        auth_group_id: ''
      },

    }
  },

  methods: {
    searchToRoleMain: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10003/get_auth_menu_list`

      var reqParams = this.handleParams(params)

      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
        console.log('응답값')
          console.log(response)
          var resCode = response.data.res_code;
           
          if(resCode == 200){
            this.rList = response.data.data.auth_group_list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.rList = [];
            this.resPagingInfo = {};
            console.log('계정 정보 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.rList = [];
            this.resPagingInfo = {};
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    setToSearchParams(values) {
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToButton(params);
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

      if(params.auth_group_id !== undefined && params.auth_group_id !== ''){
        newParams.auth_group_id = params.auth_group_id
      }

      return newParams
    },
    
  }
  
}
</script>

<style scoped>

</style>