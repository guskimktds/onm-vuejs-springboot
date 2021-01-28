<template>
    <v-container>
      <v-card>
        <cameraInfo-query v-on:search="searchToCameraInfo"
         v-bind:param=searchParam></cameraInfo-query>
        <cameraInfo-list 
        v-bind:dcList="dcList"
        v-bind:resPagingInfo=resPagingInfo
        @pagination="setToSearchParams"></cameraInfo-list>
      </v-card>
    </v-container>
</template>

<script>
import CameraInfoList from "./cameraInfoList";
import CameraInfoQuery from "./cameraInfoQuery";

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    CameraInfoList,
    CameraInfoQuery,
  },
  data() {
    return {
      title: "카메라 정보 조회",
      dcList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      resPagingInfo:{},
      searchParam:{
        mod_date:'',
        prod_code:'',
        user_id:''
      }
    }
  },
  created: function () {
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13008/get_cam_list`

    var params=this.reqPagingInfo

    axios
        .post(url, params, headers)
        .then((response) => {
          console.log(response.data)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.dcList = response.data.data.cam_list;
            this.resPagingInfo = response.data.data.paging_info
          }else{
            this.dcList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패', ex)
        })
  },
  methods: {
  searchToCameraInfo: function (params) {
    
     var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_13008/get_cam_list`


    var reqParams=this.handleParams(params)
  
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.dcList = response.data.data.cam_list;
          this.resPagingInfo = response.data.data.paging_info
    
        }else{
          this.dcList = [];
          this.resPagingInfo = {};
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
    },
    
    setToSearchParams: function(values){
      console.log(values)

      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToCameraInfo(params)
    },

    handleParams:function(params){
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

      if(params.open_date !== undefined && params.open_date !== ''){
        newParams.open_date = params.open_date
      }
      if(params.cam_id !== undefined && params.cam_id !== ''){
        newParams.cam_id = params.cam_id
      }
      if(params.cam_name !== undefined && params.cam_name !== ''){
        newParams.cam_name = params.cam_name
      }
      if(params.mac_id !== undefined && params.mac_id !== ''){
        newParams.mac_id = params.mac_id
      }

      return newParams
    }
  },
}
</script>

<style scoped>
</style>