<template>
    <v-container fluid>
      <v-card>
        <bss-result-query
        v-on:search="searchToButton"
        v-bind:param="searchParam">
        </bss-result-query>
        <bss-result-list 
        v-bind:bssList=bssList
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
        ></bss-result-list>
      </v-card>

    </v-container>
</template>

<script>
import BssResultQuery from './bssResultQuery'
import BssResultList from './bssResultList'

import EventBus from '../../../../EventBus'
import axios from "axios"

export default {
  components:{
    BssResultList,
    BssResultQuery
  },
  data () {
    return {
      title: '청약 OSS',
      bssList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        guid: '',
        is_masking:''
      },
    }
  },
  
  methods: {
    searchToButton: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15020/get_bss_result`

    var reqParams = this.handleParams(params) 
        axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
             
              if(resCode == 200){
                this.bssList=response.data.data.list;
                this.resPagingInfo=response.data.data.paging_info
              }else if(resCode==204){
                this.bssList = [];
                this.resPagingInfo = {};
                alert('코드 관리 데이터가 없습니다.');
              }else if(resCode==410){
                alert("로그인 세션이 만료되었습니다.");
                EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
              }else{
                this.bssList = [];
                this.resPagingInfo = {};
                alert("Error");
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },

    setToSearchParams(values) {
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

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
      }

      return newParams
    }

    
  },

}
</script>

<style scoped>

</style>