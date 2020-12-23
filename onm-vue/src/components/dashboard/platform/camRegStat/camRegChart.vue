<template>
    <!--Line Chart-->
    <table><tr>
      <td><div class="chart-wrapper"><line-chart :chart-data="fillData()" class="chart"></line-chart></div></td>
      <td><div class="chart-wrapper"><line-chart :chart-data="fillData()" class="chart"></line-chart></div></td>
      <td><div class="chart-wrapper"><line-chart :chart-data="fillData()" class="chart"></line-chart></div></td>
    </tr></table>
    <!-- <button @click="fillData()">Randomize</button> -->
</template>

<script>
  import LineChart from '@/components/common/LineChart.vue';

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        // datacollection: null
      }
    },
    mounted () {
      this.fillData()
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
    }
  }
</script>

<style scoped>

.chart-wrapper{
  border:1px solid #888888;
  margin: 10px auto;
  width: 350px;
}

table {
  width: 100%;
}
</style>