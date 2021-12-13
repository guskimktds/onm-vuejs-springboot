<template>
    <v-container fluid>
      <v-card>
        <vanner-query 
          v-on:search="searchToButton"
          v-bind:param="searchParam"
          v-bind:localGwOptions="localGwOptions"
          
        ></vanner-query>
          
   
      <div class = "button">
        <router-link to="/operation/vanner-register" v-show="showAuth()">배너등록</router-link>
      </div>
 

        <vanner-list
        v-bind:pList="pList"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
        ></vanner-list>
      </v-card>

    </v-container>
</template>

<script>
import vannerList from './vannerList'
import vannerQuery from './vannerQuery'
import axios from "axios"

export default {
  components:{
    vannerList,
    vannerQuery
  },
  data () {
    return {
      title: '배너관리',
      gw_id: '',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        img_name:'',
        img_type:'',
        title: '',
        disp_yn: '',
        disp_start_date: '',
        disp_end_date: '',
        reg_date:'',
        local_gw_id:'',
        os_type:'',
        reg_start_date:'',
        reg_end_date:'',
        page_no: '',
        view_cnt: '',
        img_path:''
      },
      localGwOptions:[],
      centerOptions:{
        server_name:'센터',
        local_gw_id:''
      }
    }
  },
  methods: {
    showAuth(){
            var auth=this.$store.state.authGroupId
            if(auth=='G100'){
            return true;
            }else{
            alert('접근권한이 없습니다.')
            return false;
            }
        },
    searchToButton: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15122/get_banner`
    var reqParams = this.handleParams(params)  
  
    //params : 페이징 + 검색조건
    // EventBus.$emit('param', params);
    
    console.log('보내는 값')
    console.log(reqParams)
        axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                this.pList = response.data.data.banner_list;
                this.resPagingInfo = response.data.data.paging_info
                this.gw_id=reqParams.local_gw_id
                console.log('paging')
                console.log(this.resPagingInfo)
                console.log(this.pList)
              }else if(resCode==204){
                this.pList = [];
                this.resPagingInfo = {};
                alert('데이터가 없습니다.');
              }else if(resCode==410){
                alert("로그인 세션이 만료되었습니다.");
              //  EventBus.$emit('top-path-logout');
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
              for(let i = 0; i < this.pList.length; i++){
              if(this.pList[i].pop_up_yn == 'Y'){
                this.pList[i].pop_up_yn = '노출'
              }else{
                this.pList[i].pop_up_yn = '미노출'
              }
              }
              for(let i = 0; i < this.pList.length; i++){
              if(this.pList[i].img_type == 'LOGOUT'){
                this.pList[i].img_type = '로그아웃'
              }else if(this.pList[i].img_type == 'CATE01'){
                this.pList[i].img_type = '왼쪽배너'
              }else if(this.pList[i].img_type == 'CATE02'){
                this.pList[i].img_type = '오른쪽배너'
              }
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },
    setToSearchParams: function(values){
      console.log('전달값')
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };
      this.searchParam.page_no = values.page
      this.searchParam.view_cnt = values.itemsPerPage
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

      if(params.title !== undefined && params.title !== ''){
        newParams.title = params.title
      }else if(
            this.searchParam.title!==undefined&&
            this.searchParam.title!==""
          ){
            newParams.title=this.searchParam.title
      }

      if(params.img_type !== undefined && params.img_type !== ''){
        newParams.img_type = params.img_type
      }else if(
            this.searchParam.img_type!==undefined&&
            this.searchParam.img_type!==""
          ){
            newParams.img_type=this.searchParam.img_type
          }
      if(params.disp_yn !== undefined && params.disp_yn !== ''){
        newParams.disp_yn = params.disp_yn
      }else if(
            this.searchParam.disp_yn!==undefined&&
            this.searchParam.disp_yn!==""
          ){
            newParams.disp_yn=this.searchParam.disp_yn   
          }
      if(params.reg_date !== undefined && params.reg_date !== ''){
        newParams.reg_date = params.reg_date
      }else if(
            this.searchParam.reg_date!==undefined&&
            this.searchParam.reg_date!==""
          ){
            newParams.reg_date=this.searchParam.reg_date  
          }
      if(params.disp_start_date !== undefined && params.disp_start_date !== ''){
        newParams.disp_start_date = params.disp_start_date
      }else if(
            this.searchParam.disp_start_date!==undefined&&
            this.searchParam.disp_start_date!==""
          ){
            newParams.disp_start_date=this.searchParam.disp_start_date.replace(/-/g,"")
          }
      if(params.disp_end_date !== undefined && params.disp_end_date !== ''){
        newParams.disp_end_date = params.disp_end_date
      }else if(
            this.searchParam.disp_end_date!==undefined&&
            this.searchParam.disp_end_date!==""
          ){
            newParams.disp_end_date=this.searchParam.disp_end_date.replace(/-/g,"")
          }

      if(params.img_name !== undefined && params.img_name !== ''){
        newParams.img_name = params.img_name
      }else if(
            this.searchParam.img_name!==undefined&&
            this.searchParam.img_name!==""
          ){
            newParams.img_name=this.searchParam.img_name  
          }
      if(params.os_type !== undefined && params.os_type !== ''){
        newParams.os_type = params.os_type
      }else if(
            this.searchParam.os_type!==undefined&&
            this.searchParam.os_type!==""
          ){
            newParams.os_type=this.searchParam.os_type  
          }
      if(params.reg_start_date !== undefined && params.reg_start_date !== ''){
        newParams.reg_start_date = params.reg_start_date
      }else if(
            this.searchParam.reg_start_date!==undefined&&
            this.searchParam.reg_start_date!==""
          ){
            newParams.reg_start_date=this.searchParam.reg_start_date.replace(/-/g,"")
          }
      if(params.reg_end_date !== undefined && params.reg_end_date !== ''){
        newParams.reg_end_date = params.reg_end_date
      }else if(
            this.searchParam.reg_end_date!==undefined&&
            this.searchParam.reg_end_date!==""
          ){
            newParams.reg_end_date=this.searchParam.reg_end_date.replace(/-/g,"")
          }
      return newParams
    }
  },
}
</script>

<style scoped>
.button{
  width:100px;
  height: 50px;
  float: right;
  padding-top:10px;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  border: 2px solid #ffffff;
  color: white;
}
</style>