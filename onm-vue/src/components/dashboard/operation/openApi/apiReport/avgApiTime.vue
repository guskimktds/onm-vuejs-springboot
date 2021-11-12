<template>
        <div class="chart-board">
          <div class="text-area">{{ this.title }}</div>
            <div><br></div>
            <div class="chart-area">
                <!-- <line-chart :chart-data="chartData" :options="labels" :styles="myStyles"
                ></line-chart> -->
                <line-chart 
                    :v-on="fillData()"
                    :chart-data="datacollection" :options="labels"
                ></line-chart>
            </div>
           
            <!-- <div class="board-footer">updated 10 minutes ago</div> -->
        </div>
</template>
<script>

import LineChart from '@/components/common/LineChart'

import axios from "axios"
export default {
    components: { LineChart },
    props:['param'],
    data () {
        return {
            datacollection: null,
            title: '시간대별 평균 호출 수',
            labels: [], 
            loaded: false           
        }
    },
 
    computed: {
      myStyles () {
            return {
                height: `${this.height}px`,
            }
        }
    },
    // watch: {
    //   param : function () {
    //       console.log("parma 이 변경되었습니다. ", this.param)
    //     }
    // },
    methods: {
        fillData: function() {
          this.loaded = false
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_11010/get_user_transition`
          // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
          // var params = this.param
          // console.log(this.param)
          // this.param.search_type === "M" 이면 날짜를 YYYYMM (6자리로 변경해야함)
          var newParam = this.handleParam()
          
          console.log('변경된 파라미터')
          console.log(newParam)
          axios.post(url, newParam, this.$store.state.headers)
          .then((response) => {
            // console.log(response.data)
            var resCode = response.data.res_code;
            var resMsg = response.data.res_msg;
            if(resCode == 200){
              this.labels = this.getLabels(response.data.data.date_list)
              this.datacollection = {
                labels: this.labels,
                datasets: [
                  {
                    label:'신규', 
                    // backgroundColor: '#f87979',
                    borderColor:'#f87979',
                    data: this.getNewCnt(response.data.data.date_list)
                  },
                  {
                    label:"해지", 
                    // backgroundColor: 'white',
                    borderColor:'white',
                    data: this.getCloseCnt(response.data.data.date_list)
                  }
                ]
              }
              // console.log(this.datacollection)
              this.loaded = true

            }else if(resCode==204){
              alert(resMsg+'고객 개통/해지 추이 데이터가 없습니다.')
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
        arr.forEach(function(element){
            new_arr.push(element.dt) 
        })
        return new_arr
      },

      getCloseCnt: function(arr){
         var new_arr = []
        arr.forEach(function(element){
            new_arr.push(element.close_cnt) 
        })
        return new_arr
      },

      getNewCnt: function(arr){
         var new_arr = []
        arr.forEach(function(element){
            new_arr.push(element.new_cnt) 
        })
        return new_arr
      },

      handleParam: function() {
        var result = {
          search_type : "D",
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