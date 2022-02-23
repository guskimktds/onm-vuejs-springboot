<template>
    <v-container fluid>
      <v-card>
          <!-- v-on:search="searchToProcess" -->
        <customer-api-query
          v-on:search="searchParams"
          v-bind:param="searchParam"
        ></customer-api-query>
        <count-api
          v-bind:sList=sList
          v-bind:cList=cList
        >
        </count-api>
      <v-row>
        <v-col cols="6">
          
          <customer-api-list
          dense 
            v-bind:param="searchParam"
            v-bind:pList=pList
            v-bind:resPagingInfo=resPagingInfo
            @child="clickToSearchDetailObject" 
            @pagination="setToSearchParams"
          ></customer-api-list>
        </v-col>
        <v-col cols="6">
          <store-api-list
          dense
            v-bind:storeList=storeList
            v-bind:storeResPagingInfo="storeResPagingInfo"
            @child="clickToSearchDetailObject" 
            @pagination="setToSearchParams"
          ></store-api-list>
        </v-col>
      </v-row>

      <h1>나타나기</h1>
      <v-card>
        <ul v-for="site_id in rowList" v-bind:key="site_id">
          <h1>api명 | 호출 수</h1>
          <li></li>
        </ul>
      </v-card>


        <v-dialog v-model="showModal" max-width="500px">
            <v-card>
            <v-card-title class="headline"> 매장별 API 호출 수</v-card-title>
            <v-text leftSpace>호출일자: {{rowList.start_date}}</v-text>
            <v-text>매장명: {{rowList.start_date}}</v-text>
            <hr>
              <!-- <ul v-for="site_id in rowList" v-bind:key="site_id">       -->
                                      <table>
                                            <tr>
                                                <th></th>
                                                <th style="text-align:center">api 명  </th>
                                                <th style="text-align:center">호출 수</th>
                                            </tr>
                                            <tr v-for="api_no in rowList" v-bind:key="api_no"> 
                                                 <td>{{rowList.api_no}}</td>
                                                 <td>{{rowList.access_cnt}}</td>
                                            </tr>
                                        </table>       
              <!-- </ul> -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">닫기</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
        </v-dialog>
>>>>>>> develop
      </v-card>     
    </v-container>
</template>

<script>
import customerApiQuery from './customerApiQuery'
import customerApiList from './customerApiList'
import StoreApiList from './storeApiList.vue'
import countApi from './countApiTab.vue'
import dateInfo from "../../../utils/common"
import EventBus from '../../../../EventBus'
import axios from "axios"
  const headers={
'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
'Content-Type': 'application/json'
}
export default {
  
  components: {
    customerApiQuery,
    customerApiList,
    countApi,
    StoreApiList
  },

  data () {
    return {
      cList: [],
      pList: [],
      sList:[],
      storeList: [],
      rowList:[],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10,
      },
      resPagingInfo: {},
      storeResPagingInfo:{},
      searchParam: {
        start_date: dateInfo().threeMonthDashFormat,
        end_date: dateInfo().currentDateDashFormat,
        site_id: '',
        api_no: '',
        user_id: '',
      },
      showModal: false
    }
  },
  methods: {   
//api관련
   searchCustomerApi: function(params){
      var reqParams = this.handleParams(params);
      // reqParams.site_id ='JHC_CTRL_001'
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
   //user관련 로드
     searchStoreApi: function(params){
       const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/user`;
      var reqParams = this.handleParams(params);
            // reqParams.site_id ='JHC_CTRL_001'
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
    //검색
    
      //row 클릭
      clickToSearchDetailObject: function(values){

    
       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/user`
       var params = {
         site_id: values.site_id,
         user_id: values.user_id,
         start_date: values.access_date,
         end_date: values.access_date,
         api_no: values.api_no,
         page_no: '1',
         view_cnt: '100',
       }
       console.log(JSON.stringify(params)+"DDDDDDDDewrerer")
      // this.showModal=!this.showModal
       axios.post(url, params, headers)
       .then((response) => {
          var resCode = response.data.res_code;
           var resMsg = response.data.res_msg;
           if(resCode == 200){
             this.rowList = response.data.data.access_user_list
             this.showDetailObject = true
             this.isReloadDetailObject = true
             this.orderBtn=!this.orderBtn
             console.log(this.rowList)
           }else if(resCode==204){
             this.rowList = {};
             this.showDetailObject = false
             this.isReloadDetailObject = false
           alert("사용자 청약오더 상세 데이터가 없습니다.");
           }else{
             this.rowList = {};
             this.showDetailObject = false
             this.isReloadDetailObject = false
             alert(resCode + " / " + resMsg);
           }
       })
       .catch((ex) => {
         console.log('조회 실패',ex)
       })
     

     if(values!==this.oldValue){
         console.log('실행')
         this.showSubDetailList=false
         this.showKttList=false
     } 
       this.oldValue={}
       this.oldValue=values

   },
    setToSearchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }
      console.log(params.page_no+"페이징")
      this.searchStoreApi(params)
      this.searchCustomerApi(params)
    },
    searchParams: function(values){
      console.log(values)
      
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      }
      console.log(params.page_no+"페이징")
      this.searchStoreApi(params)
      this.searchCustomerApi(params)
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
      if(params.site_id !== undefined && params.site_id !== ''){
        newParams.site_id = params.site_id
      }else if(
        this.searchParam.site_id!==undefined&&
        this.searchParam.site_id!==""
      ){
        newParams.site_id=this.searchParam.site_id
      }
      return newParams;
    }
  }
}
</script>

<style scoped>

</style>