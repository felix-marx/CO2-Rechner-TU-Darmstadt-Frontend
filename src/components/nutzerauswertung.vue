<template>
  <v-app>
    <v-card>
      <v-card-title>Chartkick mit highcharts</v-card-title>
      <line-chart :data="chartData" />
      <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]" />
      <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]" />
      <bar-chart :data="[['X-Small', 5], ['Small', 27]]" />
      <area-chart :data="{'2017-01-01 00:00:00 -0800': 2, '2017-01-01 00:01:00 -0800': 5}" />
      <scatter-chart
        :data="[[174.0, 80.0], [176.5, 82.3]]"
        xtitle="Size"
        ytitle="Population"
      />
    </v-card>
    <v-card>
      <v-card-title>Vue-Chartjs</v-card-title>
      <DoughnutChart :chartdata="chartdata2" :options="options" />
    </v-card>
  </v-app>
</template>


<script>
import DoughnutChart from "./charts/DoughnutChart.vue"

export default{
    name: "Nutzerauswertung",

    components: { 
      DoughnutChart 
    },

    data: () => ({
      chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]],
      chartdata2: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    }),
}
</script>