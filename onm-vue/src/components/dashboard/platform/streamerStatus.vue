<template>
    <v-container fluid>
      <v-card>
        <streamer-query 
          v-on:search="searchToProcess"
          v-bind:param="searchParam"
          v-bind:localGwOptions="localGwOptions"
        ></streamer-query>
        <streamer-list 
          v-bind:pList=pList
        ></streamer-list>
      </v-card>
    </v-container>
</template>

<script>
import List from './streamer/streamerList'
import Query from './streamer/streamerQuery'

import EventBus from '../../../EventBus'
import axios from "axios"

const headers = {
  "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
  "Content-Type": "application/json",
};

const url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11005/get_streamer_info`;

export default {
  components: {
    streamerList : List,
    streamerQuery : Query
  },
  data () {
    return {
      title: '스트리머 조회',
      pList: [],
      searchParam: {
        local_gw_id: ''
      },
      localGwOptions: [],
    }
  },

  mounted() {
    
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
        this.localGwOptions = response.data.data.local_gw_list;
        // version_code가 1302이상인 국사를 조회하도록 파라미터 세팅(21.06.03)
        for(var idx in this.localGwOptions){
           if(this.localGwOptions[idx].version_code > 1301){
             var local_gw_id = this.localGwOptions[idx].local_gw_id;
           }
        }
        this.searchParam.local_gw_id = local_gw_id;
        //
        
        // var local_gw_id = 'D'
        // this.searchParam.local_gw_id = local_gw_id;
        // this.searchParam.local_gw_id=this.localGwOptions[0].local_gw_id;
        this.searchToProcess(this.searchParam)
    })
    .catch(function (error) {
        console.log(error);
        alert("국사정보 조회실패")
      })
    .finally(function () {
    });

  },


  methods: {
    searchToProcess: function(params){

      axios
      .post(url, params, headers)
      .then( (response) => {

        console.log(response);

        if(response.data.res_code == 200){
          this.pList = response.data.data.stm_list;
        }else if(response.data.res_code==410){
          alert("로그인 세션이 만료되었습니다.");
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
        }else{
          this.pList = [];
          alert(response.data.res_code + " / " + response.data.res_msg);
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
    
  },

}
</script>

<style scoped>

</style>