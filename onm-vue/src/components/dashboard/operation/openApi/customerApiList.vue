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
        title="API별 사용 현황 조회"
        class="px-5 py-3"
      >
      <v-row>
        <v-col>

      <v-text-field 
      label="search"
      v-model="api_no"
      ></v-text-field>
        </v-col>
        <v-col>

      <v-btn
      v-on:click="searchCustomerApi"
      >검색</v-btn>
        </v-col>
      </v-row>
      <v-data-table
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
import EventBus from '../../../../EventBus'
import axios from "axios"
  const headers={
'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
'Content-Type': 'application/json'
}
export default {
    props: ['pList','resPagingInfo'],
  data() {
    return {

            reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      api_no: "",
      headers: [
        { text: '인터페이스 번호', value: 'api_no' },
        { text: 'api 접속량', value: 'access_cnt' },
        { text: '날짜', value: 'access_date' },
      ],
        last: 0,
        options: {},
        totalList: 0,

    }
  },

  methods: {
    handleClick:function(value){
        this.$emit("child", value.site_id);
      },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
      console.log("ㅇ페이징 옵션들"+this.options.total_cnt)
    },
    searchMethod: function() {
        this.$emit("searchCustomer", this.search);
        console.log("보내는거Tjcl" + this.search)
    },
      searchCustomerApi: function(params){
      var reqParams = this.handleParams(params);
      console.log("api 사이트 아이디 " + reqParams.view_cnt+"페이징"+reqParams.page_no)

  var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_13047/get_site_open_api_access/api`
      axios
      .post(url, reqParams, headers)
      .then( (response) => {

        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if (resCode == 200) {
          this.pList = response.data.data.access_api_list;
          this.cList = response.data.data.access_cnt;
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
       handleParams: function (params) {
      console.log(params+"DFDFDFD핸들파람");
      let newParams = {};
  
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
      if(params.api_no !== undefined && params.api_no !== ''){
        newParams.api_no = params.api_no
      }else if(
        this.searchParam.api_no!==undefined&&
        this.searchParam.api_no!==""
      ){
        newParams.api_no=this.searchParam.api_no
      }
      return newParams;
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