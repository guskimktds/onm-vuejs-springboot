<template>
    <v-container fluid>
      <v-card>
      <srs-main-query
          v-on:search="searchToSrsMainInfo"
          v-bind:param=searchParam
          v-bind:bgmList=bgmList
          @Items="saveItem"
        ></srs-main-query>
        <srs-main-list 
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo
          @pagination="setToSearchParams"
          @reset="reset"
        >
        </srs-main-list>
      </v-card>
    </v-container>
</template>

<script>
import SrsMainQuery from './srsMain/srsMainQuery.vue'
import SrsMainList from './srsMain/srsMainList.vue'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    SrsMainQuery,
    SrsMainList

  },
  data () {
    return {
      pList: [],

      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
       cam_id : '',
       srs_title : '',
       user_id : '',
       start_date: dateInfo().lastWeekDashFormat,
       end_date: dateInfo().currentDateDashFormat,
       status_code : '',
       code_id:'',
      //  paging : true
      },
      bgmList:[],
      bgmOptions:{
        code_name:'',
        code_id:'',
        orderby_no:''
      },
    }
  },
    beforeCreate() { 
      var params = {code_master_id : 'SRS'}
      var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15161/get_srs_bgm` 
      axios
      .post(url, params)
      .then((response) => {
        console.log("결과" + response);
        this.bgmList = response.data.data.bgm_list;
        this.bgmList.unshift(this.bgmOptions);
      })
      .catch(function (error) {
          console.log(error);
          // alert("BGM 조회실패")
        })
        .finally(function () {
          // always executed
        });
    },

  methods: {
      reset: function(){
      console.log(this.searchParam)
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15153/get_srs_main_info`
        // url =`$/{process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15141/get_cam_tamper`
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
            // this.pList = response.data.data.cam_info;
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
    searchToSrsMainInfo: function(params){
      let url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15153/get_srs_main_info`
      // url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15141/get_cam_tamper`
      //params : 페이징 + 검색조건
      console.log(params)
      var reqParams = this.handleParams(params)      
      console.log('넣어지는 값')
      console.log(reqParams)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          
          this.pList = response.data.data.list;
          // this.pList = response.data.data.cam_info;
          this.resPagingInfo = response.data.data.paging_info
          console.log(this.gwNow)
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("사용자 청약 오더 정보 데이터가 없습니다.");
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
          //console.log(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      
    },
    saveItem(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15154/set_srs_main_info`
        const reqParams = this.handleParams(params)
        axios.post(url, reqParams, this.$store.state.headers)
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
              }else if(resCode == 204){
                this.$fire({
                       title: "중복된 요청입니다.",
                       type : "error"})
              }else{
                this.$fire({
                       title: "등록 실패하였습니다.",
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


    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }

      console.log(params)

      this.searchToSrsMainInfo(params)
    },
    handleParams: function(params){
      let newParams = {}
      // if(params.paging == true){
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
      // }

         if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }

      if(params.cam_id !== undefined && params.cam_id !== ''){
        newParams.cam_id = params.cam_id
      }else if(
        this.searchParam.cam_id!==undefined&&
        this.searchParam.cam_id!==""
      ){
        newParams.cam_id=this.searchParam.cam_id
      }

      if(params.srs_title !== undefined && params.srs_title !== ''){
        newParams.srs_title = params.srs_title
      }else if(
        this.searchParam.srs_title!==undefined&&
        this.searchParam.srs_title!==""
      ){
        newParams.srs_title=this.searchParam.srs_title
      } 
      if(params.target_stream_key !== undefined && params.target_stream_key !== ''){
        newParams.target_stream_key = params.target_stream_key
      }else if(
        this.searchParam.target_stream_key!==undefined&&
        this.searchParam.target_stream_key!==""
      ){
        newParams.target_stream_key=this.searchParam.target_stream_key
      } 
      if(params.target_stream_url !== undefined && params.target_stream_url !== ''){
        newParams.target_stream_url = params.target_stream_url
      }else if(
        this.searchParam.target_stream_url!==undefined&&
        this.searchParam.target_stream_url!==""
      ){
        newParams.target_stream_url=this.searchParam.target_stream_url
      } 
      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      } 

      if(params.start_date !== undefined && params.start_date !== ''){
        newParams.start_date = params.start_date.replace(/-/g,"")
      }else if(
        this.searchParam.start_date!==undefined&&
        this.searchParam.start_date!==""
      ){
        newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
      }

      if(params.end_date !== undefined && params.end_date !== ''){
        newParams.end_date = params.end_date.replace(/-/g,"")
      }else if(
        this.searchParam.end_date!==undefined&&
        this.searchParam.end_date!==""
      ){
        newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
      }

      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }else if(
        this.searchParam.status_code!==undefined&&
        this.searchParam.status_code!==""
      ){
        newParams.status_code=this.searchParam.status_code
      }
       if(params.code_id !== undefined && params.code_id !== ''){
        newParams.code_id = params.code_id
      }else if(
        this.searchParam.code_id!==undefined&&
        this.searchParam.code_id!==""
      ){
        newParams.code_id=this.searchParam.code_id
      }

      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
      return newParams
    }
  }
}
</script>

<style scoped>

</style>