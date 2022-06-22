<template>
  <v-container fluid>
      <v-card>
        <role-query 
          v-on:search="searchToRoleMain"
          v-bind:param=searchParam
          v-bind:authMenuOptions="authMenuOptions"
        ></role-query>
        <role-list 
        v-bind:menuList=menuList
        v-bind:authList=authList
        @updateMenu="updateMenu"
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
      menuList: [],
      authList: [],
      searchParam: {
        auth_group_id: ''
      },
      defaultParam: {
        auth_group_id: ''
      },
      authMenuOptions:[],
      updateParam:{
        auth_group_id:'',
        list:[]
      }
    }
  },
  beforeCreate: function(){
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15048/get_all_auth_list`)
    .then((response) => {
      console.log(response)
      this.authMenuOptions = response.data.data.list; 
    })
    .catch(function (error) {
        console.log(error);
        console.log("권한메뉴 정보 조회 실패")
      })
      .finally(function () {
        // always executed
      });
  },
  created: function() {
    this.defaultParam.auth_group_id='G100'
    this.searchAllRoleMain(this.defaultParam);
  },

  methods: {
    searchAllRoleMain: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15049/get_onm_menu_list`

      var reqParams = this.handleParams(params)

      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
        console.log('응답값')
          console.log(response)
          var resCode = response.data.res_code;
           
          if(resCode == 200){
            this.menuList = response.data.data.menu_list;
          }else if(resCode==204){
            this.menuList = [];
            this.authList = [];
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
            this.menuList = [];
            this.authList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    searchToRoleMain: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15052/search_onm_menu_list`

      var reqParams = this.handleParams(params)
      console.log(reqParams)

      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
        console.log('응답값')
          console.log(response)
          var resCode = response.data.res_code;
           
          if(resCode == 200){
            this.authList = response.data.data.list;
          }else if(resCode==204){
            this.authList = [];
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
            this.authList = [];
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    
    updateMenu: function(params){
      console.log(params)
      this.updateParam.list=params
      this.updateParam.auth_group_id=this.searchParam.auth_group_id
      console.log(this.updateParam)
      
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15051/set_onm_menu_list`
      axios
        .post(url, this.updateParam, this.$store.state.headers)
        .then((response) => {
          console.log('응답값')
          console.log(response)
          var resCode = response.data.res_code;
           
          if(resCode == 200){
            alert('수정 완료')
          }else if(resCode==204){
            alert('실패')
            console.log('실패.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            alert('실패')
          }
        })
        .catch((ex) => {
          console.log('실패',ex)
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