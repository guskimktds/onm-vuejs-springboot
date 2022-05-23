<template>
    <v-container fluid>
      <v-card>
      <srs-management-query
          v-on:search="searchTosrsManagementInfo"
          v-bind:param=searchParam
        ></srs-management-query>
        <srs-management-list 
          v-bind:pList=pList
          v-bind:resPagingInfo=resPagingInfo
          @pagination="setToSearchParams"
        >
        </srs-management-list>
      </v-card>
    </v-container>
</template>

<script>
import srsManagementQuery from './srsManagement/srsManagementQuery'
import srsManagementList from './srsManagement/srsManagementList'
import EventBus from '../../../../EventBus'
import axios from "axios"

export default {
  components: {
    srsManagementList,
    srsManagementQuery
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
        target_name : '',
        status_code : '',
        start_date: '',
        end_date: ''
      }
    }
  },
  methods: {
    searchTosrsManagementInfo: function(params){
      let url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15159/get_srs_main_proc_info`
      console.log(params)
      var reqParams = this.handleParams(params)      
      console.log('넣어지는 값')
      console.log(reqParams)
  
      axios.post(url, reqParams)
      .then((response) => {
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          this.pList = response.data.data.srs_main_proc_info_list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("영상송출 프로세스 정보가 없습니다.");
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
    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }

      console.log(params)

      this.searchTosrsManagementInfo(params)
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
      if(params.target_name !== undefined && params.target_name !== ''){
        newParams.target_name = params.target_name
      }else if(
        this.searchParam.target_name!==undefined&&
        this.searchParam.target_name!==""
      ){
        newParams.target_name=this.searchParam.target_name
      }

      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }else if(
        this.searchParam.status_code!==undefined&&
        this.searchParam.status_code!==""
      ){
        newParams.status_code=this.searchParam.status_code
      }
      if(params.send_pid !== undefined && params.send_pid !== ''){
        newParams.send_pid = params.send_pid
      }else if(
        this.searchParam.send_pid!==undefined&&
        this.searchParam.send_pid!==""
      ){
        newParams.status_code=this.searchParam.status_code
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
      return newParams
    }
  }
}
</script>

<style scoped>

</style>