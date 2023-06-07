<template>
  <v-container>
    <v-card
      v-if="responsesuccessful"
      elevation="2"
      outlined
      class="pa-7"
    >
      <v-card-title>Auswertung der Umfrage "{{ responsedata.bezeichnung }}"</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-icon>
              mdi-calendar
            </v-icon>
            Bilanzierungsjahr: {{ responsedata.jahr }}
          </v-col>
          <v-col>
            <v-icon>
              mdi-account
            </v-icon>
            Mitarbeitendenanzahl: {{ responsedata.mitarbeiteranzahl }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-icon>
              mdi-account-edit
            </v-icon>
            Ausgefüllte Mitarbeitendenumfragen: {{ responsedata.umfragenanzahl }}
          </v-col>
          <v-col>
            <v-progress-linear
              height="25"
              color="cyan"
              :value="responsedata.umfragenanteil"
            >
              <strong>{{ responsedata.umfragenanteil }}%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
        <v-row v-if="displayExtrapolationWarning">
          <v-col>
            <v-alert
              type="warning"
            >
              Die Hochrechnung der Emissionsdaten ist ungenau, weil bisher nur {{ responsedata.umfragenanteil }}% der Mitarbeitenden die Umfrage ausgefüllt haben.
            </v-alert>
          </v-col>
        </v-row>

        <DataGapVisualization 
          :gebaeude-i-ds-und-zaehler="gebaeudeIDsUndZaehler"
          :zaehler="zaehler"
          :gebaeude="umfrageGebaeude"
          :bilanzierungsjahr="responsedata.jahr"
        />
      </v-container>

      <v-card-title>Emissionen</v-card-title>

      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-icon>
              mdi-thought-bubble
            </v-icon>
            Gesamtemissionen: {{ responsedata.emissionenGesamt }} t CO<sub>2</sub> eq.
          </v-col>
          <v-col>
            <v-icon>
              mdi-human-male-board-poll
            </v-icon>
            Emissionen pro Mitarbeitende: {{ responsedata.emissionenProMitarbeiter }} t CO<sub>2</sub> eq.
          </v-col>
        </v-row>

        <!-- Referenzwerte (Haushalte) -->
        <v-row justify="center">
          <v-card
            outlined
            class="pa-7"
          >
            <v-icon>mdi-thought-bubble-outline</v-icon>
            <b>Did you know?</b>
            : {{ haushalteReferenzText }}
          </v-card>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>Aufteilung nach Hauptemissionsfaktoren</h4>
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
                Die angezeigten Emissionen für den Energieverbrauch können unvollständig sein. Der Grund dafür ist, dass nicht alle Gebäude der TU mit einem eigenen Zähler ausgestattet sind und keine Zählerdaten vorliegen.
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert
              type="warning"
            >
              Es ist kein Auswertung der Emissionen durch den Energieverbrauch möglich. 
              Für das ausgewählte Bilanzierungsjahr fehlen Daten seitens der TU Darmstadt, um die Emissionen berechnen zu können. 
              Die Zählerinfrastruktur wird durch das Energiemanagment immer weiter ausgebaut.
              Sie können leider nichts tun, um die Auswertung zu vervollständigen.
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
              :chart-data="chartdataEnergieBar"
              :options="optionsEnergieBar"
            />
          </v-col>
        </v-row>
        <!-- Hier von mir  -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              Darstellung des Energieverbrauches
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-alert-circle-outline
                  </v-icon>
                </template>
                Die angezeigten Verbrauche für den Energieverbrauch können unvollständig sein.
                Der Grund dafür ist, dass nicht alle Gebäude der TU mit einem eigenen Zähler ausgestattet sind und keine Zählerdaten vorliegen.
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert
              type="warning"
            >
              Es ist kein Auswertung der Emissionen durch den Energieverbrauch möglich.
              Für das ausgewählte Bilanzierungsjahr fehlen Daten seitens der TU Darmstadt, um die Emissionen berechnen zu können.
              Die Zählerinfrastruktur wird durch das Energiemanagment immer weiter ausgebaut.
              Sie können leider nichts tun, um die Auswertung zu vervollständigen.
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="displayEnergieCharts">
          <v-col>
            <doughnut-chart
              :chart-data="chartdataVerbrauchDoughnut"
              :options="optionsVerbrauchDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataVerbrauchBar"
              :options="optionsVerbrauchBar"
            />
          </v-col>
        </v-row>
        <!-- Bis hier von mir  -->
        <v-row>
          <v-col>
            <v-alert 
              text
              type="info"
            >
              Das Büro für Nachhaltigkeit hat Tipps zum <a
                href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/projekte_buero/news_projekte_buero_details_348992.de.jsp"
                target="_blank"
                style="color:hsl(229, 100%, 50%);"
              >Energiesparen am Arbeitsplatz</a> zusammengestellt.
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            class="ml-8 align-self-center"
            color="primary"
            @click="makeSpreadsheet"
          >
            <v-icon left>
              mdi-file-chart-outline
            </v-icon>Download als Excel
          </v-btn>
         
          <v-switch
            v-if="!this.$props.shared"
            v-model="responsedata.auswertungFreigegeben"
            class="ml-8"
            inset
            :label="`Linksharing ${(responsedata.auswertungFreigegeben ? 'aktiviert' : 'deaktiviert')}`"
            @click="updateFlipLinkShare"
          />
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="showLoading || responsedata.auswertungFreigegeben"
    >
      <LoadingAnimation v-if="showLoading" />
      <LinkSharingComponent
        v-if="!this.$props.shared && responsedata.auswertungFreigegeben && !showLoading"
        :mitarbeiter-link="linkshareBaseURL + responsedata.id"
        :link-ziel="'Auswertung'"
      />
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
import DoughnutChart from "../charts/DoughnutChart.js";
import BarChart from "../charts/BarChart.js";
import XLSX from "xlsx";
import saveAs from 'file-saver';
import Cookies from '../Cookie.js';
import LoadingAnimation from "../componentParts/LoadingAnimation.vue";
import LinkSharingComponent from "../componentParts/LinkSharingComponent.vue";
import DataGapVisualization from '../componentParts/DataGapVisualization.vue';

export default {
  name: "SurveyEvaluation",

  components: {
    DoughnutChart,
    BarChart,
    LoadingAnimation,
    LinkSharingComponent,
    DataGapVisualization,
},

  props: {
    umfrageid: {
      default: "",
      type: String,
    },
    shared: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      responsesuccessful: false,
      responseNotSuccessful: false,
      responsedata: {
        id: null,
        bezeichnung: null,
        jahr: null,
        mitarbeiteranzahl: null,
        umfragenanzahl: null,
        umfragenanteil: null,
        auswertungFreigegeben: null,

        emissionenWaerme: null,
        emissionenStrom: null,
        emissionenKaelte: null,
        emissionenEnergie: null,
        emissionenITGeraeteHauptverantwortlicher: null,
        emissionenITGeraeteMitarbeiter: null,
        emissionenITGeraete: null,
        emissionenDienstreisen: null,
        emissionenPendelwege: null,
        emissionenGesamt: null,
        emissionenProMitarbeiter: null,

        verbrauchWaerme: null,
        verbrauchStrom: null,
        verbrauchKaelte: null,
        verbrauchEnergie: null,

        vergleich2PersonenHaushalt: null,
        vergleich4PersonenHaushalt: null,
      },
      responseerror: {
        code: null,
        message: null,
      },
      // Wenn Link Sharing korrekt geflipped wurde
      displaySuccess: false,
      showLoading: false,

      // base url for Mitarbeiterumfragen
      linkshareBaseURL: process.env.VUE_APP_URL + '/survey/results/',

      displayEnergieCharts: true,

      chartdataGesamtDoughnut: null,
      optionsGesamtDoughnut: null,

      chartdataGesamtPareto: null,
      optionsGesamtPareto: null,

      chartdataEnergieDoughnut: null,
      optionsEnergieDoughnut: null,

      chartdataEnergieBar: null,
      optionsEnergieBar: null,

      chartdataVerbrauchDoughnut: null,
      optionsVerbrauchDoughnut: null,

      chartdataVerbrauchBar: null,
      optionsVerbrauchBar: null,

      // for data gap visualization
      umfrageGebaeude: [],
      gebaeudeIDsUndZaehler: [],
      zaehler: [],
    }
  },

  computed: {
    haushalteReferenzText: function () {
      let base_text_beginning = "Ihr Gesamtverbrauch entspricht circa ";
      let base_text_middle = " bzw. ";
      let text_zweiPersonenHaushalt = this.responsedata.vergleich2PersonenHaushalt + " Zwei-Personen-Haushalten";
      let text_vierPersonenHaushalt = this.responsedata.vergleich4PersonenHaushalt + " Vier-Personen-Haushalten";
      let base_text_ending = " in einem Jahr."
      return base_text_beginning + text_vierPersonenHaushalt + base_text_middle + text_zweiPersonenHaushalt + base_text_ending;
    },
    displayExtrapolationWarning: function () {
      return this.responsedata.umfragenanteil <= 50.0
    }
  },

  created() {
    this.getData();
  },

  methods: {
    /**
     * Creates XLSX file and makes it downloadable.
     */
    makeSpreadsheet: function () {
      var data = [
        {
          "col1": "Auswertung der Umfrage",
        },
        {
          "col1": "Jahr",
          "col2": this.responsedata.jahr,
        },
        {
          "col1": "Mitarbeitendenanzahl",
          "col2": this.responsedata.mitarbeiteranzahl,
        },
        {
          "col1": "ausgefüllte Mitarbeitendenumfragen",
          "col2": this.responsedata.umfragenanzahl,
        },
        {
          "col1": "Quote",
          "col2": this.responsedata.umfragenanteil + "%",
        },
        {},
        {
          "col1": "Emissionsüberblick",
          "col2": "t CO2 eq.",
        },
        {
          "col1": "Gesamtemissionen",
          "col2": this.responsedata.emissionenGesamt,
        },
        {
          "col1": "Emissionen pro Mitarbeitenden",
          "col2": this.responsedata.emissionenProMitarbeiter,
        },
        {},
        {
          "col1": "Vergleich 4-Personen Haushalt",
          "col2": this.responsedata.vergleich4PersonenHaushalt,
        },
        {
          "col1": "Vergleich 2-Personen Haushalt",
          "col2": this.responsedata.vergleich2PersonenHaushalt,
        },
        {},
        {
          "col1": "Aufteilung nach Hauptemissonsfaktoren",
          "col2": "t CO2 eq.",
          "col3": "%",
        },
        {
          "col1": "Energie",
          "col2": this.responsedata.emissionenEnergie,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenEnergie / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "Pendelwege",
          "col2": this.responsedata.emissionenPendelwege,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenPendelwege / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "Dienstreisen",
          "col2": this.responsedata.emissionenDienstreisen,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenDienstreisen / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "IT-Geräte",
          "col2": this.responsedata.emissionenITGeraete,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenITGeraete / this.responsedata.emissionenGesamt * 1000) / 10
        },
        {},
        {
          "col1": "Aufteilung nach Energieart",
          "col2": "t CO2 eq.",
          "col3": "%",
        },
        {
          "col1": "Wärme",
          "col2": this.responsedata.emissionenWaerme,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenWaerme / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": "Kälte",
          "col2": this.responsedata.emissionenKaelte,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenKaelte / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": "Strom",
          "col2": this.responsedata.emissionenStrom,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenStrom / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {},
        {
          "col1": "Darstellung des Energieverbrauches",
          "col2": "kWh",
          "col3": "%",
        },
        {
          "col1": "Wärme",
          "col2": this.responsedata.verbrauchWaerme,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchWaerme / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
        {
          "col1": "Kälte",
          "col2": this.responsedata.verbrauchKaelte,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchKaelte / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
        {
          "col1": "Strom",
          "col2": this.responsedata.verbrauchStrom,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchStrom / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
      ];
      var options = {
        header: ["col1", "col2", "col3"],
        skipHeader: true,
      }

      // workbook
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "CO2 Rechner",
        CreatedDate: new Date()
      };
      wb.SheetNames.push("Emissionen");

      // worksheet
      var ws = XLSX.utils.json_to_sheet(data, options);
      wb.Sheets["Emissionen"] = ws;

      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
      }

      saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Emissionen_' + this.responsedata.bezeichnung + '.xlsx');
    },

/**
 * Fetches Get request to get survey data and evaluation.
 */
  getData: async function () {
    await fetch(process.env.VUE_APP_BASEURL + "/auswertung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authToken: {
          username: Cookies.getCookieAttribut("username"),
          sessiontoken: Cookies.getCookieAttribut("sessiontoken")
        },
        umfrageID: this.$props.umfrageid,
      }),
    }).then((response) => response.json())
      .then((body) => {
        if (body.status == "success") {
          this.responsesuccessful = true
          this.responsedata = body.data
          this.responsedata.auswertungFreigegeben = (body.data.auswertungFreigegeben == 1) ? true : false
          this.checkNegativValue();
          this.roundResponseData();
          this.setChartGesamt();
          this.setChartEnergie();
          this.setChartVerbrauch();

          this.gebaeudeIDsUndZaehler = this.responsedata.gebaeudeIDsUndZaehler
          this.umfrageGebaeude = this.responsedata.umfrageGebaeude.map(x => [translateGebaeudeIDToSymbolic(x["gebaeudeNr"]), x["nutzflaeche"]])
          this.zaehler = this.responsedata.zaehler
        }
        else {  // Fehlerbehandlung
          this.responseNotSuccessful = true
          this.responseerror = body.error
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },

    /**
     * updateFlipLinkShare sendet eine POST update Request ans Backend, wodurch das Link Sharing für diese Umfrage aktiviert wird, wenn es aktuell deaktiviert ist
     * bzw. deaktiviert wenn es gerade aktiviert ist.
     * Im Erfolgsfall wird eine Erfolgsnachricht angezeigt und sonst eine Fehlermeldung.
     * Der lokal gespeicherte LinkShare Wert wird angepasst.
     */
    updateFlipLinkShare: async function() {
      this.showLoading = true;
      this.displaySuccess = false;

      await fetch(process.env.VUE_APP_BASEURL + "/auswertung/updateSetLinkShare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          },
          umfrageID: this.$props.umfrageid,
          // freigabewert 0 ist teilen deaktiviert, 1 aktiviert und wir flippen hier
          freigabewert: ((this.responsedata.auswertungFreigegeben) ? 1 : 0),
        }),
      }).then((response) => response.json())
        .then((body) => {
          this.showLoading = false
          if (body.status == "success") {
            this.displaySuccess = true
        }
        else {  // Fehlerbehandlung
          this.showLoading = false
          this.responseNotSuccessful = true
          this.responseerror = body.error
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
    checkNegativValue: function () {
      if (this.responsedata.emissionenWaerme < 0 || this.responsedata.emissionenKaelte < 0 || this.responsedata.emissionenStrom < 0) {
        this.displayEnergieCharts = false;
      }
      if (this.responsedata.verbrauchWaerme < 0 || this.responsedata.verbrauchKaelte < 0 || this.responsedata.verbrauchStrom < 0) {
        this.displayEnergieCharts = false;
      }
    },

    /**
     * Method rounds all emission values to unit t with 3 decimal places.
     */
    roundResponseData: function () {
      let roundFactor1 = 10000
      let roundFactor2 = 100

      this.responsedata.emissionenWaerme = Math.round(this.responsedata.emissionenWaerme / roundFactor1) / roundFactor2
      this.responsedata.emissionenStrom = Math.round(this.responsedata.emissionenStrom / roundFactor1) / roundFactor2
      this.responsedata.emissionenKaelte = Math.round(this.responsedata.emissionenKaelte / roundFactor1) / roundFactor2
      this.responsedata.emissionenEnergie = Math.round(this.responsedata.emissionenEnergie / roundFactor1) / roundFactor2

      this.responsedata.emissionenITGeraeteHauptverantwortlicher = Math.round(this.responsedata.emissionenITGeraeteHauptverantwortlicher / roundFactor1) / roundFactor2
      this.responsedata.emissionenITGeraeteMitarbeiter = Math.round(this.responsedata.emissionenITGeraeteMitarbeiter / roundFactor1) / roundFactor2
      this.responsedata.emissionenITGeraete = Math.round(this.responsedata.emissionenITGeraete / roundFactor1) / roundFactor2

      this.responsedata.emissionenDienstreisen = Math.round(this.responsedata.emissionenDienstreisen / roundFactor1) / roundFactor2
      this.responsedata.emissionenPendelwege = Math.round(this.responsedata.emissionenPendelwege / roundFactor1) / roundFactor2

      this.responsedata.emissionenGesamt = Math.round(this.responsedata.emissionenGesamt / roundFactor1) / roundFactor2
      this.responsedata.emissionenProMitarbeiter = Math.round(this.responsedata.emissionenProMitarbeiter / roundFactor1) / roundFactor2

      this.responsedata.umfragenanteil = Math.round(this.responsedata.umfragenanteil * 1000) / 10
      this.responsedata.vergleich2PersonenHaushalt = Math.round(this.responsedata.vergleich2PersonenHaushalt * 100) / 100
      this.responsedata.vergleich4PersonenHaushalt = Math.round(this.responsedata.vergleich4PersonenHaushalt * 100) / 100
    },

    /**
     * Method sets data and options for the Gesamt charts.
     */
    setChartGesamt: function () {
      let data = [
        { label: 'Energie', value: this.responsedata.emissionenEnergie, color: 'rgb(255, 99, 132)'},
        { label: 'Dienstreisen', value: this.responsedata.emissionenDienstreisen, color: 'rgb(54,162,235)'},
        { label: 'Pendelweg', value: this.responsedata.emissionenPendelwege, color: 'rgb(255, 205, 86)' },
        { label: 'IT-Geräte', value: this.responsedata.emissionenITGeraete, color: 'rgb(75, 192, 192)' },
      ];
      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamtDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4
        }]
      }

      this.optionsGesamtDoughnut = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenGesamt === 0){
                return 0
              }
              return (Math.round(value / this.responsedata.emissionenGesamt * 1000) / 10) + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      }

      this.chartdataGesamtPareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          }
        }]
      };
      this.optionsGesamtPareto = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
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
          }]
        },
      };
    },
    /**
     * Method sets data and options for the Energie charts.
     */
    setChartEnergie: function () {
      let data = [
        { label: 'Wärme', value: this.responsedata.emissionenWaerme, color: 'rgb(240, 128, 128)'},
        { label: 'Kälte', value: this.responsedata.emissionenKaelte, color:  'rgb(0, 204, 255)'},
        { label: 'Strom', value: this.responsedata.emissionenStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataEnergieDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4
        }]
      }
      this.optionsEnergieDoughnut = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenEnergie === 0){
                return 0
              }
              return (Math.round(value / this.responsedata.emissionenEnergie * 1000) / 10) + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      }

      this.chartdataEnergieBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
        }]
      }
      this.optionsEnergieBar = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
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
          }]
        },
      }
    },
    /**
     * Method sets data and options for the Energie charts.
     */
    setChartVerbrauch: function () {
      let data = [
        { label: 'Wärme', value: this.responsedata.verbrauchWaerme, color: 'rgb(240, 128, 128)'},
        { label: 'Kälte', value: this.responsedata.verbrauchKaelte, color:  'rgb(0, 204, 255)'},
        { label: 'Strom', value: this.responsedata.verbrauchStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataVerbrauchDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4
        }]
      }
      this.optionsVerbrauchDoughnut = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenEnergie === 0){
                return 0
              }
              return (Math.round(value / this.responsedata.verbrauchEnergie * 1000) / 10) + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      }

      this.chartdataVerbrauchBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'kWh',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
        }]
      }
      this.optionsVerbrauchBar = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'kWh'
            }
          }]
        },
      }
    },

  },
}

/**
 * Translates a given numeric gebaeudeID to its symbolic equivalent (string).
 * E.g. 1101 is translated to S101, 3312 to L312 and so on.
 */
function translateGebaeudeIDToSymbolic(gebaeudeID) {
  let gebaeudeDict = {
      1: "S",
      2: "B",
      3: "L",
      4: "H",
      5: "W",
  };
  gebaeudeID = gebaeudeID.toString()
  let translatedID = gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return translatedID;
}

</script>

<style>
.p{
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>