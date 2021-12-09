<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
          scales: {
            yAxes: [{
              ticks: {
                fontColor: "black",
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
    })

  }
}
</script>