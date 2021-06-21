<template>
    <v-container fluid>
        <v-card>
            <device-ktt-info-query
            v-on:search="searchdKTTInfo"
            v-bind:param="searchParam"></device-ktt-info-query>

            <device-ktt-info-list
            v-bind:dkList="dkList"
            v-bind:dkttPagingInfo="dkttPagingInfo"
            @pagination="setToSearchParams">
            </device-ktt-info-list>
        </v-card>
    </v-container>
</template>

<script>
import DeviceKttInfoList from './deviceKttInfoList.vue'
import DeviceKttInfoQuery from './deviceKttInfoQuery.vue'
import dateInfo from '../../../utils/common'

import EventBus from '../../../utils/common'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default{
    components:{
        DeviceKttInfoList,
        DeviceKttInfoQuery
    },
    data(){
        return{
            title: "KTT 단말정보 조회",
            dkList:[],
            dkttPagingInfo:{},
            reqPagingInfo:{
                page_no:1,
                view_cnt:10
            },
            searchParam:{
                start_date: dateInfo().lastWeekDashFormat,
                end_date: dateInfo().currentDateDashFormat,
                date_yn:true,
                cam_id:'',
                user_id:'',
                service_no:'',
                status_code:''
            }
        }
    },
    methods: {
        searchdKTTInfo: function(params){
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13011/get_ktt_cam_list`

            var reqParams=this.handleParams(params)
            console.log(reqParams)
            if(!reqParams.start_date&&!reqParams.cam_id&&!reqParams.user_id&&!reqParams.service_no&&!reqParams.status_code){
              this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
            }else{
            axios.post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response)
                    var resCode=response.data.res_code;
                    var resMsg=response.data.res_msg;
                    if(resCode==200){
                        this.dkList=response.data.data.cam_list;
                        this.dkttPagingInfo=response.data.data.paging_info
                    }else if(resCode==204){
                        this.dkList=[];
                        this.dkttPagingInfo={};
                        alert('KTT 단말 목록이 없습니다.')
                    }else if(resCode==410){
                        alert("로그인 세션이 만료되었습니다.");
                        EventBus.$emit('top-path-logout');
                        this.$store.dispatch("LOGOUT")
                            .then( res => { 
                            console.log(res.status)}).catch(({ message }) => (this.msg = message))
                            this.$router.replace('/signin')
                    }else{
                        this.dkList=[];
                        this.dkttPagingInfo={};
                        alert(resCode+" / "+resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
                .finally(function(){})
            }
        },
        setToSearchParams: function(values){

        var params = {
            page_no: values.page,
            view_cnt: values.itemsPerPage
        }
        console.log('페이지 값')
        console.log(params)
        this.searchdKTTInfo(params)
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

        if(params.status_code !== undefined && params.status_code !== ''){
            newParams.status_code = params.status_code
        }else if(
            this.searchParam.status_code!==undefined&&
            this.searchParam.status_code!==""
        ){
            newParams.status_code=this.searchParam.status_code
        }

        if(params.service_no !== undefined && params.service_no !== ''){
            newParams.service_no = params.service_no
        }else if(
            this.searchParam.service_no!==undefined&&
            this.searchParam.service_no!==""
        ){
            newParams.service_no=this.searchParam.service_no
        }
        
        
      if(Number(newParams.start_date)-Number(newParams.end_date)>0){
        alert('형식에 맞는 날짜 검색값을 입력해주세요')
        newParams.start_date=dateInfo().lastWeekDashFormat.replace(/-/g,"")
        newParams.end_date=dateInfo().currentDateDashFormat.replace(/-/g,"")
        this.searchParam.start_date=dateInfo().lastWeekDashFormat
        this.searchParam.end_date=dateInfo().currentDateDashFormat
      }
      
        return newParams;
        }
    }
}
</script>