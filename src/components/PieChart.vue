<script>
import { Pie } from 'vue-chartjs'

// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Pie },
  data() {
    return {
      chartData: {
        //   labels: [ 'January', 'February', 'March' ],
        //   datasets: [ { data: [40, 20, 12] } ]
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
}
</script>

<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    :width="100"
    :height="100"
  />
</template>
