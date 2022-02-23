<template>
    <v-container fluid>
      <v-card>
      <failover-query
          v-on:search="searchToTamperingInfo"
          v-bind:param=searchParam
          v-bind:localGwOptions="localGwOptions"
            @Items="saveItem"
        ></failover-query>
        <failover-list 
          v-bind:pList=pList 
          v-bind:resPagingInfo=resPagingInfo 
          @child="clickToSearchDetailObject" 
          @pagination="setToSearchParams"
        >
        </failover-list>
     
      </v-card>
    </v-container>
</template>

<script>
import FailoverQuery from './failover/failoverQuery.vue'
import FailoverList from './failover/failoverList.vue'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    FailoverList,
    FailoverQuery

  },
  data () {
    return {
      pList: [],
      pObject: {        
      },
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      oldValue:'',
       localGwOptions:[],
      searchParam: {
        local_gw_id: '',
        streamer_idx: '',
        proc_name:''
      }
    }
  },


    beforeCreate() {  
      axios
      .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
      .then((response) => {
        this.localGwOptions = response.data.data.local_gw_list;
      })
      .catch(function (error) {
          console.log(error);
          // alert("국사정보 조회실패")
        })
        .finally(function () {
          // always executed
        });
   },
  methods: {
    searchToTamperingInfo: function(params){
      let url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15151/get_failover`
       url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15141/get_cam_tamper`
      //params : 페이징 + 검색조건
      console.log(params)
      var reqParams = this.handleParams(params)      
      console.log('넣어지는 값')
      console.log(reqParams)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          
          this.pList = response.data.data.cam_info;
          this.resPagingInfo = response.data.data.paging_info
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
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15152/set_failover`

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
    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },


    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }

      console.log(params)

      this.searchToTamperingInfo(params)
    },
    // handleDate(params){

    //   if(params.reg_date !== undefined && params.reg_date !== ''){
    //       params.reg_date = params.reg_date.substring(0,10)
    //   }
    // },
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

      if(params.streamer_idx !== undefined && params.streamer_idx !== ''){
        newParams.streamer_idx = params.streamer_idx
      }else if(
        this.searchParam.streamer_idx!==undefined&&
        this.searchParam.streamer_idx!==""
      ){
        newParams.streamer_idx=this.searchParam.streamer_idx
      }

      if(params.proc_name !== undefined && params.proc_name !== ''){
        newParams.proc_name = params.proc_name
      }else if(
        this.searchParam.proc_name!==undefined&&
        this.searchParam.proc_name!==""
      ){
        newParams.proc_name=this.searchParam.proc_name
      }

      if(params.local_gw_id !== undefined && params.local_gw_id !== ''){
        newParams.local_gw_id = params.local_gw_id
      }else if(
        this.searchParam.local_gw_id!==undefined&&
        this.searchParam.local_gw_id!==""
      ){
        newParams.local_gw_id=this.searchParam.local_gw_id
      } 
      
      return newParams
    }
  }
}
</script>

<style scoped>

</style>