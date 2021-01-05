<template>
    <!--Line Chart-->

    <div class="row">
      <div class="col-4">
        <line-chart :chart-data="fillData()" class="chart"></line-chart>
      </div>
      <div class="col-4">
        <line-chart :chart-data="fillData()" class="chart"></line-chart>
      </div>
      <div class="col-4">
        <line-chart :chart-data="fillData()" class="chart"></line-chart>
      </div>
    </div>

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