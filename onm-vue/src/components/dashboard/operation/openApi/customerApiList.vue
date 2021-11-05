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
        title="API별 호출 수"
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
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
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
export default {
    props: ['pList','resPagingInfo'],
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
        { text: 'action', value: 'action' },
      ],
        last: 0,
        options: {},
        totalList: 0,
         List:[
           {"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20001/live_video","description":"실시간 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20002/event_video","description":"이벤트 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"KTT_CTRL_001","site_name":"KTT 관제시스템","api_no":"/V100/KTT_20003/record_video","description":"녹화 영상 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"GSM_CTRL_001","site_name":"GSM","api_no":"/V100/GSM_10001/send_said","description":"GSM 연동 계정 정보 전달","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10123/event","description":"이벤트 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10003/set_camera","description":"카메라 청약 등록/삭제 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10111/camera","description":"카메라 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10101/account","description":"매장 정보 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_00003/authToken","description":"인증 토큰 요청","reg_date":"20200922220459","api_access_limit":0},{"site_id":"POS_CTRL_001","site_name":"POS","api_no":"/V100/OAS_10022/record_video","description":"녹화 영상 정보 조회","reg_date":"20200922220459","api_access_limit":0}
         ]

    }
  },

  methods: {
    handleClick:function(value){
        this.$emit("child", value.guid);
      },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values=='T'){
        return '청약취소'
      }else if(values=='Y'){
        return '통보완료'
      }else if(values=='N'){
        return '미통보'
      }
    }
    
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