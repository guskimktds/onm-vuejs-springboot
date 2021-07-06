<template>
  <v-container fluid>
      <v-card>    
        <device-order-info-query 
        v-on:search="searchToDeviceOrderInfo"
        v-bind:param="searchParam"></device-order-info-query>
        
        <device-order-info-list 
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo

        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"></device-order-info-list>
      </v-card>

      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <v-btn v-bind:color="changeColor(showDetailObject)" v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
          단말오더 상세{{showDetailObject?" Close":" Open"}}
         </v-btn>

        <v-btn v-bind:color="changeColor(showDetailList)" v-if="showDetailObject" v-on:click="clickToSearchDetailList()">
          단말오더 상세 내역{{showDetailList?" Close":" Open"}}
        </v-btn>

        <v-btn v-bind:color="changeColor(showResultList)" v-if="showDetailObject" v-on:click="clickToSearchResultList()">
          단말오더 처리결과{{showResultList?" Close":" Open"}}
        </v-btn>

       </v-container>

      <device-order-object v-if=showDetailObject v-bind:pObject=pObject></device-order-object>

      <v-container v-if=showDetailObject>
        <device-order-detail-list v-if=showDetailList
        v-bind:dodList="dodList"
    
        ></device-order-detail-list>
        
        <device-order-result-list v-if=showResultList
        v-bind:dorList="dorList"
        ></device-order-result-list>
      
      </v-container>
    
    </v-container>
</template>

<script>
import DeviceOrderInfoList from './device-order-info/deviceOrderInfoList'
import DeviceOrderInfoQuery from './device-order-info/deviceOrderInfoQuery'
import DeviceOrderObject from './device-order-info/deviceOrderObject'
import DeviceOrderDetailList from './device-order-info/deviceOrderDetailList'
import DeviceOrderResultList from './device-order-info/deviceOrderResultList'
import dateInfo from '../../utils/common'

import EventBus from '../../../EventBus'
import axios from "axios"

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    DeviceOrderInfoList,
    DeviceOrderInfoQuery,
    DeviceOrderObject,
    DeviceOrderDetailList,
    DeviceOrderResultList
  },
  data () {
    return {
      title: '단말 청약 오더 정보',
      pList: [],
      pObject:{},
      showDetailObject:false,
      isReloadDetailObject:false,
      btnTitle: '단말오더 정보 상세Open',

      title2:'단말오더 상세 내역',
      dodList:[],
      showDetailList:false,
      btnTitle2:'단말오더 상세내역 open',

      title3:'단말오더 처리 결과',
      dorList:[],
      showResultList:false,
      btnTitle3:'단말오더 처리결과 open',

      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      oldValue:'',

      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        guid:'',
        oderno:'',
        said:'',
        notice_yn:''
      }
    }
  },

  methods: {
    searchToDeviceOrderInfo: function(params){
      this.showDetailObject=false
      this.isReloadDetailObject=false
      console.log('검색값')
      console.log(params)
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12006/get_device_order`
     
      var reqParams=this.handleParams(params)
      if(!reqParams.start_date&&!reqParams.guid&&!reqParams.oderno&&!reqParams.said){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
        axios.post(url, reqParams, headers)
            .then((response) => {
             console.log(response)
              var resCode=response.data.res_code;
              var resMsg=response.data.res_msg;
              if(resCode==200){
                this.pList=response.data.data.device_order_list;
                this.resPagingInfo=response.data.data.paging_info;
              }else if(resCode==204){
                this.pList = [];
                this.resPagingInfo = {};
                alert("단말 청약 오더 정보 데이터가 없습니다.");
              }else if(resCode==410){
                alert("로그인 세션이 만료되었습니다.");
                EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
              }else{
                this.pList=[];
                this.resPagingInfo={};
                alert(resCode+" / "+ resMsg);
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
            .finally(function(){})
      }
    },

    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },
    clickToSearchDetailObject: function(values){
      if(values) {

        var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12007/get_device_order_detail`

        var params = {
          guid: values,
          page_no: '1',
          view_cnt: '5'
        }
      
        axios.post(url, params, headers)
        .then((response) => {
           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data
               console.log(this.pObject)
              this.showDetailObject = true
              this.isReloadDetailObject = true
            }else if(resCode==204){
              this.pObject = {};
              alert('단말 청약 오더 정보 상세 데이터가 없습니다.');
              this.showDetailObject = false
              this.isReloadDetailObject = false
            }else{
              this.pObject = {};
              alert(resCode + " / " + resMsg);
              this.showDetailObject = false
              this.isReloadDetailObject = false
            }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }

      if(values!==this.oldValue){
          console.log('실행')
          this.showDetailList=false
          this.showResultList=false
      } 
        this.oldValue={}
        this.oldValue=values

    },

    clickToSearchDetailList:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12008/get_device_order_detail_list`

      var params={
      guid: this.pObject.guid,
      page_no: '1',
      view_cnt: '5',
      }

      console.log('검색값')
      console.log(params)
      
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dodList=response.data.data.list;
              
              this.showDetailList=!this.showDetailList;
              console.log('$$$$')
              console.log(this.dodList)
            }else if(resCode==204){
              this.dodList=[];
           
              alert('단말오더 상세 내역 데이터가 없습니다.');
              this.showDetailList=false
            }else{
              this.dodList=[];
           
              alert(resCode + " / "+ resMsg);
              this.showDetailList=false
            }
          })
          .catch((ex)=>{
            console.log('조회 실패', ex)
          })
    },
    
    clickToSearchResultList:function(){
      var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12012/get_device_order_result_list`

      var params={
        guid:this.pObject.guid,
        page_no: '1',
        view_cnt: '5'
      }
      axios
          .post(url,params,headers)
          .then((response)=>{
            var resCode=response.data.res_code;
            var resMsg=response.data.res_msg;
            if(resCode==200){
              this.dorList=response.data.data.device_order_result_list;
             
              this.showResultList=!this.showResultList;
            }else if(resCode==204){
              this.dorList=[];
             
              alert('단말오더 처리결과 데이터가 없습니다.');
              this.showResultList=false
            }else{
              this.dorList=[];
             
              alert(resCode+" / "+resMsg);
              this.showResultList=false
            }
          })
          .catch((ex)=>{
            console.log('조회 실패',ex)
          })
    },

    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToDeviceOrderInfo(params)
    },

    handleParams:function(params){
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

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }
      if(params.oderno !== undefined && params.oderno !== ''){
        newParams.oderno = params.oderno
      }else if(
        this.searchParam.oderno!==undefined&&
        this.searchParam.oderno!==""
      ){
        newParams.oderno=this.searchParam.oderno
      }
      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      ){
        newParams.said=this.searchParam.said
      }

      if(params.notice_yn !== undefined && params.notice_yn !== ''){
        newParams.notice_yn = params.notice_yn
      }else if(
        this.searchParam.notice_yn!==undefined&&
        this.searchParam.notice_yn!==""
      ){
        newParams.notice_yn=this.searchParam.notice_yn
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