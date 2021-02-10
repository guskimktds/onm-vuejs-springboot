<template>
<v-container fluid>
       <div class="row">
                    <div class="col-3" >
                        <div class="count-board">
                            <div class="row">
                                <div class="col-3">
                                    <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/squared-colored-round-edges-twitter-logo-icon-web-printing-purpose-squared-colored-round-edges-twitter-logo-icon-176486749.jpg"/>
                                </div>
                                <div class="col-9 count-board-text">
                                    <div>고객 변화(전일대비)</div>
                                    <div>{{Data.change_user_cnt}} 명</div>
                                </div>
                            </div>
                            <div class="board-footer">Just Updated</div>
                        </div>
                    </div>

                    <div class="col-3" >
                        <div class="count-board">
                            <div class="row">
                                <div class="col-3">
                                    <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/financial-analysis-chart-icon-white-isolated-green-background-vector-illustration-financial-analysis-chart-icon-green-109781393.jpg"/>
                                </div>
                                <div class="col-9 count-board-text">
                                    <div>전체 고객 수</div>
                                    <div>{{Data.total_user_cnt}} 명</div>
                                </div>
                            </div>
                            <div class="board-footer">Tracked from Google Analytics</div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="count-board">
                            <div class="row">
                                <div class="col-3">
                                    <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/white-surveillance-camera-white-surveillance-camera-orange-square-106767884.jpg"/>
                                </div>
                                <div class="col-9 count-board-text">
                                    <div>카메라 변화(전일대비)</div>
                                    <div>{{Data.change_cam_cnt}} 개</div>
                                </div>
                            </div>
                            <div class="board-footer">Last 24 Hours</div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="count-board">
                            <div class="row">
                                <div class="col-3">
                                    <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/cctv-camera-icon-white-isolated-green-background-vector-illustration-102899492.jpg"/>
                                </div>
                                <div class="col-9 count-board-text">
                                    <div>전체 카메라 수</div>
                                    <div>{{Data.total_cam_cnt}} 개</div>
                                </div>
                            </div>
                            <div class="board-footer">Get More Space...</div>
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
export default{
    data(){
        return{
            Data:[]
        }
    },
    methods: {
            showResult:function(){
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11013/get_user_cam_cnt`
            
            axios
                .post(url,headers)
                .then((response)=>{
                    console.log('전달된 결과값')
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.Data = response.data.data;
                    }else{
                    this.Data = [];
                    alert(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
            },
        getDataFromApi() {
        this.loading = true;
        this.showResult()
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
        this.getDataFromApi();
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