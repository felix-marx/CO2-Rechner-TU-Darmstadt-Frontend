<template>
  <v-app>
    <v-card>
      <v-card-title>Chartkick mit chartjs</v-card-title>
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
      <DoughnutChart :chartdata="chartdataDoughnut" :options="optionsDoughnut" />
      <PieChart :chartdata="chartdataPie" :options="optionsPie" />
      <LineChart :chartdata="chartdataLine" :options="optionsLine" />
      <BarChart :chartdata="chartdataBar" :options="optionsBar" />
      <HorizontalBarChart :chartdata="chartdataHorizontalBar" :options="optionsHorizontalBar" />
      <RadarChart :chartdata="chartdataRadar" :options="optionsRadar" />
      <PolarAreaChart :chartdata="chartdataPolarArea" :options="optionsPolarArea" />
      <BubbleChart :chartdata="chartdataBubble" :options="optionsBubble" />
      <ScatterChart :chartdata="chartdataScatter" :options="optionsScatter" />
    </v-card>
  </v-app>
</template>


<script>
import DoughnutChart from "./charts/DoughnutChart.vue"
import LineChart from "./charts/LineChart.vue"
import BarChart from "./charts/BarChart.vue"
import HorizontalBarChart from "./charts/HorizontalBarChart.vue"
import RadarChart from "./charts/RadarChart.vue"
import PieChart from "./charts/PieChart.vue"
import PolarAreaChart from "./charts/PolarAreaChart.vue"
import BubbleChart from "./charts/BubbleChart.vue"
import ScatterChart from "./charts/ScatterChart.vue"

export default{
  name: "Nutzerauswertung",

  components: {
    DoughnutChart,
    LineChart,
    BarChart,
    HorizontalBarChart,
    RadarChart,
    PieChart,
    PolarAreaChart,
    BubbleChart,
    ScatterChart
  },

  data: () => ({
    chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]],

    chartdataDoughnut: {
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
    optionsDoughnut: {
      responsive: true,
      maintainAspectRatio: false
    },

    chartdataPie: {
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
    optionsPie: {
      responsive: true,
      maintainAspectRatio: false
    },

    chartdataLine:{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    optionsLine: {
      responsive: true,
      maintainAspectRatio: false
    },

    chartdataBar:{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    optionsBar: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        y:{
          beginAtZero: true
        }
      }
    },

    datachartHorizontalBar:{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        axis: 'y',
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    optionsHorizontalBar: {
      responsive: true,
      //maintainAspectRatio: false,
      scales:{
        indexAxis: "y"
      }
    },

    chartdataRadar: {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    },
    optionsRadar: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },

    chartdataPolarArea: {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    },
    optionsPolarArea: {
      responsive: true,
      maintainAspectRatio: false,
    },

    chartdataBubble: {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 10
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    },
    optionsBubble: {
      responsive: true,
      maintainAspectRatio: false,
    },

    chartdataScatter: {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    },
    optionsScatter: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    },

    

  })
}
</script>