<template>
  <v-container fluid>
      <v-card>
        <cam-prod-query 
          v-on:search="searchToButton"
          v-bind:param=searchParam
        >
        </cam-prod-query>  
        
        <cam-prod-list
          v-bind:pList=pList
          v-bind:resPagingInfo="resPagingInfo"
          @pagination="setToSearchParams"
        >
        </cam-prod-list>
      </v-card>

    </v-container>
</template>

<script>
import CamProdQuery from './camProdQuery.vue'
import CamProdList from './camProdList.vue'
import EventBus from '../../../../../EventBus'
import axios from "axios"

export default {
  components: {
    CamProdQuery,
    CamProdList
  },
  
  data() {
    return {
      title: '카메라 제품 정보',
      pList: 
        [],
      reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
      },
      resPagingInfo: {},
      searchParam: {
        cam_prod_id: '',
        cam_prod_name: '',
      },
    }
  },

  methods: {
    searchToButton: function(params){
      console.log("부모 메소드 searchToButton 호출: "+JSON.stringify(params));
      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15032/get_cam_prod_list`

      var reqParams = this.handleParams(params)  
      console.log('보내는 값')
      console.log(reqParams)
        axios.post(url, reqParams, this.$store.state.headers)
        .then((response) => {
          console.log(response)
          var resCode = response.data.res_code;
          
          if(resCode == 200){
            this.pList = response.data.data.list;
            this.resPagingInfo = response.data.data.paging_info
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
            alert("Error");
          }
        })
        .catch((ex) => {
          console.log('조회 실패',ex)
        })
    },

    setToSearchParams(values) {
      console.log('전달값')
      console.log(values)
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage,
      };

      this.searchToButton(params);
    },

    handleParams: function(params){
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

      if(params.cam_prod_id !== undefined && params.cam_prod_id !== ''){
        newParams.cam_prod_id = params.cam_prod_id
      }

      if(params.cam_prod_name !== undefined && params.cam_prod_name !== ''){
        newParams.cam_prod_name = params.cam_prod_name
      }
      return newParams
    }



  }
}
</script>

<style>

</style>