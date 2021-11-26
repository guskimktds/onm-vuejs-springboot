<template>
        <div class="chart-board">
          <div class="text-area">{{ formTitle }}</div>
            <div><br></div>
            <div class="chart-area">
                <!-- <line-chart :chart-data="chartData" :options="labels" :styles="myStyles"
                  :v-on="fillData()"
                ></line-chart> -->
                <pie-chart 
                    :chart-data="datacollection" :options="labels"
                ></pie-chart>
            </div>
           
            <!-- <div class="board-footer">updated 10 minutes ago</div> -->
        </div>
</template>
<script>

import PieChart from '@/components/common/PieChart'

import axios from "axios"
export default {
    components: { PieChart },
    props:['param'],
    data () {
        return {
            datacollection: {},
            title: 'api별 호출 수',
            labels: [], 
            loaded: false           
        }
    },
    mounted(){
      this.fillData()
    },
 
    computed: {
      formTitle () {
        this.fillData()
        return this.title
      },
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
          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13048/get_open_api_access_report`
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
              this.labels = this.getLabels(response.data.data.access_api_rank)
              this.datacollection = {
                labels: this.labels,
                datasets: [
                  {
                    label:'신규', 
                    // backgroundColor: '#f87979',
                    borderColor:'#f87979',
                    data: this.getNewCnt(response.data.data.access_api_rank)
                  },
                  {
                    label:"해지", 
                    // backgroundColor: 'white',
                    borderColor:'white',
                    data: this.getCloseCnt(response.data.data.access_api_rank)
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
        // arr.forEach(function(element){
        //     new_arr.push(element.dt) 
        // })
                                      var arr2 = Object.keys(arr[0])
              console.log("값꺼내기"+JSON.stringify(arr2))
              new_arr = arr2
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
        // arr.forEach(function(element){
        //     new_arr.push(element.new_cnt) 
        // })
                              var arr2 = Object.values(arr[0])
              console.log("값꺼내기"+JSON.stringify(arr2))
              new_arr = arr2
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