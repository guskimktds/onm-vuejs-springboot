<template>
  <v-container fluid>
      <v-card>
        <device-auth-result-query
          v-on:search="searchToButton"
          v-bind:param=searchParam
          @Items="saveItem"
        >
        </device-auth-result-query>  
        
        <device-auth-result-list
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @reset="reset"
          @pagination="setToSearchParams"
        >
        </device-auth-result-list>
      </v-card>

    </v-container>
</template>

<script>
import deviceAuthResultQuery from './deviceAuthResultQuery.vue'
import deviceAuthResultList from './deviceAuthResultList.vue'
import EventBus from '../../../../EventBus'
import axios from "axios"

export default {
  components: {
    deviceAuthResultQuery,
    deviceAuthResultList
  },
  
  data() {
    return {
      title: '단말인증결과 조회',
      pList: 
        [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        termauthcode: '',
        said:'',
        psaid:'',
        termbarcode:'',
        mac_id:'',
        ip_addr:'',
        disp_start_date: '',
        disp_end_date: ''
      },
    }
  },

  methods: {
    reset: function(){
      console.log(this.searchParam)
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15032/get_cam_prod_list`
      var reqParams = this.handleParams(this.searchParam)
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          if(resCode == 200){
            this.pList = response.data.data.cam_prod_list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else{
            this.pList = [];
            this.resPagingInfo = {};
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    searchToButton: function(params){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15032/get_cam_prod_list`
      var reqParams = this.handleParams(params)  
      console.log('보내는 값', reqParams);
        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          if(resCode == 200){
            this.pList = response.data.data.cam_prod_list; //device_auth_list
            this.resPagingInfo = response.data.data.paging_info
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
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    saveItem(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15033/set_cam_prod_info`

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
                  type : "success"
                })
                this.searchToButton(params);
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

    setToSearchParams(values) {
      console.log('전달값')
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToButton(params);
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

      if(params.auth_result !== undefined && params.auth_result !== ''){
        newParams.auth_result = params.auth_result
      }else if(
        this.searchParam.auth_result!==undefined&&
        this.searchParam.auth_result!==""
      ){
        newParams.auth_result=this.searchParam.auth_result
      }

      if(params.said !== undefined && params.said !== ''){
        newParams.said = params.said
      }else if(
        this.searchParam.said!==undefined&&
        this.searchParam.said!==""
      ){
        newParams.said=this.searchParam.said
      }

      if(params.psaid !== undefined && params.psaid !== ''){
        newParams.psaid = params.psaid
      }else if(
        this.searchParam.psaid!==undefined&&
        this.searchParam.psaid!==""
      ){
        newParams.psaid=this.searchParam.psaid
      }

      if(params.barcode_no !== undefined && params.barcode_no !== ''){
        newParams.barcode_no = params.barcode_no
      }else if(
        this.searchParam.barcode_no!==undefined&&
        this.searchParam.barcode_no!==""
      ){
        newParams.barcode_no=this.searchParam.barcode_no
      }

      if(params.mac_addr !== undefined && params.mac_addr !== ''){
        newParams.mac_addr = params.mac_addr
      }else if(
        this.searchParam.mac_addr!==undefined&&
        this.searchParam.mac_addr!==""
      ){
        newParams.mac_addr=this.searchParam.mac_addr
      }

      if(params.ip_addr !== undefined && params.ip_addr !== ''){
        newParams.ip_addr = params.ip_addr
      }else if(
        this.searchParam.ip_addr!==undefined&&
        this.searchParam.ip_addr!==""
      ){
        newParams.ip_addr=this.searchParam.ip_addr
      }

      if(params.disp_start_date !== undefined && params.disp_start_date !== ''){
        newParams.disp_start_date = params.disp_start_date.replace(/-/g,"")
      }else if(
        this.searchParam.disp_start_date!==undefined&&
        this.searchParam.disp_start_date!==""
      ){
        newParams.disp_start_date=this.searchParam.disp_start_date.replace(/-/g,"")
      }
      
      if(params.disp_end_date !== undefined && params.disp_end_date !== ''){
        newParams.disp_end_date = params.disp_end_date.replace(/-/g,"")
      }else if(
        this.searchParam.disp_end_date!==undefined&&
        this.searchParam.disp_end_date!==""
      ){
        newParams.disp_end_date=this.searchParam.disp_end_date.replace(/-/g,"")
      }
      return newParams
    }



  }
}
</script>

<style>

</style>