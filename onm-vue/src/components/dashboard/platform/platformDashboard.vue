<template>
    <div id="app">
        <div class="row">
            <!-- First Row -->
            <div class="col-4">
                <div class="chart-board">
                    <div class="chart-area">
                        Chart Area
                        <!-- <line-chart :chart-data="fillData()"></line-chart> -->
                    </div>
                    <div class="text-area">고객 개통/해지 추이(일간/월간)</div>
                    <div class="board-footer">updated 10 minutes ago</div>
                </div>
            </div>
            <div class="col-4">
                <div class="chart-board">
                    <div class="chart-area">
                        Chart Area
                        <!-- <line-chart :chart-data="fillData()"></line-chart> -->
                    </div>
                    <div class="text-area">카메라 개통/해지 추이(일간/월간)</div>
                    <div class="board-footer">updated 4 minutes ago</div>
                </div>
            </div>
            <div class="col-4">
                <div class="chart-board">
                    <div class="chart-area">
                        <!-- Chart Area -->
                        <line-chart :chart-data="fillData()"></line-chart>
                    </div>
                    <div class="text-area">IoT 개통/해지 추이(일간/월간)</div>
                    <div class="board-footer">campaign sent 26 minutes ago</div>
                </div>
            </div>
            
            <!-- Second Row -->
            <div class="col-3">
                <div class="count-board">
                    <div class="row">
                        <div class="col-3">
                            <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/squared-colored-round-edges-twitter-logo-icon-web-printing-purpose-squared-colored-round-edges-twitter-logo-icon-176486749.jpg"/>
                        </div>
                        <div class="col-9">
                            <div>고객 변화(전일대비)</div>
                            <div>+245</div>
                        </div>
                    </div>
                    <div class="board-footer">Just Updated</div>
                </div>
            </div>

            <div class="col-3">
                <div class="count-board">
                    <div class="row">
                        <div class="col-3">
                            <img class="dashboard-icon" width="50px" height="50px" src="https://thumbs.dreamstime.com/b/financial-analysis-chart-icon-white-isolated-green-background-vector-illustration-financial-analysis-chart-icon-green-109781393.jpg"/>
                        </div>
                        <div class="col-9">
                            <div>전체 고객 수</div>
                            <div>+75.521</div>
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
                        <div class="col-9">
                            <div>카메라 변화(전일대비)</div>
                            <div>$34,245</div>
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
                        <div class="col-9">
                            <div>전체 카메라 수</div>
                            <div>184</div>
                        </div>
                    </div>
                    <div class="board-footer">Get More Space...</div>
                </div>
            </div>

            <!-- Third Row -->
            <div class="col-6">
                <div class="grid-board">
                    <div>프로세스 상태 현황</div>
                    <v-data-table
                        :headers="pHeaders"
                        :items="pList"
                        :items-per-page="5"
                        item-key="id"
                        class="elevation-1"
                        :style="`background-color: #d6f5e5`"
                    ></v-data-table>
                </div>
            </div>

            <div class="col-6">
                <div class="grid-board">
                    <div>카메라 상태 현황</div>
                    <v-data-table
                        :headers="pHeaders"
                        :items="cList"
                        :items-per-page="5"
                        item-key="id"
                        class="elevation-1"
                        :style="`background-color: #d6f5e5`"
                    ></v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LineChart from '@/components/common/LineChart.vue';

export default {

    components: {
        LineChart
    },

    data() {
      return {
        pHeaders: [
          { text: 'ID', value: 'id'},
          { text: 'Name', value: 'name' },
          { text: 'Salary', value: 'salary' },
          { text: 'Country', value: 'country' },
          { text: 'City', value: 'city' }
        ],
        cHeaders: [
          { text: 'ID', value: 'id'},
          { text: 'Name', value: 'name' },
          { text: 'Salary', value: 'salary' },
          { text: 'Country', value: 'country' },
          { text: 'City', value: 'city' }
        ],

        // Grid Data Sample
        pList:[
            {id:'1', name:'Dakota rice', salary:'$35.738', country:'Niger', city:'Oud-Tunrhout'},
            {id:'2', name:'Minerva Hooper', salary:'$23.738', country:'Curacao', city:'Sinaaal-Waas'},
            {id:'3', name:'Sage Rodriguez', salary:'$56.142', country:'Netherlands', city:'Overland Park'},
        ],
        cList:[
            {id:'1', name:'Dakota rice', salary:'$35.738', country:'Niger', city:'Oud-Tunrhout'},
            {id:'2', name:'Minerva Hooper', salary:'$23.738', country:'Curacao', city:'Sinaaal-Waas'},
            {id:'3', name:'Sage Rodriguez', salary:'$56.142', country:'Netherlands', city:'Overland Park'},
        ]

      }
    },

    methods: {
        fillData () {
        var datacollection = {
          
          datasets: [
            {
              label: '범례',
              backgroundColor: '#47df8b',
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

}
</script>

<style scoped>
/* 
div {
    border: 1px solid black;
} 
*/

.chart-area {
    /* border: 1px solid red; */
    height: 300px;
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
</style>