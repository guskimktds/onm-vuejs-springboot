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
        title="서비스 업체별 호출 수"
        class="px-5 py-3"
      >

      <v-row>
        <v-col>

      <v-text-field 
      label="매장명 검색"
      v-model="user_id"
      ></v-text-field>
        </v-col>
        <v-col>
           <v-btn
     v-on:click="searchStoreApiButton"
      >검색</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="storeList"
        :server-items-length="storeResPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>


<script>
import EventBus from '../../../../../EventBus'
import axios from "axios"
  const headers={
'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
'Content-Type': 'application/json'
}
export default {
  props: ["storeList", "storeResPagingInfo"],
  data() {
    return {
      headers: [
        { text: '매장', value: 'user_id' },
        { text: 'api 접속량', value: 'access_cnt' },
        { text: '날짜', value: 'access_date' },
      ],
        user_id:'',
        last: 0,
        options: {},
        totalList: 0,
        // List:[{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20001/live_video","description":"실시간 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20002/event_video","description":"이벤트 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20003/record_video","description":"녹화 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"GSM_CTRL_001","site_name":"GSM","api_no":"/V100/GSM_10001/send_said","description":"GSM 연동 계정 정보 전달","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10123/event","description":"이벤트 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10003/set_camera","description":"카메라 청약 등록/삭제 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10111/camera","description":"카메라 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10101/account","description":"매장 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_00003/authToken","description":"인증 토큰 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10022/record_video","description":"녹화 영상 정보 조회","reg_date":"20200922220459","api_access_limit":0}]

    }
  },
methods: {
   getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
      console.log("storeApiList"+this.options.total_cnt)
    },

    handleClick: function(value){
      this.$emit("child", value);
      console.log("로우클릭 값 보내기"+JSON.stringify(value))

    },

    searchMethod: function() {
      this.$emit("searchStore", this.param);
      console.log("보내는거Tjcl" + this.param)
    },
    searchStoreApiButton: function(params){
      const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/user`;
      var reqParams = this.setParams(params);
    
      console.log(reqParams)

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.storeList = response.data.data.access_user_list;
          this.sList = response.data.data.access_cnt;
          this.storeResPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
          this.storeList = [];
          this.sList = response.data.data.access_cnt;
          this.storeResPagingInfo = {};
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
          this.storeList = [];
          this.storeResPagingInfo = {};
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
    setParams:function(options){
      var values={
        page_no: options.page,
        view_cnt: options.itemsPerPage,
        user_id:this.user_id
      }
      return values;
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
    if(this.last!==this.storeResPagingInfo.total_cnt){
      this.options.page=1
    }
    if(this.storeResPagingInfo.total_cnt!==undefined){
      this.last=this.storeResPagingInfo.total_cnt
    }
  }
    
}
</script>

<style>
    
</style>