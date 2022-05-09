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
          title: '',
          board_id: '',
          board_type: '',
          board_cate_cd: '',
          disp_yn: '',
          disp_start_date: '',
          disp_end_date: '',
          reg_start_date: '',
          reg_end_date: '',
      }
    }
  },

  
  methods: {
    reset: function(){
      console.log(this.searchParam)
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15132/get_notice`
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
            this.pList = response.data.data.notice_list;
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
    //  var  reqParams = {
    //   view_cnt : params.view_cnt,
    //   page_no : params.page_no,
    //   board_cate_cd :params.board_cate_cd,
    // }
console.log("검색1"+JSON.stringify(params))
      var reqParams = this.handleParams(params)  
    console.log("검색2"+JSON.stringify(reqParams))
    //params : 페이징 + 검색조건
      // console.log("EEEEEEEEEEEEEEEEE"+reqParams.disp_end_date)
    
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
                alert('공지 목록 데이터가 없습니다.');
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
           var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15131/upload_notice`
           console.log('서버에 전송되는 값') 
           console.log(params)
           params.disp_end_date = params.disp_end_date.replace(/-/g,"")
           params.disp_start_date = params.disp_start_date.replace(/-/g,"")
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

      if(params.disp_start_date !== undefined && params.disp_start_date !== ''){
        newParams.disp_start_date = params.disp_start_date.replace(/-/g,"")
      }else if(
        this.searchParam.disp_start_date!==undefined&&
        this.searchParam.disp_start_date!==""
      ){
        newParams.disp_start_date=this.searchParam.disp_start_date.replace(/-/g,"")
      }

      if(params.disp_start_date !== undefined && params.disp_start_date !== ''){
        newParams.disp_start_date = params.disp_start_date.replace(/-/g,"")
      }else if(
        this.searchParam.disp_start_date!==undefined&&
        this.searchParam.disp_start_date!==""
      ){
        newParams.disp_start_date=this.searchParam.disp_start_date.replace(/-/g,"")
      }
      if(params.disp_end_date !== undefined && params.disp_end_date !== ''){
        newParams.disp_end_date = params.disp_end_date.replace(/-/g,"")
      }else if(
        this.searchParam.disp_end_date!==undefined&&
        this.searchParam.disp_end_date!==""
      ){
        newParams.disp_end_date=this.searchParam.disp_end_date.replace(/-/g,"")
      }
      if(params.reg_start_date !== undefined && params.reg_start_date !== ''){
        newParams.reg_start_date = params.reg_start_date.replace(/-/g,"")
      }else if(
        this.searchParam.reg_start_date!==undefined&&
        this.searchParam.reg_start_date!==""
      ){
        newParams.reg_start_date=this.searchParam.reg_start_date.replace(/-/g,"")
      }
      if(params.reg_end_date !== undefined && params.reg_end_date !== ''){
        newParams.reg_end_date = params.reg_end_date.replace(/-/g,"")
      }else if(
        this.searchParam.reg_end_date!==undefined&&
        this.searchParam.reg_end_date!==""
      ){
        newParams.reg_end_date=this.searchParam.reg_end_date.replace(/-/g,"")
      }
      if(params.code_master_id !== undefined && params.code_master_id !== ''){
        newParams.code_master_id = params.code_master_id
      }
 
      if(params.title !== undefined && params.title !== ''){
        newParams.title = params.title
      }else if(
        this.searchParam.title!==undefined&&
        this.searchParam.title!==""
      ){
        newParams.title=this.searchParam.title
      }

      if(params.board_id !== undefined && params.board_id !== ''){
        newParams.board_id = params.board_id
      }else if(
        this.searchParam.board_id!==undefined&&
        this.searchParam.board_id!==""
      ){
        newParams.board_id=this.searchParam.board_id
      }

      if(params.board_type !== undefined && params.board_type !== ''){
        newParams.board_type = params.board_type
      }else if(
        this.searchParam.board_type!==undefined&&
        this.searchParam.board_type!==""
      ){
        newParams.board_type=this.searchParam.board_type
      }

      if(params.board_cate_cd !== undefined && params.board_cate_cd !== ''){
        newParams.board_cate_cd = params.board_cate_cd
      }else if(
        this.searchParam.board_cate_cd!==undefined&&
        this.searchParam.board_cate_cd!==""
      ){
        newParams.board_cate_cd=this.searchParam.board_cate_cd
      }

      if(params.disp_yn !== undefined && params.disp_yn !== ''){
        newParams.disp_yn = params.disp_yn
      }else if(
        this.searchParam.disp_yn!==undefined&&
        this.searchParam.disp_yn!==""
      ){
        newParams.disp_yn=this.searchParam.disp_yn
      }

      return newParams
    } 
  }
}
</script>

<style scoped>

</style>