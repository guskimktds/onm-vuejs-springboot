<template>
  <v-container fluid>
      <v-card>
        <cam-firmware-query
            v-on:search="searchToButton"
            v-bind:param=searchParam
            @Items="saveItems"
        ></cam-firmware-query>
        <cam-firmware-list
            v-bind:pList=pList
            v-bind:firmwareResPagingInfo="firmwareResPagingInfo"
            @pagination="setToSearchParams"
        ></cam-firmware-list>
      </v-card>

    </v-container>
</template>

<script>
import EventBus from '../../../../../EventBus'
import axios from "axios"
import CamFirmwareQuery from './camFirmwareQuery.vue'
import CamFirmwareList from './camFirmwareList.vue'

export default {
    components: {
        CamFirmwareQuery,
        CamFirmwareList
    },
    data() {
        return {
            title: '카메라 펌웨어',
            firmwareList: [],
            reqPagingInfo: {
                page_no: 1,
                view_cnt: 10
            },
            firmwareResPagingInfo: {},
            searchParam: {
                product_code: '',
            }
        }
    },
    methods: {
        searchToButton: function(params){
            var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15030/get_cam_firmware_list`

            //params : 페이징 + 검색조건
            var reqParams = this.handleParams(params)  
            console.log(reqParams)
            axios
            .post(url, reqParams, this.$store.state.headers)
            .then((response) => {
            console.log(response)
            var resCode = response.data.res_code;
                if(resCode == 200){
                    this.firmwareList = response.data.data.list;
                    this.firmwareResPagingInfo = response.data.data.paging_info
                    console.log(this.resPagingInfo)
                }else if(resCode==204){
                    this.firmwareList = [];
                    this.resPagingInfo = {};
                    alert('카메라 펌웨어 데이터가 없습니다.');
                }else if(resCode==410){
                    alert("로그인 세션이 만료되었습니다.");
                    EventBus.$emit('top-path-logout');
                    this.$store
                    .dispatch("LOGOUT")
                    .then( res => { 
                    console.log(res.status)}).catch(({ message }) => (this.msg = message))
                    this.$router.replace('/signin')
                }else{
                    this.firmwareList = [];
                    this.resPagingInfo = {};
                    alert("Error");
                }
            })
            .catch((ex) => {
            console.log('조회 실패',ex)
            })
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
            if(params.product_code !== undefined && params.product_code !== ''){
                newParams.product_code = params.product_code
            }
            return newParams
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
    }
}
</script>

<style>

</style>