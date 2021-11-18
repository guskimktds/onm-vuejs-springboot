<template>
  <v-container fluid>
      <v-card>
        <pushHistory-query
          v-on:search="searchToPushHistory"
          v-bind:param="searchParam"
          v-bind:localGwOptions="localGwOptions"
        ></pushHistory-query>
        <pushHistory-list 
        v-bind:pList="pList"
        v-bind:pushPagingInfo=pushPagingInfo
        @pagination=setToSearchParams></pushHistory-list>
      </v-card>
    </v-container>
</template>

<script>
import PushHistoryList from './pushHistoryList'
import PushHistoryQuery from './pushHistoryQuery'
import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    PushHistoryList,
    PushHistoryQuery
  },
  data () {
    return {
      title: '푸시 발송 이력',
      pList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10,
      },
      pushPagingInfo:{},
      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        alim_id:'',
        user_id:'',
        cam_id:'',
        local_gw_id:'',
        is_masking:''
      },
      localGwOptions:[]
    }
  },
beforeCreate() {  
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
        this.localGwOptions = response.data.data.local_gw_list;
        // version_code가 1302이상인 국사를 조회하도록 파라미터 세팅(21.06.03)
        for(var idx in this.localGwOptions){
           if(this.localGwOptions[idx].version_code > 1301){
             var local_gw_id = this.localGwOptions[idx].local_gw_id;
           }
        }
        this.searchParam.local_gw_id = local_gw_id;
        //
        
        // this.searchParam.local_gw_id=this.localGwOptions[0].local_gw_id;
        // console.log('%%%%')
        // console.log(this.searchParam)
        this.searchToPushHistory(this.searchParam);
    })
    .catch(function (error) {
        console.log(error);
        console.log("국사정보 조회실패")
      })
      .finally(function () {
        // always executed
      });
  },
  methods: {
    searchToPushHistory: function(params){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_14006/get_push_sending_history`

      var reqParams=this.handleParams(params)
      console.log('보내는 값')
      console.log(reqParams)
      axios.post(url,reqParams,headers)
        .then((response)=>{
          var resCode=response.data.res_code;
          
          if(resCode==200){
            this.pList=response.data.data.list;
            this.pushPagingInfo=response.data.data.paging_info;
            console.log(this.pList)
          }else if(resCode==204){
            this.pList=[];
            this.pushPagingInfo={};
             console.log('푸시발송 데이터가 없습니다.');
          }else if(resCode==410){
            console.log("로그인 세션이 만료되었습니다.");
            EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
          }else{
            this.pList=[];
            this.pushPagingInfo={};
            //  console.log(resCode+" / "+resMsg);
          }
        })
        .catch((ex)=>{
          console.log('조회 실패', ex)
        })
        .finally(function(){})
    },

    setToSearchParams:function(values){
      var params={
        page_no:values.page,
        view_cnt:values.itemsPerPage,
        local_gw_id:values.local_gw_id
      }
      this.searchToPushHistory(params)
    },

    handleParams:function(params){
      let newParams={}
      if(params.date_yn==undefined){
        params.date_yn=this.searchParam.date_yn
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
      
      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if(params.date_yn==true){
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
      }
     
     if(params.alim_id !== undefined && params.alim_id !== ''){
        newParams.alim_id = params.alim_id
      }else if(
        this.searchParam.alim_id!==undefined&&
        this.searchParam.alim_id!==""
      ){
        newParams.alim_id=this.searchParam.alim_id
      }

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
        newParams.cam_id=this.searchParam.user_id
      }

      if(params.is_masking !== undefined && params.is_masking !== ''){
        newParams.is_masking = params.is_masking ? "N" : "Y";
      }else if(
        this.searchParam.is_masking!==undefined&&
        this.searchParam.is_masking!==""
      ){
        newParams.is_masking = this.searchParam.is_masking ? "N" : "Y";
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