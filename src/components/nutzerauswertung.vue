<template>
  <v-container>
    <v-card
      v-if="responsesuccessful"
      elevation="2"
      outlined
    >
      <v-card-title>Auswertung der Umfrage {{ responsedata.id }}</v-card-title>
      <v-container>
        <v-row>
          <p>Bilanzierungsjahr: {{ responsedata.jahr }}</p>
        </v-row>
        <v-row>
          <p>Mitarbeiteranzahl: {{ responsedata.mitarbeiteranzahl }}</p>
        </v-row>
        <v-row>
          <p>Anzahl an Mitarbeiterumfrgaen: {{ responsedata.umfragenanzahl }}</p>
        </v-row>
        <v-row>
          <p>Gesamtemissionen: {{ emissionenGesamt }} g CO<sub>2</sub> eq.</p>
        </v-row>
        <v-row>
          <doughnut-chart
            :chart-data="chartdataGesamt"
            :options="optionsGesamt"
          />
          <bar-chart
            :chart-data="chartdataGesamtBar"
            :options="optionsGesamtBar"
          />
        </v-row>
        <v-row>
          <doughnut-chart
            :chart-data="chartdataEnergie"
            :options="optionsEnergie"
          />
          <bar-chart
            :chart-data="chartdataEnergie"
            :options="optionsEnergieBar"
          />
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="!responsesuccessful"
      elevation="2"
      outlined
    >
      <v-card-title>Error {{ responseerror.code }}: {{ responseerror.message }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import DoughnutChart from "./charts/DoughnutChart.js";
import BarChart from "./charts/BarChart.js";

export default{
  name: "Auswertung" , 

  components: {
    DoughnutChart,
    BarChart,
  },

  props: {
    umfrageid: {
      default: "",
      type: String,
    }  
  },

  data() {
    return {
      responsesuccessful: null,
      responsedata: {
        id: null,
        jahr: null,
        mitarbeiteranzahl: null,
        umfragenanzahl: null
      },
      responseerror: {
        code: null,
        message: null,
      },

      chartdataEnergie: null,
      optionsEnergie: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Emissionen durch Energieverbrauch'
        }
      },
      optionsEnergieBar:{
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        title: {
          display: true,
          text: 'Emissionen durch Energieverbrauch'
        }
      },

      chartdataGesamt: null,
      optionsGesamt: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Übersicht aller Emissionen'
        }
      },
      chartdataGesamtBar: null,
      optionsGesamtBar:{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
         },
        scales:{
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'g C02 eq.'
            }
          },{
            id: 'line',
            position: 'right',
            ticks: {
              max: 1,
              min: 0,
            }
          }]
        },
        // scales:{
        //   yAxes: [{
        //       ticks: {
        //           beginAtZero: true
        //       }
        //   }]
        // },
        title: {
          display: true,
          text: 'Übersicht aller Emissionen'
        }
      }
    }
  },

  computed: {
    emissionenGesamt: function(){
      return this.responsedata.emissionenDienstreisen + this.responsedata.emissionenPendelwege + this.responsedata.emissionenITGerate + this.responsedata.emissionenKaelte + this.responsedata.emissionenStrom + this.responsedata.emissionenWaerme
    },
    emissionenEnergie: function(){
      return this.responsedata.emissionenKaelte + this.responsedata.emissionenStrom + this.responsedata.emissionenWaerme
    }
  },
  
  created(){
    // this.getData();
    this.testdata();
  },

  methods: {
    testdata: function(){
      this.responsedata = {
        id: 12,
        jahr: 2000,
        mitarbeiteranzahl: 120,
        umfragenanzahl: 100,
        emissionenWaerme: 12000000,
        emissionenKaelte: 3000000,
        emissionenStrom: 4000000,
        emissionenITGerate: 15000000,
        emissionenDienstreisen: 6000000,
        emissionenPendelwege: 7000000
      };
      this.responsesuccessful = true;

      this.setChartGesamt();
      this.setChartEnergie();
    },

    getData: async function(){
      await fetch(process.env.VUE_APP_BASEURL + "/auswertung?id=" + this.$props.umfrageid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
        .then((body) => {
          console.log("Success:", body);

          if (body.status == "success"){
            this.responsesuccessful = true
            this.responsedata = body.data
            console.log(this.responsedata)
          }
          else {  // Fehlerbehandlung
            this.responsesuccessful = false
            this.responseerror = body.error
            console.log(this.responseerror)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    setChartGesamt: function(){
      let data = [
        {label: 'Energie', value: this.emissionenEnergie},
        {label: 'Dienstreisen', value: this.responsedata.emissionenDienstreisen},
        {label: 'Pendelweg', value: this.responsedata.emissionenPendelwege},
        {label: 'IT-Geräte', value: this.responsedata.emissionenITGerate},
      ];
      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamt = {
        labels: ['Energie', 'Dienstreisen', 'Pendelwege', 'IT-Geräte'],
        datasets: [{
          label: 'Emissionen',
          data: [this.emissionenEnergie, this.responsedata.emissionenDienstreisen, this.responsedata.emissionenPendelwege, this.responsedata.emissionenITGerate],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]}

      this.chartdataGesamtBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          order: 1,
        },{
          type: 'line',
          label: 'kumulierte Emissionen',
          yAxisID: 'line',
          data: data.map((sum => a => sum += a.value)(0)).map(a => a / this.emissionenGesamt),
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          lineTension: 0,
          order: 0,
        }

      ]}
    },

    setChartEnergie: function(){
      this.chartdataEnergie = {
        labels: ['Wärme', 'Kälte', 'Strom'],
        datasets: [{
          label: 'Emissionen',
          data: [this.responsedata.emissionenWaerme, this.responsedata.emissionenKaelte, this.responsedata.emissionenStrom],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]}
    }
  },
}

</script>