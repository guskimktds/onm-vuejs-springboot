<template>
    <v-container fluid>
      <v-card>
        <term-auth-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></term-auth-query>
        <term-auth-list
        v-bind:pList=pList
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"></term-auth-list>
      </v-card>
    </v-container>
</template>

<script>
import termAuthQuery from './termAuthQuery'
import termAuthList from './termAuthList'

//로그인 시 서버에서 불러오면 수정해야함
import EventBus from '../../../../EventBus'
import axios from "axios"
// import EventBus from '../../../../../EventBus';

export default {
  components:{
    termAuthQuery,
    termAuthList
  },

  data () {
   return{
      title: '고객이전 단말상태 조회',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        mac_id: '',
      },
      start:true
    }
  },
 
  methods: {
    searchToButton: function(params){
      
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13012/get_term_auth_hist`

      var reqParams = this.handleParams(params) 
        console.log('전달값')
        console.log(reqParams) 
      if(!reqParams.mac_id){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
    

          if(resCode == 200){
            this.pList = response.data.data.hist_list;
            this.resPagingInfo = response.data.data.paging_info;
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log('단말 인증 정보 데이터가 없습니다.');
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
             EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            // console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
    },
    setToSearchParams: function(values){
      console.log(values)
      console.log('검색 정보')
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)
      if(this.start==true){
        this.pList=[]
      } else { 
      this.searchToButton(params)
      }
      this.start=false
    },

    handleParams: function(params){
      let newParams = {}

      if(params.mac_id !== undefined && params.mac_id !== ''){
        newParams.mac_id = params.mac_id
      }else if(
        this.searchParam.mac_id!==undefined&&
        this.searchParam.mac_id!==""
      ){
        newParams.mac_id=this.searchParam.mac_id
      }
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
      return newParams
    }
  }
}
</script>

<style scoped>

</style>