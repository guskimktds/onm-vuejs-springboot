<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="매장별 호출 수"
        class="px-5 py-3"
      >
      <v-text-field 
      label="search"
      v-model="search"
      ></v-text-field>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="pList"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>


<script>
import EventBus from '../../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15114/get_site_open_api/user`;
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      search: "",
      headers: [
        { text: '사이트 ID', value: 'site_id' },
        { text: '사이트 이름', value: 'site_name' },
        { text: '인터페이스 번호', value: 'api_no' },
        { text: '인터페이스 설명', value: 'description' },
        { text: '날짜', value: 'reg_date' },
        { text: 'API 접속 제한량', value: 'api_access_limit' },
      ],
        last: 0,
        options: {},
        totalList: 0,
         List:[{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20001/live_video","description":"실시간 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20002/event_video","description":"이벤트 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20003/record_video","description":"녹화 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"GSM_CTRL_001","site_name":"GSM","api_no":"/V100/GSM_10001/send_said","description":"GSM 연동 계정 정보 전달","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10123/event","description":"이벤트 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10003/set_camera","description":"카메라 청약 등록/삭제 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10111/camera","description":"카메라 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10101/account","description":"매장 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_00003/authToken","description":"인증 토큰 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10022/record_video","description":"녹화 영상 정보 조회","reg_date":"20200922220459","api_access_limit":0}]

    }
  },
  created(){
    EventBus.$on('getCustomerApiList',this.searchCustomerApi())
    EventBus.$on('getEvent')
      
    
  },

  methods: {
     searchCustomerApi: function(params){
       console.log('이벤트 버스 타기')
      var reqParams = this.handleParams(params);
      console.log(reqParams)

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.api_list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
          this.pList = [];
          this.resPagingInfo = {};
          alert('사용자 API 데이터가 없습니다.');
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else {
          this.pList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
      })
      .finally(function () {
        // always executed
      });
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '정상'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='A'){
        return '접수/등록'
      }
    },
    switchString2(values){
      if(values==='X'){
        return '삭제대기'
      }else if(values==='S'){
        return '정상'
      }else if(values==='D'){
        return '삭제'
      }
    }, handleParams: function (params) {
      console.log(params);
      // let newParams = {};
      // if(params.date_yn==undefined){
      //   params.date_yn=this.searchParam.date_yn
      // }
      // console.log(this.searchParam.date_yn)

      // if (params.page === undefined || params.page === "") {
      //   newParams.page_no = this.reqPagingInfo.page_no;
      // } else {
      //   newParams.page_no = params.page;
      // }

      // if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
      //   newParams.view_cnt = this.resPagingInfo.view_cnt;
      // } else {
      //   newParams.view_cnt = params.itemsPerPage;
      // }
      
      // if(params.date_yn==true){
      //   if(params.start_date !== undefined && params.start_date !== ''){
      //     newParams.start_date = params.start_date.replace(/-/g,"")
      //   }else if(
      //     this.searchParam.start_date!==undefined&&
      //     this.searchParam.start_date!==""
      //   ){
      //     newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
      //   }

      //   if(params.end_date !== undefined && params.end_date !== ''){
      //     newParams.end_date = params.end_date.replace(/-/g,"")
      //   }else if(
      //     this.searchParam.end_date!==undefined&&
      //     this.searchParam.end_date!==""
      //   ){
      //     newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
      //   }
      // }

      // if (params.site_id !== undefined && params.site_id !== "") {
      //   newParams.site_id = params.site_id;
      // } else if (
      //   this.searchParam.site_id !== undefined &&
      //   this.searchParam.site_id !== ""
      // ) {
      //   newParams.site_id = this.searchParam.site_id;
      // }

      // if (params.api_no !== undefined && params.api_no !== "") {
      //   newParams.api_no = params.api_no;
      // } else if (
      //   this.searchParam.api_no !== undefined &&
      //   this.searchParam.api_no !== ""
      // ) {
      //   newParams.api_no = this.searchParam.api_no;
      // }
      
     
      
      // return newParams;
    },

    
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>

<style>
    
</style>