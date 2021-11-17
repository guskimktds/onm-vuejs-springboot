<template>
    <v-container fluid>
      <v-card>
        <local-code-list v-bind:pList=pList></local-code-list>
      </v-card>
    </v-container>
</template>

<script>

import localCodeList from './localCodeList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import EventBus from '../../../../../EventBus'
import axios from "axios"
// import { eventBus } from '../../../../main'

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
  components:{
    localCodeList
  },
  data () {
    return {
      title: '로컬 국사 정보 관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        local_gw_id: '',
        // code_id: '',
        server_name: '',
        // code_type: ''
      }
    }
  },
  mounted: function() {
    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15008/get_local_gw'
    // // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12006/get_device_order`
    // var params = {
    //   page_no: 1,
    //   view_cnt: 5
    // }
    // var headers = {
    //   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
    //   'Content-Type': 'application/json'
    // }
    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo
    // var headers = this.$store.state.headers
    // console.log(headers)

    this.searchToButton(params)

  },

  methods: {
    searchToButton: function(params){
      // console.log("부모 메소드 searchToDeviceOrderInfo 호출: "+JSON.stringify(params));
      // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15008/get_local_gw'
      // // var params = {
      // //   page_no: 1,
      // //   view_cnt: 5
      // // }
      // var headers = {
      //   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
      //   'Content-Type': 'application/json'
      // }
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`

      //params : 페이징 + 검색조건
      var reqParams = this.handleParams(params)  

        // axios.post(url, params, headers)
        // // .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/code/query`, {
        // //   params
        // // })
        // .then((result) => {
        //   console.log(result)
        //   //this.list = JSON.parse(result.data.menu)
        //   this.pList = result.data.data.local_gw_list;
        // })
        // .catch((ex) => {
        //   console.log('조회 실패',ex)
        // })
        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          
          if(resCode == 200){
            this.pList = response.data.data.local_gw_list;
            this.resPagingInfo = response.data.data.paging_info

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
<<<<<<< HEAD
            console.log(resCode + " / " + resMsg);
=======
            alert("Error");
>>>>>>> develop
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    saveItems(params){
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15009/set_local_gw`

      axios.post(url,params, this.$store.state.headers)
        .then((response)=>{
          var resCode=response.data.res_code;
          var resMsg=response.data.res_msg;
          if(resCode==200){
            this.pList.unshift(params)

            this.$fire({
              title: "등록 되었습니다.",
              type: "success"})
          }else{
            this.$fire({
              title: "등록 실패하였습니다.",
              html: resMsg,
              type: "error"})
          }
        })
        .catch((ex)=>{
          this.$fire({
            title: "등록 실패하였습니다.",
            text: ex,
            type: "error"
          })
        })
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


      if(params.local_gw_id !== undefined && params.local_gw_id !== ''){
        newParams.local_gw_id = params.local_gw_id
      }

      if(params.server_name !== undefined && params.server_name !== ''){
        newParams.server_name = params.server_name
      }

      return newParams
    }
  }
}
</script>

<style scoped>

</style>