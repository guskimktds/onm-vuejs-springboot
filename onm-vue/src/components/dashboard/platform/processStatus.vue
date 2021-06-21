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
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="searchToProcess"
        ></process-list>
      </v-card>
    </v-container>
</template>

<script>
import ProcessList from './process/processList'
import ProcessQuery from './process/processQuery'

import axios from "axios"
import EventBus from '../../../EventBus'

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11001/get_process_status`;

export default {
  
  components: {
    'process-list': ProcessList
    , 'process-query': ProcessQuery
  },
  
  data () {
    return {
      title: '프로세스 현황 화면',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      searchParam: {
        local_gw_id: "",
        process_type: "",
        process_status: ""
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
        alert("국사정보 조회실패")
      })
      .finally(function () {
        // always executed
      });
  },

  methods: {
    searchToProcess: function(params){
      var reqParams = this.handleParams(params);
      console.log('리퀘스트 파람')
      console.log(reqParams)
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.process_list;
          this.resPagingInfo = response.data.data.paging_info;
        }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert("프로세스 현황 데이터가 없습니다.");
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

    handleParams: function (params) {
      console.log(params);
      let newParams = {};
      if (params.page === undefined || params.page === "") {
        newParams.page_no = this.reqPagingInfo.page_no;
      } else {
        newParams.page_no = params.page;
      }

      if (params.itemsPerPage === undefined || params.itemsPerPage === "") {
        newParams.view_cnt = this.resPagingInfo.view_cnt;
      } else {
        newParams.view_cnt = params.itemsPerPage;
      }

      if (params.local_gw_id !== undefined && params.local_gw_id !== "") {
        newParams.local_gw_id = params.local_gw_id;
      } else if (
        this.searchParam.local_gw_id !== undefined &&
        this.searchParam.local_gw_id !== ""
      ) {
        newParams.local_gw_id = this.searchParam.local_gw_id;
      }

      if (params.process_type !== undefined && params.process_type !== "") {
        newParams.process_type = params.process_type;
      } else if (
        this.searchParam.process_type !== undefined &&
        this.searchParam.process_type !== ""
      ) {
        newParams.process_type = this.searchParam.process_type;
      }

      if (params.process_status !== undefined && params.process_status !== "") {
        newParams.process_status = params.process_status;
      } else if (
        this.searchParam.process_status !== undefined &&
        this.searchParam.process_status !== ""
      ) {
        newParams.process_status = this.searchParam.process_status;
      }else if(this.searchParam.process_status==0){
        delete newParams.process_status
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>