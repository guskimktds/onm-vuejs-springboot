<template>
    <v-container fluid>
      <v-card>
        <code-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
          v-bind:localGwOptions="localGwOptions"
          @Items="saveItem"
        ></code-query>
        <code-list 
          v-bind:pList=pList
          v-bind:gw_id="gw_id"
          v-bind:resPagingInfo="resPagingInfo"
          @reset="reset"
        @pagination="setToSearchParams"></code-list>
      </v-card>

    </v-container>
</template>

<script>
import CodeQuery from './codeQuery'
import CodeList from './codeList'

//로그인 시 서버에서 불러오면 수정해야함
import EventBus from '../../../../../EventBus'
import axios from "axios"

export default {
  components:{
    CodeQuery,
    CodeList
  },
  data () {
    return {
      title: '코드 마스터 관리',
      gw_id: '',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        code_master_id: '',
        code_master_name: '',
        local_gw_id : ''
      },
      localGwOptions : [],
      centerOptions:{
        server_name: '센터',
        local_gw_id: ''
      }
    }
  },

  beforeCreate() {  
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
      this.localGwOptions = response.data.data.local_gw_list;
      this.localGwOptions.unshift(this.centerOptions);
    
    })
    .catch(function (error) {
        console.log(error);
        // console.log("국사정보 조회실패")
      })
      .finally(function () {
        // always executed
      });
  },
 
  methods: {
    reset: function(){
      console.log(this.searchParam)
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15015/get_code_master`
      var reqParams = this.handleParams(this.searchParam)

      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
         
          if(resCode == 200){
            // this.authGroupList = response.data.data.auth_group_list
            // this.isAuthMenu = true
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else{
            // this.authGroupList = [];
            // this.isAuthMenu = false
            this.pList = [];
            this.resPagingInfo = {};
            // console.log(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    searchToButton: function(params){
    console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15015/get_code_master`

    //params : 페이징 + 검색조건
    var reqParams = this.handleParams(params)  
    console.log('보내는 값')
    console.log(reqParams)
      axios.post(url, reqParams, this.$store.state.headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        
        if(resCode == 200){
          this.pList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info
          this.gw_id = reqParams.local_gw_id
          
          console.log('paging')
          console.log(this.resPagingInfo)
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
    },  
    saveItem(params){
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

    },
    setToSearchParams(values) {
      console.log('전달값')
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

      if(params.code_master_id !== undefined && params.code_master_id !== ''){
        newParams.code_master_id = params.code_master_id
      }

      if(params.code_master_name !== undefined && params.code_master_name !== ''){
        newParams.code_master_name = params.code_master_name
      }

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }



      return newParams
    }

    
  },

}
</script>

<style scoped>

</style>