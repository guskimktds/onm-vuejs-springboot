<template>
    <v-container fluid>
      <v-card>
        <prod-info-query v-on:search="searchprodInfo" v-bind:param=searchParam></prod-info-query>
        <prod-info-list v-bind:prodList="prodList" v-bind:soPagingInfo=soPagingInfo 
            @pagination="setToSearchParams"></prod-info-list>
      </v-card>
    </v-container>
</template>

<script>
import ProdInfoList from "./prodInfoList";
import ProdInfoQuery from "./prodInfoQuery";
import EventBus from '../../../../EventBus'
import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    ProdInfoList,
    ProdInfoQuery,
  },
  data() {
    return {
      title: "사용자 센서 신청 현황",
      prodList: [],
      reqPagingInfo:{
        page_no:1,
        view_cnt:10
      },
      soPagingInfo:{},
      searchParam:{
        prod_info_id:'',
        prod_from:'',
      },
      start: true
    }
  },

 methods: {
  searchprodInfo: function (params) {
    console.log(params)
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_15046/get_prod_info_list`

    var reqParams=this.handleParams(params)
      axios.post(url, reqParams, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
 
        if(resCode == 200){
          this.prodList = response.data.data.prod_info_list;
          this.soPagingInfo = response.data.data.paging_info
    
        }else if(resCode==204){
          this.prodList = [];
          this.soPagingInfo = {};
          alert('센서 신청 현황 데이터가 없습니다.');
        }else if(resCode==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.prodList = [];
          this.soPagingInfo = {};
          alert("Error");
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
      if(this.start==true){
        this.prodList=[]
      }else{
      this.searchprodInfo(params)
      }
      this.start=false
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

      if(params.prod_info_id !== undefined && params.prod_info_id !== ''){
        newParams.prod_info_id = params.prod_info_id
      }else if(
        this.searchParam.prod_info_id!==undefined&&
        this.searchParam.prod_info_id!==""
      ){
        newParams.prod_info_id=this.searchParam.prod_info_id
      }

      if(params.prod_from !== undefined && params.prod_from !== ''){
        newParams.prod_from = params.prod_from
      }else if(
        this.searchParam.prod_from!==undefined&&
        this.searchParam.prod_from!==""
      ){
        newParams.prod_from=this.searchParam.prod_from
      }

      return newParams
    }
  },
}

</script>

<style scoped>
</style>