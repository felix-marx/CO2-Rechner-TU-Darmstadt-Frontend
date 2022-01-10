<template>
  <v-container>
    <v-card
      v-if="responsesuccessful"
      elevation="2"
      outlined
      class="pa-7"
    >
      <v-card-title>Auswertung der Umfrage {{ responsedata.id }}</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <p>
              Bilanzierungsjahr: {{ responsedata.jahr }}
            </p>
          </v-col>
          <v-col>
            <p>Mitarbeiteranzahl: {{ responsedata.mitarbeiteranzahl }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Ausgefüllte Mitarbeiterumfragen: {{ responsedata.umfragenanzahl }}</p>
          </v-col>
          <v-col>
            <v-progress-linear
              height="25"
              color="cyan"
              :value="umfragenanteil"
            >
              <strong>{{ umfragenanteil }}%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title>
        Emissionen
      </v-card-title>

      <v-divider />
      <v-container>    
        <v-row>
          <v-col>
            <p>Gesamtemissionen: {{ emissionenGesamt }} t CO<sub>2</sub> eq.</p>
          </v-col>
          <v-col>
            <p>Emissionen pro Mitarbeiter: {{ emissionenProMitarbeiter }} t CO<sub>2</sub> eq.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              Aufteilung nach Hauptemissionsfaktoren
            </h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <doughnut-chart
              :chart-data="chartdataGesamtDoughnut"
              :options="optionsGesamtDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataGesamtPareto"
              :options="optionsGesamtPareto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              Aufteilung der Emissionen nach Energieart
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-alert-circle-outline
                  </v-icon>
                </template>
                Die angezeigten Emissionen für den Energieverbrauch können unvollständig sein. Der Grund dafür ist, dass nicht alle Gebäude der TU mit einem eingenen Zähler ausgestattet sind und keine Zählerdaten vorliegen.
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert type="error">
              Für den Energieverbrauch konnten keine Emissionen berechnet werden, weil Daten für das ausgewählte Bilanzierungsjahr fehlen!
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="displayEnergieCharts">
          <v-col>
            <doughnut-chart
              :chart-data="chartdataEnergieDoughnut"
              :options="optionsEnergieDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataEnergiePareto"
              :options="optionsEnergiePareto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary">
              Download als PDF
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="responseNotSuccessful"
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
      responsesuccessful: false,
      responseNotSuccessful: false,
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

      displayEnergieCharts: true,

      chartdataGesamtDoughnut: null,
      optionsGesamtDoughnut: null,

      chartdataGesamtPareto: null,
      optionsGesamtPareto:null,

      chartdataEnergieDoughnut: null,
      optionsEnergieDoughnut: null,

      chartdataEnergiePareto: null,
      optionsEnergiePareto:null,
    }
  },

  computed: {
    emissionenGesamt: function(){
      return Math.round((this.responsedata.emissionenDienstreisen + this.responsedata.emissionenPendelwege 
                       + this.responsedata.emissionenITGeraete + this.responsedata.emissionenKaelte 
                       + this.responsedata.emissionenStrom + this.responsedata.emissionenWaerme) * 1000) / 1000
    },
    emissionenEnergie: function(){
      return Math.round((this.responsedata.emissionenKaelte + this.responsedata.emissionenStrom + this.responsedata.emissionenWaerme) * 1000) / 1000
    },
    umfragenanteil: function(){
      return Math.round(this.responsedata.umfragenanzahl / this.responsedata.mitarbeiteranzahl * 1000) / 10
    },
    emissionenProMitarbeiter: function(){
      return Math.round(this.emissionenGesamt / this.responsedata.mitarbeiteranzahl * 1000) / 1000
    }
  },
  
  created(){
    // this.getData();
    this.testdata();
  },

  methods: {
    testdata: function(){
      this.responsedata = {
        id: "507f1f77bcf86cd799439011",
        jahr: 2000,
        mitarbeiteranzahl: 120,
        umfragenanzahl: 100,
        emissionenWaerme: 12222000,
        emissionenKaelte: 3000000,
        emissionenStrom: 4000000,
        emissionenITGeraete: 15000000,
        emissionenDienstreisen: 6000400,
        emissionenPendelwege: 7000500
      };
      this.responsesuccessful = true;

      this.roundRespoonseData();
      this.setChartGesamt();
      this.setChartEnergie();
    },

    /**
     * Fetches Get request to get survey data and evaluation.
     */
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

            this.checkNegativValue();
            this.roundRespoonseData();
            this.setChartGesamt();
            this.setChartEnergie();
          }
          else {  // Fehlerbehandlung
            this.responseNotSuccessful = true
            this.responseerror = body.error
            console.log(this.responseerror)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * Method checks for negativ values in energy emissions which indecated that the year of the survey has no data in the database.
     * If dedected sets the flag displayEnergieChart to false
     */
    checkNegativValue: function(){
      if(this.responsedata.emissionenWaerme < 0 || this.responsedata.emissionenKaelte < 0 || this.responsedata.emissionenStrom < 0){
        this.displayEnergieCharts = false;
      }
    },

    /**
     * Method rounds all emission values to unit t with 3 decimal places.
     */
    roundRespoonseData: function(){
      let roundFactor1 = 1000
      let roundFactor2 = 1000

      this.responsedata.emissionenWaerme = Math.round(this.responsedata.emissionenWaerme / roundFactor1) / roundFactor2
      this.responsedata.emissionenStrom = Math.round(this.responsedata.emissionenStrom / roundFactor1) / roundFactor2
      this.responsedata.emissionenKaelte = Math.round(this.responsedata.emissionenKaelte / roundFactor1) / roundFactor2
      this.responsedata.emissionenITGeraete = Math.round(this.responsedata.emissionenITGeraete / roundFactor1) / roundFactor2
      this.responsedata.emissionenDienstreisen = Math.round(this.responsedata.emissionenDienstreisen / roundFactor1) / roundFactor2
      this.responsedata.emissionenPendelwege = Math.round(this.responsedata.emissionenPendelwege / roundFactor1) / roundFactor2
    },

    /**
     * Method sets data and options for the Gesamt charts.
     */
    setChartGesamt: function(){
      let data = [
        {label: 'Energie', value: this.emissionenEnergie},
        {label: 'Dienstreisen', value: this.responsedata.emissionenDienstreisen},
        {label: 'Pendelweg', value: this.responsedata.emissionenPendelwege},
        {label: 'IT-Geräte', value: this.responsedata.emissionenITGeraete},
      ];

      this.chartdataGesamtDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]}
      this.optionsGesamtDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return (Math.round(value / this.emissionenGesamt * 1000) / 10) + '%';
            },
          },
        },
      }

      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamtPareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'blue',
            anchor: 'end',
            clamp: true,
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'green'
              }
            }
          }
        },{
          type: 'line',
          label: 'kumulierte Emissionen',
          yAxisID: 'line',
          data: data.map((sum => a => sum += a.value)(0)).map(a => a / this.emissionenGesamt),
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          lineTension: 0,
          order: 0,
          datalabels: {
            display: false,
          },
        }]
      };
      this.optionsGesamtPareto = {
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
              labelString: 't C02 eq.'
            }
          },{
            id: 'line',
            position: 'right',
            ticks: {
              max: 1,
              min: 0,
            },
            gridLines: {
                display:false
            }
          }]
        },
      };
    },

    /**
     * Method sets data and options for the Energie charts.
     */
    setChartEnergie: function(){
      let data = [
        {label: 'Wärme', value: this.responsedata.emissionenWaerme},
        {label: 'Kälte', value: this.responsedata.emissionenKaelte},
        {label: 'Strom', value: this.responsedata.emissionenStrom},
      ];

      this.chartdataEnergieDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]}
      this.optionsEnergieDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return (Math.round(value / this.emissionenGesamt * 1000) / 10) + '%';
            },
          },
        },
      }

      data.sort((a, b) => b.value - a.value)

      this.chartdataEnergiePareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'blue',
            anchor: 'end',
            clamp: true,
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'green'
              }
            }
          },
        },{
          type: 'line',
          label: 'kumulierte Emissionen',
          yAxisID: 'line',
          data: data.map((sum => a => sum += a.value)(0)).map(a => a / this.emissionenEnergie),
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          lineTension: 0,
          order: 0,
          datalabels: {
            display: false,
          },
        }]
      }
      this.optionsEnergiePareto = {
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
              labelString: 't C02 eq.'
            }
          },{
            id: 'line',
            position: 'right',
            ticks: {
              max: 1,
              min: 0,
            },
            gridLines: {
                display:false
            }
          }]
        },
      }
    },
  },
}

</script>