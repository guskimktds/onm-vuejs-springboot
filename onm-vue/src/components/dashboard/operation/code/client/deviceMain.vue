<template>
    <v-container fluid>
      <v-card>
        <!-- <device-query v-on:search="searchToButton"></device-query> -->
        <device-query
        @search="searchDate"></device-query>
        <device-list v-bind:pList=pList></device-list>
      </v-card>
    </v-container>
</template>

<script>
import deviceQuery from './deviceQuery'
import deviceList from './deviceList'
import dateInfo from '../../../../utils/common'

import axios from "axios"

export default {
  components:{
    deviceQuery,
    deviceList
  },
  data () {
    return {
      title: 'APP(Client) 단말 관리',
      pList: [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam:{
        start_date: dateInfo().lastWeekDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        date_yn: true,
        order_category:'R'
      }
      // searchParam: { 
      //   app_version_id: '',
      //   // code_id: '',
      //   os_type: '',
      //   // code_type: ''
      // }
    }
  },
  mounted() {
    this.searchDate(this.searchParam)
  },
  methods: {
    searchDate:function(params){
    var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15010/get_app_info`
    
    var reqParam=this.handleParams(params)
    console.log(reqParam)
    axios
        .post(url, reqParam, this.$store.state.headers)
        .then((response) => {
          var resCode = response.data.res_code
          var resMsg = response.data.res_msg
          if(resCode == 200){
            this.pList = response.data.data.app_info_list
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

    handleParams: function(params){
      let newParams = {}
      console.log(params.date_yn)

      if(params.date_yn==true){
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
      }
      
        if (params.order_category !== undefined && params.order_category !== "") {
        newParams.order_category = params.order_category;
      } else if (
        this.searchParam.order_category !== undefined &&
        this.searchParam.order_category !== ""
      ) {
        newParams.order_category = this.searchParam.order_category;
      }

        return newParams
    }

  }
 
}
</script>

<style scoped>
</style>