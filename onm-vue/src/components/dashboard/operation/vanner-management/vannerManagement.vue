<template>
    <v-container fluid>
      <v-card>
        <vanner-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
          v-bind:localGwOptions="localGwOptions"
          v-bind:pList=pList
        ></vanner-query>
        <vanner-list
        v-on:search="searchToButton"
        v-bind:param=searchParam
        v-bind:pList=pList
        v-bind:gw_id="gw_id"
        v-bind:resPagingInfo="resPagingInfo"
        @pagination="setToSearchParams"
        @reset="reset"></vanner-list>
      </v-card>

    </v-container>
</template>

<script>
import vannerList from './vannerList'
import vannerQuery from './vannerQuery'
import EventBus from '../../../../EventBus';
 //import dateInfo from '../../../utils/common';
//로그인 시 서버에서 불러오면 수정해야함
//import AdminMenuMock from '../../../mock/AdminListMock.json';
//import EventBus from '../../../../../EventBus'
import axios from "axios"

// const headers = {
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
  components:{
    vannerList,
    vannerQuery
  },
  data () {
    return {
      title: '코드관리',
      gw_id: '',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        img_name:'',
        img_type:'',
        title: '',
        disp_yn: '',
        disp_start_date: '',
        disp_end_date: '',
        reg_date:'',
        local_gw_id:'',
        os_type:''
        
      },
      localGwOptions:[],
      centerOptions:{
        server_name:'센터',
        local_gw_id:''
      }
    }
  },
  methods: {
    reset: function(){
      console.log(this.searchParam)
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15122/get_banner`
       var reqParams = this.handleParams(this.searchParam)
       console.log(reqParams)
      axios
        .post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            // this.authGroupList = response.data.data.auth_group_list
            // this.isAuthMenu = true
            this.pList = response.data.data.banner_list;
            this.resPagingInfo = response.data.data.paging_info
            console.log(this.resPagingInfo)
          }else{
            // this.authGroupList = [];
            // this.isAuthMenu = false
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },
    searchToButton: function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15122/get_banner`

    //params : 페이징 + 검색조건
    var reqParams = this.handleParams(params)  
    EventBus.$emit('param', params);
    console.log('보내는 값')
    console.log(reqParams)
        axios.post(url, reqParams, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                this.pList = response.data.data.banner_list;
                this.resPagingInfo = response.data.data.paging_info
                this.gw_id=reqParams.local_gw_id
                console.log('paging')
                console.log(this.resPagingInfo)
              }else if(resCode==204){
                this.pList = [];
                this.resPagingInfo = {};
                alert('코드 관리 데이터가 없습니다.');
              }else if(resCode==410){
                alert("로그인 세션이 만료되었습니다.");
              //  EventBus.$emit('top-path-logout');
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

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if(params.title !== undefined && params.title !== ''){
        newParams.title = params.title
      }

      if(params.img_type !== undefined && params.img_type !== ''){
        newParams.img_type = params.img_type
      }

      if(params.disp_yn !== undefined && params.disp_yn !== ''){
        newParams.disp_yn = params.disp_yn
      }   
      
      if(params.reg_date !== undefined && params.reg_date !== ''){
        newParams.reg_date = params.reg_date
      }  
      if(params.disp_start_date !== undefined && params.disp_start_date !== ''){
        newParams.disp_start_date = params.disp_start_date
      }
      if(params.disp_end_date !== undefined && params.disp_end_date !== ''){
        newParams.disp_end_date = params.disp_end_date
      }
      if(params.img_name !== undefined && params.img_name !== ''){
        newParams.img_name = params.img_name
      }
  
      return newParams
    }
    
    
  },
  created(){
    // this.searchToButton(this.params);
  }

}
</script>

<style scoped>

</style>