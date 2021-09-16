<template>
    <v-container fluid>
      <v-card>
        <term-order-info-query 
          v-on:search="searchToUserOrderInfo"
          v-bind:param=searchParam
        ></term-order-info-query>
        <user-order-info-list 
          v-bind:pList=pList 
          v-bind:resPagingInfo=resPagingInfo 
          @child="clickToSearchDetailObject" 
          @pagination="setToSearchParams"
        >
        </user-order-info-list>
        <v-container
            id="regular-tables"
            fluid
            tag="section"
        >
          <v-btn v-bind:color="changeColor(showDetailObject)"  v-if=isReloadDetailObject v-on:click="showDetailObject=!showDetailObject">
            오더상세{{showDetailObject?" Close":" Open"}}
          </v-btn>
        </v-container>
    
        <v-container
            id="regular-tables"
            fluid
            tag="section"
        >

          <v-btn v-bind:color="changeColor(showSubDetailList)" v-if=showDetailObject v-on:click="clickToSearchSubDetailList()">
            사용자 청약오더List{{showSubDetailList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showKttList)" v-if=showDetailObject v-on:click="clickToSearchKTT()" >
            사용자-KTT{{showKttList?" Close":" Open"}}
          </v-btn>

          <v-btn v-bind:color="changeColor(showUserOrderPhone)" v-if=showDetailObject v-on:click="searchToUserOrderPhone()" >
            사용자 청약 전화번호{{showUserOrderPhone?" Close":" Open"}}
          </v-btn>

        </v-container>

      <user-order-detail-object v-if=showDetailObject v-bind:pObject=pObject></user-order-detail-object>
      
      <v-container v-if=showDetailObject>

        <user-order-sub-detail-list 
          v-if=showSubDetailList
          v-bind:sdList=sdList >
        </user-order-sub-detail-list>

        <ktt-list 
          v-if=showKttList 
          v-bind:kttList=kttList
        ></ktt-list>
        
        <user-order-phone-list
          v-if=showUserOrderPhone 
          v-bind:UserOrderPhone=UserOrderPhone
        >  
        </user-order-phone-list>

      </v-container>
      </v-card>
    </v-container>
</template>

<script>
import UserOrderInfoList from '../../order/user/order-info/userOrderInfoList'
import termOrderInfoQuery from './termOrderInfoQuery'
import UserOrderDetailObject from '../../order/user/order-detail/userOrderDetailObject'
import UserOrderSubDetailList from '../../order/user/order-detail/userOrderSubDetailList'
import KttList from '../../../dashboard/order/ktt-order/kttOrderInfoList.vue'
import dateInfo from '../../../utils/common'
import UserOrderPhoneList from '../../order/user-order-phone/userOrderPhoneList'
import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    UserOrderInfoList,
   termOrderInfoQuery,
    UserOrderDetailObject,
    UserOrderSubDetailList,
    KttList,
    UserOrderPhoneList
  },
  data () {
    return {
      title: '사용자 청약 오더 정보',
      pList: [],
      pObject: {        
      },
      showDetailObject: false,
      isReloadDetailObject: false,
      btnTitle: '청약오더상세open',
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },

      title2: '사용자 청약오더 List',
      sdList:[],
      showSubDetailList:false,
      btnTitle2: '사용자 청약오더List open',

      title3: '사용자-KTT 정보 조회',
      kttList:[],
      showKttList:false,
      btnTitle3: '사용자-KTT open',

      resPagingInfo: {},
      oldValue:'',
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        said: '',
        guid: '',
        oderno: '',
        is_masking:''
      }
    }
  },

  methods: {
    searchToUserOrderInfo: function(params){
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)      
      console.log('넣어지는 값')
      console.log(reqParams)
      if(!reqParams.said&&!reqParams.start_date&&!reqParams.guid&&!reqParams.oderno){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, headers)
      .then((response) => {
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info
     
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert("사용자 청약 오더 정보 데이터가 없습니다.");
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
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12002/get_user_subs_detail`
        var params = {
          guid: values,
          is_masking: this.searchParam.is_masking? "N" : "Y"
        }

        axios.post(url, params, headers)
        .then((response) => {
           var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.pObject = response.data.data
              this.showDetailObject = true
              this.isReloadDetailObject = true
              this.orderBtn=!this.orderBtn
              console.log(this.pObject)
            }else if(resCode==204){
              this.pObject = {};
              this.showDetailObject = false
              this.isReloadDetailObject = false
            alert("사용자 청약오더 상세 데이터가 없습니다.");
            }else{
              this.pObject = {};
              this.showDetailObject = false
              this.isReloadDetailObject = false
              alert(resCode + " / " + resMsg);
            }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }

      if(values!==this.oldValue){
          console.log('실행')
          this.showSubDetailList=false
          this.showKttList=false
      } 
        this.oldValue={}
        this.oldValue=values

    },
        
    clickToSearchSubDetailList:function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12003/get_subs_order_details_list`
    var params={
      guid: this.pObject.guid,
    }

    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.sdList = response.data.data.order_detail_list;
            this.showSubDetailList=!this.showSubDetailList;
            this.subBtn=!this.subBtn
          }else if(resCode==204){
           this.sdList = [];
            this.showSubDetailList=false
            alert("사용자청약 오더 List 데이터가 없습니다.");
          }else{
            this.sdList = [];
            this.showSubDetailList=false
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
    },
    searchToUserOrderPhone: function(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12004/get_user_subs_telno`
      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)    
      console.log('요청하는 파람')
      console.log(reqParams)
      if(!reqParams.start_date&&!reqParams.telno&&!reqParams.guid){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, headers)
      // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
      //   params
      // })
      .then((response) => {
        
        console.log(response.data)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.tel_no_list;
          this.resPagingInfo = response.data.data.paging_info
               console.log(this.pList, this.resPaging);
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert("사용자 청약 전화번호 데이터가 없습니다.");
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
      }
    },

    clickToSearchKTT: function(){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12005/get_user_ktt_subs`
    var params={
      guid: this.pObject.guid,
    }
    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          console.log(resCode)
          if(resCode == 200){
            this.kttList = response.data.data.list;

            this.showKttList =!this.showKttList
            this.kttBtn=!this.kttBtn
          }else if(resCode==204){
            this.kttList = [];
            alert('사용자-KTT 데이터가 없습니다.');
            this.showKttList=false
          }else{
            this.kttList = [];
            alert(resCode + " / " + resMsg);
            this.showKttList=false
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
    },

    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }

      console.log(params)

      this.searchToUserOrderInfo(params)
    },

    handleParams: function(params){
      let newParams = {}
      console.log(this.searchParam.date_yn)
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
      
      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      ){
        newParams.said=this.searchParam.said
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

      if(params.date_yn !== undefined && params.date_yn !== ''){
        newParams.date_yn = params.date_yn
      }else if(
        this.searchParam.date_yn!==undefined&&
        this.searchParam.date_yn!==""
      ){
        newParams.date_yn=this.searchParam.date_yn
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