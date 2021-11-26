<template>
<v-container fluid>
    <div class="row">
        <div class="col">
        <api-inner-table></api-inner-table>
        </div>
    
        <div class="col">
        <service-table></service-table>
        </div>
    </div>


</v-container>

</template>

<script>
import axios from "axios"
import EventBus from '../../../../../EventBus'
import ServiceTable from './serviceTable.vue'
import apiInnerTable from './apiInnerTable.vue'
const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    data() {
      return {
        pHeaders:[
            { text: '국사코드', value: 'site_id' },
            { text: '서버명', value: 'api_no' },
            { text: '프로세스 종류', value: 'access_cnt' },
            { text: '상태', value: 'acess_date' },
        ],
         reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
        },
        psearch: '',
        dialog:false,
        dialogDelete:false,
        editedIndex:-1,
        options:{},
        options2:{},
        totalList: 0,
        loading: true,
        pList: [],
        resPagingInfo:{}
      }
    },
    components: {
      ServiceTable,
      apiInnerTable  
    },
    methods: {
        processList:function(options) {
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/api`
            
            var reqParams=this.setParams(options)
            console.log(reqParams)

            axios
                .post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.pList = response.data.data.access_api_list;
                    this.resPagingInfo=response.data.data.paging_info;
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
                    console.log(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
        },
    
        setParams:function(options){
            var values={
                page_no: options.page,
                view_cnt: options.itemsPerPage
            }
            return values;
        },
        
        getProcessApi() {
            this.loading = true;
            this.processList(this.options)
        },

        
    },

    watch: {
        options: {
            handler() {
                this.getProcessApi();
            },
            deep: true,
            },
     
    },
    mounted() {
    
          
            this.getProcessApi();

            console.log('갱신')
            },  
}
</script>

<style scoped>
.chart-area {
    /* border: 1px solid red; */
    height: 251px;
}

.count-board, .chart-board, .grid-board {
    border: 1px solid #AAAAAA;
}

.board-footer{
    font-size: 9px;
    color: #777777;
    border-top: 1px solid #AAAAAA;
}

.dashboard-icon{
    position: relative; top:-10px; left:10px
}

.count-board-text div{
    text-align: right;
    padding-right: 15px;
}
</style>