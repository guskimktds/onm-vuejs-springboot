<template>
    <v-container fluid>

        <div class="row">
                <div class="col-4">
                        <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">고객 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">updated 10 minutes ago</div>
                        </div>
                </div>

                 <div class="col-4">
                        <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">카메라 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">updated 4 minutes ago</div>
                        </div>
                 </div>

                    <div class="col-4">
                        <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">IoT 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">campaign sent 26 minutes ago</div>
                        </div>
                    </div>
        </div>
    </v-container>    
</template>

<script>
import LineChart from '@/components/common/LineChart.vue';

import axios from "axios"

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    components:{
        LineChart
    },

    data(){
        return{
            List1:[],
            List2:[],
            List3:[],
         chartOptions : {
            maintainAspectRatio:false
        },

        height: 250
        }
    },

      methods: {
    
        graph1: function(){
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11010/get_user_transition`

            var params={
                start_date: "20210101",
                end_date: "20210101",
                search_type : "D"}
            
            axios
                .post(url,params,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.List1 = response.data.data.date_list;
                    }else{
                    this.List1 = [];
                    alert(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
        },

        graph2:function(){
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11011/get_cam_transition`

            var params={
                start_date: "20210101",
                end_date: "20210101",
                search_type : "D"}
            
            axios
                .post(url,params,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.List2 = response.data.data.date_list;
                    }else{
                    this.List2 = [];
                    alert(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
        },

        graph3:function(){
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11012/get_iot_transition`

            var params={
                start_date: "20210101",
                end_date: "20210101",
                search_type : "D"}
            
            axios
                .post(url,params,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.List3 = response.data.data.date_list;
                    }else{
                    this.List3 = [];
                    alert(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
        },

        getDataFromApi() {
        this.loading = true;
        // this.graph1()
        },

        fillData () {
        var datacollection = {
          
          datasets: [
            {
              label: '범례',
              borderColor:'#47df8b',
              data: [
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
                this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), 
              ]
            }
          ]
        }
      return datacollection;
      },

      getRandomInt () {
        return Math.floor(Math.random() * 100000)
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
    computed: {
        myStyles () {
            return {
                height: `${this.height}px`,
            }
        }
    }
}
</script>

<style scoped>
.chart-area {
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

</style>