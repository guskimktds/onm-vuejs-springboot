
<template>
    <v-container fluid>
      <v-card>

        <process-query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
          v-bind:localGwOptions="localGwOptions"
        ></process-query>
        
        <process-list 
          v-bind:pList=pList
        ></process-list>

      </v-card>
    </v-container>
</template>


<script>
import List from './camera/cameraList'
import Query from './camera/cameraQuery'

import axios from "axios"
import EventBus from '../../../EventBus'

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11002/get_cam_status`;

export default {
  components: {
    'process-list': List,
    'process-query': Query
  },
  data () {
    return {
      title: '카메라 상태 현황',

      pList: [],

      searchParam: {
        local_gw_id: ''
      },
      localGwOptions:[],
      allOptions:{
        server_name:"전체",
        local_gw_id: ""
      }
    }
  },

  beforeCreate() {  
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
      this.localGwOptions = response.data.data.local_gw_list;
      this.localGwOptions.unshift(this.allOptions);
    
    })
    .catch(function (error) {
        console.log(error);
        console.log("국사정보 조회실패")
      })
      .finally(function () {
        // always executed
      });
  },

  methods: {
    searchToProcess: function(params){

      var reqParams = this.handleParams(params);

      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            console.log("카메라상태 현황 데이터가 없습니다.");
        }else if(resCode==410){
          console.log("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else {
          this.pList = [];
          this.resPagingInfo = {};
          console.log(resCode + " / " + resMsg);
        }

      })
      .catch(function (error) {
        console.log(error);
        console.log("Error")
      })
      .finally(function () {
        // always executed
      });
    },

    handleParams: function (params) {

      let newParams = {};

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      return newParams;
    },
  },
    created: function() {
    this.searchToProcess(this.searchParam);
  }  
}
</script>

<style scoped>

</style>