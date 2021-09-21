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

          <v-btn v-bind:color="changeColor(showPhonelList)" v-if=showDetailObject v-on:click="searchToUserOrderPhone()" >
            사용자 청약 전화번호{{showPhonelList?" Close":" Open"}}
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
          v-if=showPhonelList 
          v-bind:telNoList=telNoList
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
      
      title4: '사용자 청약 전화번호',
      telNoList:[],
      showPhonelList:false,
      btnTitle4: '사용자 청약 전화번호 조회',

      resPagingInfo: {},
      oldValue:'',
      searchParam: {
    
        said: '',
      
        // is_masking:''
      }
    }
  },

  methods: {
    searchToUserOrderInfo: function(params){
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_12001/get_user_subs_order_info`
  
      //params : 페이징 + 검색조건
      // var reqParams = this.handleParams(params)      
      // console.log('넣어지는 값')
      // console.log(reqParams)
      // if(!reqParams.said&&!reqParams.start_date&&!reqParams.guid&&!reqParams.oderno){
      //   this.$fire({
      //         title: "검색값을 입력해주세요.",
      //         type: "error"})
      // }else{
      axios.post(url, params, headers)
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
      // }
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
          guid:values.guid,
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
      said: this.pObject.said,
    }

    axios
        .post(url, params, headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.sdList = response.data.data.order_detail_list;
            this.showSubDetailList=!this.showSubDetailList;
            // this.subBtn=!this.subBtn
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

    searchToUserOrderPhone: function(){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_12004/get_user_subs_telno`
      var params = {
        page_no: 1,
        view_cnt: 10,
        guid: this.pObject.guid,
      }
      axios
      .post(url, params, headers)
      .then((response) => {
        console.log(response.data)
        //this.list = JSON.parse(result.data.menu)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.showPhonelList != this.showPhonelList;
          this.telNoList = response.data.data.tel_no_list;
          // this.resPagingInfo = response.data.data.paging_info
          // console.log(this.telNoList, this.resPagingInfo);
        }else if(resCode==204){
            this.telNoList = [];
            // this.resPagingInfo = {};
            alert("사용자 청약 전화번호 데이터가 없습니다.");
            this.showPhonelList=false;
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
            this.showPhonelList=false;
        }else{
          this.pList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      // }
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
      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      )
      return newParams
    }
  }
}
</script>

<style scoped>

</style>