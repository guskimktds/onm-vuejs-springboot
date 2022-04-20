<template>
    <v-container fluid>
      <v-card>
        <srs-history-query
          v-on:search="searchToParams"
          v-bind:param=searchParam
        ></srs-history-query>
        <srs-history-list
          v-bind:pList=srsList 
          v-bind:resPagingInfo=resPagingInfo 
          @pagination="setToSearchParams"
        >
        </srs-history-list>
     
      </v-card>
    </v-container>
</template>

<script>
import srsHistoryList from '../srs/srsHistoryList.vue'
import srsHistoryQuery from '../srs/srsHistoryQuery.vue'
import dateInfo from '../../../../utils/common'

import EventBus from '../../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
      srsHistoryList,
      srsHistoryQuery
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
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        cam_id:'',
        status_code:'',
        use_yn:'',
        date_yn: true
      }
    }
  },

  methods: {
    searchToParams: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15157/get_srs_hist_info`

      var reqParams = this.handleParams(params)      
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
         
        if(resCode == 200){
          this.pList = response.data.data.list;
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

    setToSearchParams: function(values){
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }
      this.searchToTamperingInfo(params)
    },

    handleParams: function(params){
      let newParams = {}
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
      
      if(params.cam_id !== undefined && params.cam_id !== ''){
        newParams.cam_id = params.cam_id
      }else if(
        this.searchParam.cam_id!==undefined&&
        this.searchParam.cam_id!==""
      ){
        newParams.cam_id=this.searchParam.cam_id
      }

      if(params.use_yn !== undefined && params.use_yn !== ''){
        newParams.use_yn = params.use_yn
      }else if(
        this.searchParam.use_yn!==undefined&&
        this.searchParam.use_yn!==""
      ){
        newParams.use_yn=this.searchParam.use_yn
      }

      if(params.status_code !== undefined && params.status_code !== ''){
        newParams.status_code = params.status_code
      }else if(
        this.searchParam.status_code!==undefined&&
        this.searchParam.status_code!==""
      ){
        newParams.status_code=this.searchParam.status_code
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