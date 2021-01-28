<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
          color="orange"
          dark
          icon="mdi-keyboard"
          title="개통/해지 추이(대시보드)"
          class="px-5 py-3"
        >

          <v-row>
            <v-col cols='4'>
              <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
            </v-col>
            <v-col cols='4'>
              <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
            </v-col>
            <v-col cols='4'>
              <line-chart :chart-data="fillData()" :options="chartOptions" :styles="myStyles"></line-chart>
            </v-col>
          </v-row>

        </base-material-card>
    </v-container>
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
    },
    computed: {
        myStyles () {
            return {
                height: `250px`,
            }
        }
    }
  }
</script>