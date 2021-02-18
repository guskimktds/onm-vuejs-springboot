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
      </v-card>

      <modal
      v-bind:mask="mask"
      ref="modal"></modal>
    </v-container>
</template>

<script>
import List from './workersInfoList'
import Query from './workersInfoQuery'
import Modal from './workersInfoModal'

import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/${process.env.VUE_APP_API_VERSION}/ONM_12014/get_worker_id_info_list`;

export default {
  
  components: {
    List, Query, Modal
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
        tel_no: "",
        said: "",
        status_code: "",
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
          this.pList = response.data.data.order_list;
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
          oderno:values,
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
          this.mask = response.data.data.order_list[0];
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

      if (params.tel_no !== undefined && params.tel_no !== "") {
        newParams.tel_no = params.tel_no;
      } else if (
        this.searchParam.tel_no !== undefined &&
        this.searchParam.tel_no !== ""
      ) {
        newParams.tel_no = this.searchParam.tel_no;
      }

      if (params.said !== undefined && params.said !== "") {
        newParams.said = params.said;
      } else if (
        this.searchParam.said !== undefined &&
        this.searchParam.said !== ""
      ) {
        newParams.said = this.searchParam.said;
      }

      if (params.status_code !== undefined && params.status_code !== "") {
        newParams.status_code = params.status_code;
      } else if (
        this.searchParam.status_code !== undefined &&
        this.searchParam.status_code !== ""
      ) {
        newParams.status_code = this.searchParam.status_code;
      }

      return newParams;
    },
    
  }
  
}
</script>

<style scoped>

</style>