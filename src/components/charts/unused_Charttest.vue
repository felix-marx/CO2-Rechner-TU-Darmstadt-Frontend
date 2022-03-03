<template>
  <v-app>
    <v-main style="height: 100%">
      <v-container>
        <v-card
          v-if="true"
          class="pa-7"
          elevation="2"
          outlined
        >
          <v-card-title>Vue-Chartjs</v-card-title>

          <v-container>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Doughnut chart</v-card-title>
                  <DoughnutChart
                    :chart-data="chartdataDoughnut"
                    :options="optionsDoughnut"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Pie chart</v-card-title>
                  <PieChart
                    :chart-data="chartdataPie"
                    :options="optionsPie"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Line chart</v-card-title>
                  <LineChart
                    :chart-data="chartdataLine"
                    :options="optionsLine"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Line Area chart</v-card-title>
                  <LineChart
                    :chart-data="chartdataLineArea"
                    :options="optionsLineArea"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Bar chart</v-card-title>
                  <BarChart
                    :chart-data="chartdataBar"
                    :options="optionsBar"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Horizontal bar chart</v-card-title>
                  <HorizontalBarChart
                    :chart-data="chartdataHorizontalBar"
                    :options="optionsHorizontalBar"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Radar chart</v-card-title>
                  <RadarChart
                    :chart-data="chartdataRadar"
                    :options="optionsRadar"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Polar Area chart</v-card-title>
                  <PolarAreaChart
                    :chart-data="chartdataPolarArea"
                    :options="optionsPolarArea"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Scatter chart</v-card-title>
                  <ScatterChart
                    :chart-data="chartdataScatter"
                    :options="optionsScatter"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Scatter chart with line</v-card-title>
                  <ScatterChart
                    :chart-data="chartdataScatterLine"
                    :options="optionsScatterLine"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>Bubble chart</v-card-title>
                  <BubbleChart
                    :chart-data="chartdataBubble"
                    :options="optionsBubble"
                  />
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>Mixed chart</v-card-title>
                  <BarChart
                    :chart-data="chartdataMixed"
                    :options="optionsMixed"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import DoughnutChart from "./DoughnutChart.js"
import LineChart from "./LineChart.js"
import BarChart from "./BarChart.js"
import HorizontalBarChart from "./HorizontalBarChart.js"
import RadarChart from "./RadarChart.js"
import PieChart from "./PieChart.js"
import PolarAreaChart from "./PolarAreaChart.js"
import BubbleChart from "./BubbleChart.js"
import ScatterChart from "./ScatterChart.js"

export default{
  name: "Charttest",

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
        lineTension: 0.1
      }]
    },
    optionsLine: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    },

    chartdataLineArea:{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        lineTension: 0.4
      },
      {
        label: 'Second Dataset',
        data: [40, 20, 25, 25, 70, 70, 80],
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        lineTension: 0
      }]
    },
    optionsLineArea: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
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
        borderWidth: 1,
        barPercentage: 0.5
      }]
    },
    optionsBar: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    },

    chartdataHorizontalBar:{
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
        borderWidth: 1,
        barPercentage: 0.5
      }]
    },
    optionsHorizontalBar: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        xAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
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
      }, 
      {
        label: 'Second Dataset',
        data: [{
          x: 0,
          y: 40,
          r: 10
        }, {
          x: 15,
          y: 15,
          r: 5
        }],
        backgroundColor: 'rgb(75, 192, 192)'
      }]
    },
    optionsBubble: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
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
        backgroundColor: 'rgb(255, 99, 132)',
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

    chartdataScatterLine: {
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
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(75, 192, 192)',
        showLine: true,
        fill: false,
      }],
    },
    optionsScatterLine: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    },

    chartdataMixed: {
      labels: [
        'January',
        'February',
        'March',
        'April'
      ],
      datasets: [{
        type: 'bar',
        label: 'Bar Dataset',
        data: [10, 20, 30, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      }, {
        type: 'line',
        label: 'Line Dataset',
        data: [10, 30, 60, 100],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
    },
    optionsMixed: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      },
      width: 200, 
    }
  })
}
</script>