<template>
    <v-container fluid>
      <v-card>
        <query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
        ></query>

        <list 
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="searchToProcess"
          @child="clickMaskObject"
        ></list>
      <modal
      v-bind:mask="mask"
      ref="modal"></modal>
      </v-card>
    </v-container>
</template>

<script>
import List from './usrInfoList'
import Query from './usrInfoQuery'
import dateInfo from '../../../utils/common'
import Modal from './userModal'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_13004/get_user_tel_list`;

export default {
  
  components: {
    List, Query , Modal
  },
  
  data () {
    return {
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      mask:{},
      resPagingInfo: {},
      searchParam: {
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        user_name: "",
        user_id: "",
        tel_no: "",
      },
      
    }
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
          this.pList = response.data.data.tel_no_list;
          this.resPagingInfo = response.data.data.paging_info;
        } else {
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

    clickMaskObject:function(values){

      if(values){
        console.log('클릭값')
        console.log(values)

        var params={
          user_id: values,
          page__no:"1",
          view_cnt:"5",
          is_masking: "N"
        }
        var reqParams=params

      axios.post(url, reqParams, headers)
      .then((response) => {
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.mask = response.data.data.tel_no_list[0];
          console.log(this.mask)
        }else{
          this.mask = [];
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
        })
      }

      this.$refs.modal.open();
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
      
      if(params.start_date !== undefined && params.start_date !== ''){
        newParams.start_date = params.start_date.replace(/-/g,"")
      }else if(
        this.searchParam.start_date!==undefined&&
        this.searchParam.start_date!==""
      ){
        newParams.start_date=this.searchParam.start_date.replace(/-/g,"")
      }

      if(params.end_date !== undefined && params.end_date !== ''){
        newParams.end_date = params.end_date.replace(/-/g,"")
      }else if(
        this.searchParam.end_date!==undefined&&
        this.searchParam.end_date!==""
      ){
        newParams.end_date=this.searchParam.end_date.replace(/-/g,"")
      }

      if (params.user_name !== undefined && params.user_name !== "") {
        newParams.user_name = params.user_name;
      } else if (
        this.searchParam.user_name !== undefined &&
        this.searchParam.user_name !== ""
      ) {
        newParams.user_name = this.searchParam.user_name;
      }

      if (params.user_id !== undefined && params.user_id !== "") {
        newParams.user_id = params.user_id;
      } else if (
        this.searchParam.user_id !== undefined &&
        this.searchParam.user_id !== ""
      ) {
        newParams.user_id = this.searchParam.user_id;
      }

      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>