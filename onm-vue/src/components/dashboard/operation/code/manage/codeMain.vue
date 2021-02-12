<template>
    <v-container fluid>
      <v-card>
        <code-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></code-query>
        <code-list v-bind:pList=pList></code-list>
      </v-card>

    </v-container>
</template>

<script>
import CodeQuery from './codeQuery'
import CodeList from './codeList'

//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
import axios from "axios"
import EventBus from '../../../../../EventBus'

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
  components:{
    CodeQuery,
    CodeList
  },
  data () {
    return {
      title: '코드관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        code_master_id: '',
        code_id: '',
        code_name: '',
        code_type: ''
      }
    }
  },
  created: function() {
    // var url = 'https://test-onm.ktvsaas.co.kr/V110/ONM_15006/get_code'
    // // var url =`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/ONM_12006/get_device_order`
    // var params = {
    //   page_no: 1,
    //   view_cnt: 5
    // }

    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15006/get_code`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    var params = this.reqPagingInfo

    // var headers = {
    //   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
    //   'Content-Type': 'application/json'
    // }

    axios
        .post(url, params, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.list
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
  },
  mounted: function() {
     EventBus.$on('createItemCode', params => {
        //console.log('codeMain.vue eventbus : param : ',parameter)
        var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15007/set_code`

        axios.post(url, params, this.$store.state.headers)
          .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              //현재 목록에서 선택한 Item을 삭제한다.
              this.pList.unshift(params)
            }else{
              alert(resCode + " / " + resMsg);
            }
          })
          .catch((ex) => {
            console.log('변경 실패',ex)
          })
    })
  },
  methods: {
    searchToButton: function(params){
    console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15006/get_code`

    //params : 페이징 + 검색조건
    var reqParams = this.handleParams(params)  

        axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                this.pList = response.data.data.list;
                this.resPagingInfo = response.data.data.paging_info

              }else{
                this.pList = [];
                this.resPagingInfo = {};
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('조회 실패',ex)
            })
    },
    // saveToData: function(){
    //   console.log('saveToData Method call : ',process.env);
    //   axios
    //         .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/customer-phone/query`, {       
    //               params
    //         })
    //         .then((result) => {
    //           console.log(result)
    //           // this.list = JSON.parse(result.data.menu)
    //           this.list = result.data
    //         })
    //         .catch((ex) => {
    //           console.log('조회 실패',ex)
    //         })
    // }

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


      if(params.code_master_id !== undefined && params.code_master_id !== ''){
        newParams.code_master_id = params.code_master_id
      }

      if(params.code_id !== undefined && params.code_id !== ''){
        newParams.code_id = params.code_id
      }

      if(params.code_name !== undefined && params.code_name !== ''){
        newParams.code_name = params.code_name
      }   
      
      if(params.code_type !== undefined && params.code_type !== ''){
        newParams.code_type = params.code_type
      }  

      return newParams
    }

    
  },

}
</script>

<style scoped>

</style>