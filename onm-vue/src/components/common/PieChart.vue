<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
   this.renderChart(this.chartData,
    //  {
    //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    //   datasets: [
    //     {
    //       backgroundColor: [
    //         '#41B883',
    //         '#E46651',
    //         '#00D8FF',
    //         '#DD1B16'
    //       ],
    //       data: [40, 20, 80, 10]
    //     }
    //   ]
    // }, 

    {

       

      responsive: true, 
      maintainAspectRatio: false,
      legend: {
					display: true,
					position: 'right',
          align: 'right'
			},
    })
  }
}
</script>