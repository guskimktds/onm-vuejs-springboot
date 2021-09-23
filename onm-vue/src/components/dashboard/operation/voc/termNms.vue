<template>
    <v-container fluid>
      <v-card>
        <term-nms-query
          v-on:search="searchToButton"
          v-bind:param=searchParam
        ></term-nms-query>

        <term-nms-list
        v-bind:pList=pList
        v-bind:resPagingInfo="resPagingInfo"
        @child="clickToSearchDetailObject"
        @pagination="setToSearchParams"></term-nms-list>

         <v-container
            id="regular-tables"
            fluid 
            tag="section"
        >
         <v-btn v-bind:color="changeColor(showDetailObject)"  v-if=showTermNmsSubList v-on:click="showDetailObject=!showDetailObject">
            단말 nms 상세 리스트 {{showDetailObject?" Close":" Open"}}
         </v-btn>   

        </v-container>

        <v-container v-if=showDetailObject>
          <term-nms-sub-list
          v-bind:termSubList=termSubList
          v-bind:authPagingInfo=authPagingInfo
          ></term-nms-sub-list>
          </v-container>
      </v-card>
    </v-container>
</template>

<script>
import termNmsQuery from './termNmsQuery'
import termNmsList from './termNmsList'
import termNmsSubList from './termNmsSubList.vue'


//로그인 시 서버에서 불러오면 수정해야함
import EventBus from '../../../../EventBus'
import axios from "axios"
// import EventBus from '../../../../../EventBus';

export default {
  components:{
    termNmsQuery,
    termNmsList,
    termNmsSubList
    },
  data () {
    return {
      title: '단말오더 nms전송',
      pList: [],
      showDetailObject: false,
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      authPagingInfo: {},
      searchParam: {
        guid: '',
      },

      title2: '단말nms 상세',
      termSubList: [],
      showTermNmsSubList: false,
      btnTitle: '단말 nms 상세'


    }
  },
 
  methods: {
    searchToButton: function(params){
      this.showDetailObject=false
      this.isReloadDetailObject=false
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15023/send_term_to_nms`

      var reqParams = this.handleParams(params) 
        console.log('전달값')
        console.log(reqParams) 
      if(!reqParams.guid){
        this.$fire({
              title: "검색값을 입력해주세요.",
              type: "error"})
      }else{
      axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          var resMsg = response.data.res_msg;
          if(resCode == 200){
            this.pList = response.data.data.user_mig_device_list;
            this.termSubList = response.data.data.user_mig_device_list;  //데이터 바꿀것
            this.resPagingInfo = response.data.data.paging_info;
            this.authPagingInfo = response.data.data.paging_info; //sub페이징
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('고객이전 단말 상태 데이터가 없습니다.');
          }else if(resCode==410){
            alert("로그인 세션이 만료되었습니다.");
             EventBus.$emit('top-path-logout');
                this.$store
                .dispatch("LOGOUT")
                .then( res => { 
                console.log(res.status)}).catch(({ message }) => (this.msg = message))
                this.$router.replace('/signin')
          }else{
            this.pList = [];
            this.resPagingInfo = {};
            alert(resCode + " / " + resMsg);
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
      }
    },
    clickToSearchDetailObject: function(){
      this.showTermNmsSubList != this.showTermNmsSubList
    },
    setToSearchParams: function(values){
      console.log(values)
      console.log('검색 정보')
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      // this.searchToButton(params)
    },
    changeColor(values){
      if(values===true){
        return 'green';
      }else{
        return "indigo";
      }
    },
    handleParams: function(params){
      let newParams = {}

      if(params.guid !== undefined && params.guid !== ''){
        newParams.guid = params.guid
      }else if(
        this.searchParam.guid!==undefined&&
        this.searchParam.guid!==""
      ){
        newParams.guid=this.searchParam.guid
      }
      return newParams
    }
  }
}
</script>

<style scoped>

</style>