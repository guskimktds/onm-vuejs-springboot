<template>
    <v-container fluid>
      <v-card>
        <cam-tampering-query 
          v-on:search="searchToTamperingInfo"
          v-bind:param=searchParam
          v-bind:localGwOptions="localGwOptions"
        ></cam-tampering-query>
        <cam-tampering-list 
          v-bind:pList=pList 
          v-bind:resPagingInfo=resPagingInfo 
          @pagination="setToSearchParams"
        >
        </cam-tampering-list>
     
      </v-card>
    </v-container>
</template>

<script>
import CamTamperingList from './tampering/camTamperingList'
import CamTamperingQuery from './tampering/camTamperingQuery'

import dateInfo from '../../../utils/common'

import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    CamTamperingList,
    CamTamperingQuery,
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
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        local_gw_id: '',
        user_id: '',
        cam_id:''
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
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15141/get_cam_tamper`

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
          // this.pList = this.handleDate(this.pList);
          // alert(JSON.stringify(this.pList));
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

      console.log("페이징"+params)

      this.searchToTamperingInfo(params)
    },
    // handleDate(params){

    //   if(params.reg_date !== undefined && params.reg_date !== ''){
    //       params.reg_date = params.reg_date.substring(0,10)
    //   }
    // },
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

      if(params.user_id !== undefined && params.user_id !== ''){
        newParams.user_id = params.user_id
      }else if(
        this.searchParam.user_id!==undefined&&
        this.searchParam.user_id!==""
      ){
        newParams.user_id=this.searchParam.user_id
      }

      if(params.local_gw_id !== undefined && params.local_gw_id !== ''){
        newParams.local_gw_id = params.local_gw_id
      }else if(
        this.searchParam.local_gw_id!==undefined&&
        this.searchParam.local_gw_id!==""
      ){
        newParams.local_gw_id=this.searchParam.local_gw_id
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