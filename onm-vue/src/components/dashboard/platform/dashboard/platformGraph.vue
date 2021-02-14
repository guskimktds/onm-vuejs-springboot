<template>
    <v-container fluid>        
        <div class="row">
                <div class="col-4">
                        <!-- <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">고객 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">updated 10 minutes ago</div>
                        </div> -->
                        <user-transition v-bind:param=param></user-transition>
                </div>

                 <div class="col-4">
                        <!-- <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData2()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">카메라 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">updated 4 minutes ago</div>
                        </div> -->
                        <cam-transition v-bind:param=param></cam-transition>
                 </div>

                    <div class="col-4">
                        <!-- <div class="chart-board">
                            <div class="chart-area">
                                <line-chart :chart-data="fillData3()" :options="chartOptions" :styles="myStyles"></line-chart>
                            </div>
                            <div class="text-area">IoT 개통/해지 추이(일간/월간)</div>
                            <div class="board-footer">campaign sent 26 minutes ago</div>
                        </div> -->
                        <iot-transition v-bind:param=param></iot-transition>
                    </div>
        </div>
    </v-container>    
</template>

<script>
import UserTransition from './graph/userTransition'
import CamTransition from './graph/camTransition'
import IotTransition from './graph/iotTransition'

// import LineChart from '@/components/common/LineChart.vue';

// import axios from "axios"

// const headers={
//   'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//   'Content-Type': 'application/json'
// }

export default {
  props: ['param'],
  components:{
      // LineChart,
      UserTransition,
      CamTransition,
      IotTransition
  },
  // data() {
  //     return {
  //       date:false,
  //       menu:false,
  //       param: {
  //         stat_period:'',

  //       }
  //     }
  // },
  // computed: {
  //   dateRangeText() {
  //     if (this.param.stat_period.length == 0) {
  //       return "";
  //     } else return this.param.stat_period.join(" ~ ");
  //   },
  // },
  // methods: {
  //   searchMethod: function (date) {
  //     // this.$emit("search", this.param);
  //     this.$refs.menu.save(date)
  //     console.log("검색 시작 : ",date)
  //   },
  // },

    // data(){
    //     return{
    //         List1:[],
    //         List2:[],
    //         List3:[],
    //         openCnt1:[],
    //         closeCnt1:[],
    //      chartOptions : {
    //         maintainAspectRatio:false
    //     },

    //     height: 250
    //     }
    // },

    //   methods: {
    
    //     graph1: function(){
    //         var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11010/get_user_transition`

    //         var params={
    //             start_date: "19000101",
    //             end_date: "20210101",
    //             search_type : "D"
    //             }
            
    //         axios
    //             .post(url,params,headers)
    //             .then((response)=>{
    //                 console.log('전달된 그래프 데이터1')
    //                 console.log(response.data)
    //                 var resCode = response.data.res_code;
    //                 var resMsg = response.data.res_msg;
    //                 if(resCode == 200){
    //                 this.List1 = response.data.data.date_list;
    //                 }else{
    //                 this.List1 = [];
    //                 alert(resCode + " / " + resMsg);
    //                 }
    //             })
    //             .catch((ex)=>{
    //                 console.log('조회 실패',ex)
    //             })
    //     },

    //     graph2:function(){
    //         var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11011/get_cam_transition`

    //         var params={
    //             start_date: "19000101",
    //             end_date: "20210101",
    //             search_type : "D"}
            
    //         axios
    //             .post(url,params,headers)
    //             .then((response)=>{
    //                 console.log('전달된 그래프 데이터2')
    //                 console.log(response.data)
    //                 var resCode = response.data.res_code;
    //                 var resMsg = response.data.res_msg;
    //                 if(resCode == 200){
    //                 this.List2 = response.data.data.date_list;
    //                 }else{
    //                 this.List2 = [];
    //                 alert(resCode + " / " + resMsg);
    //                 }
    //             })
    //             .catch((ex)=>{
    //                 console.log('조회 실패',ex)
    //             })
    //     },

    //     graph3:function(){
    //         var url=`${process.env.VUE_APP_BACKEND_SERVER_URL_TB}/V110/ONM_11012/get_iot_transition`

    //         var params={
    //             start_date: "19000101",
    //             end_date: "20210101",
    //             search_type : "D"}
            
    //         axios
    //             .post(url,params,headers)
    //             .then((response)=>{
    //                 console.log('전달된 그래프 데이터3')
    //                 console.log(response.data)
    //                 var resCode = response.data.res_code;
    //                 var resMsg = response.data.res_msg;
    //                 if(resCode == 200){
    //                 this.List3 = response.data.data.date_list;
    //                 }else{
    //                 this.List3 = [];
    //                 alert(resCode + " / " + resMsg);
    //                 }
    //             })
    //             .catch((ex)=>{
    //                 console.log('조회 실패',ex)
    //             })
    //     },

    //     getDataFromApi() {
    //     this.loading = true;
    //     this.graph1()
    //     this.graph2()
    //     this.graph3()
    //     },

    //     fillData () {
    //     var datacollection = {
          
    //       datasets: [
    //         {
    //           label: '고객 개통',
    //           borderColor:'#47df8b',
    //           data: [
    //             this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,
    //             this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,this.List1[0].new_cnt,
    //           ]
    //         },
    //         {
    //           label: '고객 해지',
    //           borderColor:'white',
    //           data:[
    //               this.List1[0].close_cnt,this.List1[10].close_cnt,this.List1[20].close_cnt,this.List1[30].close_cnt,this.List1[40].close_cnt,
    //               this.List1[50].close_cnt,this.List1[60].close_cnt,this.List1[70].close_cnt,this.List1[80].close_cnt,this.List1[90].close_cnt
    //           ]
    //         }
    //       ]
    //     }
    //   return datacollection;
    //   },

    // fillData2 () {
    //     var datacollection = {
          
    //       datasets: [
    //         {
    //           label: '카메라 개통',
    //           borderColor:'#47df8b',
    //           data: [  
    //             this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,
    //             this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,  this.List2[0].open_cnt,
    //           ]
    //         },
    //         {
    //           label: '카메라 해지',
    //           borderColor:'white',
    //           data:[
    //             this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,
    //             this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,this.List2[0].close_cnt,
    //           ]
    //         }
    //       ]
    //     }
    //   return datacollection;
    //   },

    // fillData3 () {
    //     var datacollection = {
          
    //       datasets: [
    //         {
    //           label: 'iot gw 개통',
    //           borderColor:'#47df8b',
    //           data: [
    //               this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,
    //               this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,this.List3[0].open_cnt,
    //           ]
    //         },
    //         {
    //           label: 'iot gw 해지',
    //           borderColor:'white',
    //           data:[
    //             this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,
    //             this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,this.List3[0].close_cnt,
    //           ]
    //         }
    //       ]
    //     }
    //   return datacollection;
    //   },
      
    // },
    
    // watch: {
    //     options: {
    //     handler() {
    //      this.getDataFromApi();
    //     },
    //     deep: true,
    //     },
    // },
    // mounted() {
    //     this.getDataFromApi();
    // },
    // computed: {
    //     myStyles () {
    //         return {
    //             height: `${this.height}px`,
    //         }
    //     }
    // }
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