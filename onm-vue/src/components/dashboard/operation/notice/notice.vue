<template>
    <v-container fluid>
      <v-card>
        <notice-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
          @Items="saveItems"
        ></notice-query>
        <notice-list 
        v-bind:pList=pList
        v-bind:gw_id="gw_id"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
        @reset="reset"></notice-list>
      </v-card>

    </v-container>
</template>

<script>
import noticeQuery from './noticeQuery'
import noticeList from './noticeList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import EventBus from '../../../../EventBus'
import axios from "axios"

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
  components:{
    noticeQuery,
    noticeList
  },
  data () {
    return {
      title: '코드관리',
      gw_id: '',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        local_gw_id:'',
        code_master_id: '',
        code_id: '',
        code_name: '',
        code_type: ''
      },

      centerOptions:{
        server_name:'센터',
        local_gw_id:''
      }
    }
  },

  
  methods: {
    reset: function(){
      console.log(this.searchParam)
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15006/get_code`
       var reqParams = this.handleParams(this.searchParam)
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
            console.log(this.resPagingInfo)
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
    searchToButton: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15132/get_notice`

    //params : 페이징 + 검색조건
    var reqParams = this.handleParams(params)  
    console.log('보내는 값')
    console.log(reqParams)
        axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                this.pList = response.data.data.notice_list;
                this.resPagingInfo = response.data.data.paging_info
                this.gw_id=reqParams.local_gw_id
                console.log('paging')
                console.log(this.resPagingInfo)
              }else if(resCode==204){
                this.pList = [];
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
                this.pList = [];
                this.resPagingInfo = {};
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },
    // saveToData: function(){
    //   console.log('saveToData Method call : ',process.env);
    //   axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone/query`, {       
    //               params
    //         })
    //         .then((result) => {
    //           console.log(result)
    //           // this.list = JSON.parse(result.data.menu)
    //           this.list = result.data
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    // }
    saveItems(params){
           var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15132/upload_notice`
           console.log('서버에 전송되는 값') 
           console.log(params)
           axios.post(url, params, this.$store.state.headers)
            .then((response)=>{
                var resCode=response.data.res_code;
                var resMsg=response.data.res_msg;
                if(resCode==200){
                    this.pList.unshift(params)
                    this.$fire({
                        title: "등록 되었습니다.",
                        type: "success"})
                }else{
                    this.$fire({
                        title: "등록 실패하였습니다.",
                        html: resMsg,
                        type: "error"})
                }
            })
            .catch((ex)=>{
                this.$fire({
                    title: "등록 실패하였습니다.",
                    text: ex,
                    type: "error"
                })
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

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if(params.code_master_id !== undefined && params.code_master_id !== ''){
        newParams.code_master_id = params.code_master_id
      }

      if(params.code_id !== undefined && params.code_id !== ''){
        newParams.code_id = params.code_id
      }

      if(params.code_name !== undefined && params.code_name !== ''){
        newParams.code_name = params.code_name
      }   
      
      if(params.code_type !== undefined && params.code_type !== ''){
        newParams.code_type = params.code_type
      }  

      return newParams
    }

    
  },

}
</script>

<style scoped>

</style>