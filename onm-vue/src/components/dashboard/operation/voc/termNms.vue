<template>
    <v-container fluid>
      <v-card>
        <term-nms-query
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></term-nms-query>

        <term-nms-list
        v-bind:pList=pList
        v-bind:resPagingInfo=resPagingInfo
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"></term-nms-list>

         <v-container
            id="regular-tables"
            fluid 
            tag="section"
        >

         <v-btn v-bind:color="changeColor(showDetailObject)"  v-if=showTermNmsSubList v-on:click="showDetailObject=!showDetailObject">
            단말 nms 상세 리스트 {{showDetailObject?" Close":" Open"}}
         </v-btn>   
   
          <v-btn v-bind:color="changeColor(showSendBtn)"  v-if=showDetailObject v-on:click="sendToButton()">
              전송하기
          </v-btn>   


        </v-container>

        <v-container v-if=showDetailObject>
          <term-nms-sub-list
          v-bind:termSubList=termSubList
          v-bind:authPagingInfo=authPagingInfo
          ></term-nms-sub-list>
          </v-container>
      </v-card>
    </v-container>
</template>

<script>
import termNmsQuery from './termNmsQuery'
import termNmsList from './termNmsList'
import termNmsSubList from './termNmsSubList.vue'


//로그인 시 서버에서 불러오면 수정해야함
import EventBus from '../../../../EventBus'
import axios from "axios"
// import EventBus from '../../../../../EventBus';

export default {
  components:{
    termNmsQuery,
    termNmsList,
    termNmsSubList
    },
  data () {
    return {
      title: '단말오더 nms전송',
      pList: [],
      oder_div_code:'',
      receipt_date:'',
      oder_no:'',
      oder_seq:'',
      said:'',
      appoint_date:'',
      svc_ofc_code:'',
      svc_ofc_nm:'',
      bizp_nm:'',
      change_code:'',
      update_type:'',
      arno_adr_zip_code:'',
      arno_adr_bas_sbst:'',
      arno_adr_dtl_sbst:'',
      road_nadr_zip_code:'',
      road_nadr_bas_sbst:'',
      road_nadr_dtls_bst:'',
      sales_manid:'',
      sales_mannm:'',
      sales_mantelno:'',
      corr_orderno:'',
      change_ared_cd:'',
      subline_listinfo:[],
      showDetailObject: false,
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      authPagingInfo: {},
      searchParam: {
        guid: '',
      },

      title2: '단말nms 상세',
      termSubList: [],
      showTermNmsSubList: false,
      btnTitle: '단말 nms 상세',
      
      showSendBtn: false,

    }
  },
 
  methods: {
    searchToButton: function(params){
      this.showDetailObject=false
      this.showTermNmsSubList=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15023/send_term_to_nms`

      var reqParams = this.handleParams(params) 
        console.log('전달값')
        console.log(reqParams) 
      if(!reqParams.guid){

        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            console.log(response.data.data.info[0].bizp_nm,);
            this.guid = reqParams.guid;
            this.pList = response.data.data.info;  //데이터
            this.oder_div_code= response.data.data.info[0].oder_div_code,
            this.receipt_date= response.data.data.info[0].receipt_date,
            this.oder_no= response.data.data.info[0].oder_no,
            this.oder_seq= response.data.data.info[0].oder_seq,
            this.said= response.data.data.info[0].said,
            this.appoint_date= response.data.data.info[0].appoint_date,
            this.svc_ofc_code= response.data.data.info[0].svc_ofc_code,
            this.svc_ofc_nm= response.data.data.info[0].svc_ofc_nm,
            this.bizp_nm= response.data.data.info[0].bizp_nm,
            this.change_code= response.data.data.info[0].change_code,
            this.update_type= response.data.data.info[0].update_type,
            this.arno_adr_zip_code= response.data.data.info[0].arno_adr_zip_code,
            this.arno_adr_bas_sbst= response.data.data.info[0].arno_adr_bas_sbst,
            this.arno_adr_dtl_sbst= response.data.data.info[0].arno_adr_dtl_sbst,
            this.road_nadr_zip_code= response.data.data.info[0].road_nadr_zip_code,
            this.road_nadr_bas_sbst= response.data.data.info[0].road_nadr_bas_sbst,
            this.road_nadr_dtls_bst= response.data.data.info[0].road_nadr_dtls_bst,
            this.sales_manid= response.data.data.info[0].sales_manid,
            this.sales_mannm= response.data.data.info[0].sales_mannm,
            this.sales_mantelno= response.data.data.info[0].sales_mantelno,
            this.corr_orderno= response.data.data.info[0].corr_orderno,
            this.change_ared_cd= response.data.data.info[0].change_ared_cd,
            this.resPagingInfo = response.data.data.paging_info; //sub페이징
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('고객이전 단말 상태 데이터가 없습니다.');
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
    clickToSearchDetailObject: function(){
      var params ={
        guid : this.guid
      }
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15024/send_term_to_nms_order_list`
      var reqParams = this.handleParams(params) 
        console.log('전달값')
        console.log(reqParams) 
        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.termSubList = response.data.data.order_list;  //데이터 바꿀것
            this.authPagingInfo = response.data.data.paging_info; //sub페이징
                  this.showDetailObject = true;
                  this.showSendBtn = true;
                  this.showTermNmsSubList =! this.showTermNmsSubList
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.termNmsList = [];
            this.authPagingInfo = {};
            alert('고객이전 단말 상태 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
             EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
          }else{
            this.termNmsList = [];
            this.authPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    
    },
       sendToButton: function(){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15025/order_info`
      var params = {
        oder_div_code : this.oder_div_code,
        receipt_date : this.receipt_date,
        oder_no: this.oder_no,
        oder_seq:this.oder_seq,
        said:this.said,
        appoint_date:this.appoint_date,
        svc_ofc_code:this.svc_ofc_code,
        svc_ofc_nm:this.svc_ofc_nm,
        bizp_nm:this.bizp_nm,
        change_code:this.change_code,
        update_type:this.update_type,
        arno_adr_zip_code:this.arno_adr_zip_code,
        arno_adr_bas_sbst:this.arno_adr_bas_sbst,
        arno_adr_dtl_sbst:this.arno_adr_dtl_sbst,
        road_nadr_zip_code:this.road_nadr_zip_code,
        road_nadr_bas_sbst:this.road_nadr_bas_sbst,
        road_nadr_dtls_bst:this.road_nadr_dtls_bst,
        sales_manid:this.sales_manid,
        sales_mannm:this.sales_mannm,
        sales_mantelno:this.sales_mantelno,
        corr_orderno:this.corr_orderno,
        change_ared_cd:this.change_ared_cd,
        orderlist : this.termSubList,
        subline_listinfo:[],
      }

        console.log('전달값')
        console.log(params) 

          this.showSendBtn =! this.showSendBtn
      axios.post(url, params, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
                    this.$fire({
              title: "전송하였습니다.",
              type: "true"})
            
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
             EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
          }else{
             this.$fire({
              title: "전송실패하였습니다.",
              body: resCode + " / " + resMsg,
              type: "error"})
          }
        })
        .catch((ex) => {
          this.$fire({
              title: "전송실패하였습니다.",
              body: ex,
              type: "error"})
        })
  
    },
    setToSearchParams: function(values){
      console.log(values)
      console.log('검색 정보')
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      // this.searchToButton(params)
    },
    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
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
      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }
      return newParams
    }
  }
}
</script>

<style scoped>

</style>