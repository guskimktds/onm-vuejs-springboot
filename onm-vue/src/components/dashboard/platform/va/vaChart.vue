<template>
    <!--Line Chart-->
    <table><tr>
      <td><line-chart :chart-data="fillData()" class="third-width"></line-chart></td>
      <td><line-chart :chart-data="fillData()" class="third-width"></line-chart></td>
      <td><line-chart :chart-data="fillData()" class="third-width"></line-chart></td>
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
              label: 'Data One',
              backgroundColor: '#47df8b',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      return datacollection;
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style scoped>

.third-width {
margin:10px auto;
border:1px solid black;
}

table {
  width: 100%;
}

</style>