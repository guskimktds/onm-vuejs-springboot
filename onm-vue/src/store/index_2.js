import Vue from 'vue'
import Vuex from 'vuex'
import EventBus from '../../../../EventBus'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
      itemList:[],
    },
    getters: {
        fetchedApiList(state){
            return state.itemList;
        }
    },
    mutations:{
        SET_OPENAPI_LIST(state, openApiList){
            state.itemList = openApiList;
        }
    },
    action: {
        FETCH_OPENAPI_LIST({commit}, params){
        searchToButton(params){
        termAuthList()
     

      var reqParams = this.handleParams(params) 
        console.log('전달값')
        console.log(reqParams) 
      if(!reqParams.mac_id){
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
            context.commit('SET_AUTH_LIST')
            this.pList = response.data.data.hist_list;
            this.resPagingInfo = response.data.data.paging_info;
            console.log('페이지 정보')
            console.log(this.resPagingInfo)
          }else if(resCode==204){
            this.pList = [];
            this.resPagingInfo = {};
            alert('단말 인증 정보 데이터가 없습니다.');
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
    setToSearchParams: function(values){
      console.log(values)
      console.log('검색 정보')
      var params = {
        page_no: values.page,
        view_cnt: values.itemsPerPage
      }

      console.log(params)

      this.searchToButton(params)
    },

    handleParams: function(params){
      let newParams = {}

      if(params.mac_id !== undefined && params.mac_id !== ''){
        newParams.mac_id = params.mac_id
      }else if(
        this.searchParam.mac_id!==undefined&&
        this.searchParam.mac_id!==""
      ){
        newParams.mac_id=this.searchParam.mac_id
      }
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
      return newParams
    }  
        }
    }
        
    })
