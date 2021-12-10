<template>
        <div class="chart-board">
          <div class="text-area" style="font-size:20px; font-weight:bold; text-align:center;">{{ formTitle }}</div>
            <div><br></div>
            <div class="chart-area">
                <!-- <line-chart :chart-data="chartData" :options="labels" :styles="myStyles"
                    :v-on="fillData()"
                ></line-chart> -->
                <line-chart 
                v-if="loaded"
                    :chart-data="datacollection" :options="options" 
                ></line-chart>
            </div>
           
            <!-- <div class="board-footer">updated 10 minutes ago</div> -->
        </div>
</template>
<script>
import LineChart from '@/components/common/OpenApiLineChart'
import axios from "axios"
import EventBus from '../../../../../../EventBus'

export default {
    components: { LineChart },
    props:['param'],
    data () {
        return {
            datacollection: {},
            title: '시간대별 평균 호출 수',
            labels: [], 
            loaded: false,
            options: {},    
        }
    },
    mounted(){
      this.fillData()
    },

    created() {
      EventBus.$on('search-all-graph', function(param){  
      console.log("받은거" + JSON.stringify(param));       
      // this.fillData(param)
    });

    },
 
    computed: {
      formTitle () {
        console.log("다시 로드")
        this.fillData()
        return this.title
      },
      myStyles () {
            return {
                height: `${this.height}px`,
            }
        }
    },
    watch: {
      // param : function () {
      //   console.log("parma 이 변경되었습니다. ", this.param)
      // }
      
    },
    methods: {
        fillData: function() {
          this.loaded = false
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13048/get_open_api_access_report`
          // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
          // var params = this.param
          // console.log(this.param)
          // this.param.search_type === "M" 이면 날짜를 YYYYMM (6자리로 변경해야함)
          var newParam = this.handleParam()
          
          console.log('변경된 파라미터')
          console.log('avgApiTime',newParam)
          axios.post(url, newParam, this.$store.state.headers)
          .then((response) => {
            // console.log(response.data)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){

              console.log('avgApiTime response' + JSON.stringify(response.data.data.access_hourly));
              
              var resData = response.data.data.access_hourly.[0]
              var resArr = Object.values(resData);
              //var sortesArr = arr.sort(resArr)
              var arrMax = Math.max(...resArr);

              this.labels = this.getLabels(response.data.data.access_hourly)
              this.datacollection = {
                labels: this.labels,
                datasets: [{
                    label:'시간대별 평균 호출 수', 
                    // backgroundColor: '#f87979',
                    borderColor:'#f87979',
                    data: resArr
                  }]
              }
              this.options = {
                scales: {
                  yAxes: [{
                    ticks: {
                      fontColor: "black",
                      suggestedMax: arrMax,
                      min:0,
                      // stepSize: 15,
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      fontColor: "black"
                    }
                  }]
                },
                responsive: true,
                maintainAspectRatio: false,
                legend:{
                  labels:{
                    fontColor: 'black'
                  }
                },
              },
              // console.log(this.datacollection)
              this.loaded = true

            }else if(resCode==204){
              alert(resMsg+'시간댑별 호출수가 없습니다')
            }else{
              this.datacollection = null;
              //alert(resCode + " / " + resMsg);
            }
          })
          .catch((ex) => {
            console.log('조회 실패',ex)
          })
      },

      getLabels: function(arr){
        var new_arr = []
        let result_map = Object.keys(arr[0]).map(function(key){
          return [String(key)+'시']
        })
        for(let i=0; i < result_map.length; i++){
            new_arr.push(result_map[i]) 
        }
        console.log('avgApiTime keys',new_arr)
        return new_arr
      },
      getMaxValue: function(arr){
        var maxValue
        maxValue = Object.values(arr)
        maxValue = Math.max(maxValue)
        console.log(maxValue+"최대값구하기")
        maxValue = maxValue + (maxValue * 1.1)
        return maxValue
        
      },

      getNewCnt: function(arr){
        var new_arr = []
        let result_map = Object.values(arr[0]).map(function(key){
          return [String(key)]
        })
        for(let i=0; i < result_map.length; i++){
            new_arr.push(result_map[i]) 
          }
        console.log('avgApiTime value',new_arr)
        return new_arr
      },

      handleParam: function() {
        var result = {
          view_cnt: 5,
          start_date : this.param.start_date.replace(/-/g,""),
          end_date : this.param.end_date.replace(/-/g,"")
        }
        return result
      }

    }
}
</script>
<style scoped>
  
</style>