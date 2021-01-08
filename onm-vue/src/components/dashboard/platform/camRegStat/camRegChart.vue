<template>
    <!--Line Chart-->

    <v-row>
      <v-col cols='4'>
        <line-chart :chart-data="fillData()" :options="chartOptions" height="250px"></line-chart>
      </v-col>
      <v-col cols='4'>
        <line-chart :chart-data="fillData()" :options="chartOptions" height="250px"></line-chart>
      </v-col>
      <v-col cols='4'>
        <line-chart :chart-data="fillData()" :options="chartOptions" height="250px"></line-chart>
      </v-col>
    </v-row>

</template>

<script>
  import LineChart from '@/components/common/LineChart.vue';

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        // Chart Option
         chartOptions : {
            maintainAspectRatio:false
        },
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