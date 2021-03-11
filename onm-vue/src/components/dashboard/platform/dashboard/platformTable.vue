<template>
<v-container fluid>
    <div class="row">
        <div class="col-6">
                <div class="grid-board">
                    <div>프로세스 상태 현황</div>
                        <v-data-table
                        :headers="pHeaders"
                        :items="pList"
                        :options.sync="options"
                        :server-items-length="resPagingInfo.total_cnt"
                        class="elevation-1"
                        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                        >
                        </v-data-table>
                    </div>
        </div>
        
                <div class="col-6">
                    <div class="grid-board">
                        <div>카메라 상태 현황</div>
                            <v-data-table
                            :headers="cHeaders"
                            :items="cList"
                            :options.sync="options2"
                            :items-per-page="10"
                            class="elevation-1"
                            :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                            ></v-data-table>
                    </div>
                </div>
    </div>


</v-container>

</template>

<script>
import axios from "axios"

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    data() {
      return {
        pHeaders:[
            { text: '국사코드', value: 'local_gw_id' },
            { text: '서버명', value: 'hostname' },
            { text: '프로세스 종류', value: 'proc_type' },
            { text: '프로세스 명', value: 'proc_status' },
            { text: '마지막 보고 일시', value: 'last_upd_date' },
        ],
        cHeaders: [
            { text: '국사코드', value: 'local_gw_id' },
            { text: '전체 카메라 대수', value: 'total_cnt' },
            { text: '정상 카메라 대수', value: 'normal_cnt' },
            { text: '개통 대기 카메라 대수', value: 'waiting_cnt' },
            { text: '개통 진행 카메라 대수', value: 'proc_cnt' },
            { text: '개통 실패 카메라 대수', value: 'disconn_cnt' },
            { text: '네트워크 장애 카메라 대수', value: 'fail_cnt' },
            { text: '일시 정지 카메라 대수', value: 'pause_cnt' },
        ],
        dialog:false,
        dialogDelete:false,
        editedIndex:-1,
        options:{},
        options2:{},
        totalList: 0,
        loading: true,
        pList: [],
        cList: [],
        resPagingInfo:{}
      }
    },
    methods: {
        processList:function(options) {
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11001/get_process_status`
            
            var reqParams=this.setParams(options)
            console.log(reqParams)

            axios
                .post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.pList = response.data.data.process_list;
                    this.resPagingInfo=response.data.data.paging_info;
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
        cameraList:function(options) {
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11002/get_cam_status`
            
            var reqParams=this.setParams(options)
            axios
                .post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.cList = response.data.data.list;
                    }else{
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
        
        getDataFromApi() {
        this.loading = true;
        this.processList(this.options)
        this.cameraList(this.options2)
        },
        
    },

    watch: {
        options: {
        handler() {
         this.getDataFromApi();
        },
        deep: true,
        },
    },
    mounted() {
        var count=0
        setInterval(() => {
            count=count+1
            if(count%2==0){
            this.getDataFromApi();
            }
            else{
                this.pList=[];
                this.cList=[];
            }
          }, 6000);
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