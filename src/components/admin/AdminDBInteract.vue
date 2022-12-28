<template>
  <v-container>
    <v-card class="px-4 pb-4">
      <v-card-title>
        Datenbankinformationen
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col cols="3">
            Datenbankversion:
          </v-col>
          <v-col>
            MongoDB v5.0.6
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            Monitoring:
          </v-col>
          <v-col>
            <a
              href="https://cloud.mongodb.com/freemonitoring/cluster/FJISZV76EW3BHYEPQZKEOLCQTMZ457BD"
              target="_blank"
            >https://cloud.mongodb.com/freemonitoring/cluster/FJISZV76EW3BHYEPQZKEOLCQTMZ457BD</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>


    <v-card class="px-4 pb-4 mt-2">
      <v-card-title>
        Eintragen neuer Daten
      </v-card-title>
      <v-divider />

      <v-alert
        type="warning"
        border="bottom"
        colored-border
        elevation="3"
      >
        Bei Dezimalzahlen muss ein Punkt als Dezimaltrenner verwendet werden!
      </v-alert>

      <v-expansion-panels
        focusable
      >
        <!-- Past years' CO2 factors can be sent to the database-->
        <v-expansion-panel>
          <v-expansion-panel-header>CO2 Faktor</v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-autocomplete
              v-model="co2_factor.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-select
              v-model="co2_factor.energy_type"
              :items="energy_types"
              flat
              label="Energieart"
            />

            <v-select
              v-model="co2_factor.contract"
              :items="contracts"
              flat
              label="Versorger"
            />

            <v-text-field
              v-model="co2_factor.value"
              :rules="notNegativeRule"
              label="Wert des CO2 Faktors in g/kWh"
            />

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="sendFactor"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[0] || displayLoadingAnimation[0] || displayError[0]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[0]" />
              <v-alert
                v-if="displaySuccess[0]"
                type="success"
              >
                {{ successMessage[0] }}
              </v-alert>
              <v-alert
                v-if="displayError[0]"
                type="error"
              >
                {{ errorMessage[0] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- New buildings can be sent to the database -->
        <v-expansion-panel>
          <v-expansion-panel-header>Gebäude Hinzufügen</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="11">
                <v-text-field
                  v-model="building.number"
                  label="Gebäudenummer"
                  :rules="basicRule"
                />
              </v-col>
              <v-col align-self="center">
                <Tooltip
                  tooltip-text="4 Ziffern: Die 1. Ziffer für den Campus (1=Stadtmitte, 2=Botanischer Garten, 
                3=Lichtwiese, 4=Hochschulstadion und 5=Windkanal/August-Euler-Flugplatz). Die Ziffer 2-4 für die 
                Gebäudenummer. Zum Beispiel 1101 für das Universitätszentrum."
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="11">
                <v-text-field
                  v-model="building.name"
                  label="Gebäudebezeichnung"
                  :rules="basicRule"
                />
              </v-col>
              <v-col align-self="center">
                <Tooltip
                  tooltip-text="Eindeutige Bezeichnung des Gebäudes. Zum Beispiel 'Maschinenhaus'."
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="building.hnf"
                  label="Hauptnutzungsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.nnf"
                  label="Nebennutzungsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.ngf"
                  label="Nettogrundfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.ff"
                  label="Funktionsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="building.vf"
                  label="Verkehrsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.freif"
                  label="Freifläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.gesamtf"
                  label="Gesamtfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="sendNewBuilding"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[1] || displayLoadingAnimation[1] || displayError[1]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[1]" />
              <v-alert
                v-if="displaySuccess[1]"
                type="success"
              >
                {{ successMessage[1] }}
              </v-alert>
              <v-alert
                v-if="displayError[1]"
                type="error"
              >
                {{ errorMessage[1] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Counters can be sent to the database as soon as the associated buildings exist (a hint is still missing here!) -->
        <v-expansion-panel>
          <v-expansion-panel-header>Zähler hinzufügen</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="counter.primary_key"
              :rules="notNegativeRule"
              label="Primary Key des Zählers"
            />

            <v-select
              v-model="counter.unit"
              :items="units"
              flat
              label="Zählereinheit"
            />

            <v-select
              v-model="counter.energy_type"
              :items="energy_types"
              flat
              label="Zählertyp"
            />

            <v-text-field
              v-model="counter.name"
              :rules="basicRule"
              label="Bezeichnung des Zählers"
            />

            <div
              v-for="(building_reference, i) in counter.building_references"
              :key="'Gebäudereferenz-' + i"
            >
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="building_reference[0]"
                    :rules="basicRule"
                    label="Gebäudereferenz"
                  />
                </v-col>
                <v-col>
                  <v-btn
                    class="add_text--text"
                    color="add"
                    @click="newBuildingRef()"
                  >
                    Hinzufügen
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    class="delete_text--text"
                    color="delete"
                    @click="removeBuildingRef(i)"
                  >
                    Löschen
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="sendNewCounter"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[2] || displayLoadingAnimation[2] || displayError[2]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[2]" />
              <v-alert
                v-if="displaySuccess[2]"
                type="success"
              >
                {{ successMessage[2] }}
              </v-alert>
              <v-alert
                v-if="displayError[2]"
                type="error"
              >
                {{ errorMessage[2] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Past years' counter data can be sent to the database -->
        <v-expansion-panel>
          <v-expansion-panel-header>Zählerdaten eintragen</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
              v-model="counter_data.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-text-field
              v-model="counter_data.primary_key"
              :rules="notNegativeRule"
              label="Primary Key des Zählers"
            />

            <v-select
              v-model="counter_data.energy_type"
              :items="energy_types"
              flat
              label="Zählertyp"
            />

            <v-text-field
              v-model="counter_data.value"
              :rules="notNegativeRule"
              label="Zählerwert"
            />

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="sendCounterData"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[3] || displayLoadingAnimation[3] || displayError[3]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[3]" />
              <v-alert
                v-if="displaySuccess[3]"
                type="success"
              >
                {{ successMessage[3] }}
              </v-alert>
              <v-alert
                v-if="displayError[3]"
                type="error"
              >
                {{ errorMessage[3] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from "../componentParts/LoadingAnimation.vue";
import Cookies from "../Cookie"

export default {
  components: {
    Tooltip,
    LoadingAnimation
  },

  data: () => ({
    date: null,
    co2_factor: {
      year: '',
      energy_type: '',
      contract: '',
      value: null
    },
    building: {
      number: null,
      name: null,
      hnf: null,
      nnf: null,
      ngf: null,
      ff: null,
      vf: null,
      freif: null,
      gesamtf: null
    },
    counter: {
      primary_key: null,
      unit: '',
      energy_type: '',
      name: null,
      building_references: [[null]]
    },
    counter_data: {
      year: '',
      primary_key: null,
      energy_type: '',
      value: null
    },
    contracts: ['TU Darmstadt', 'Extern'],
    contract_map: new Map([['TU Darmstadt', 1], ['Extern', 2]]),
    energy_types: ['Wärme', 'Strom', 'Kälte'],
    energy_map: new Map([['Wärme', 1], ['Strom', 2], ['Kälte', 3]]),
    units: ['kWh', 'MWh'],

    displaySuccess: [false, false, false, false],
    displayError: [false, false, false, false],
    displayLoadingAnimation: [false, false, false, false], 

    errorMessage: ["", "", "", ""],
    successMessage: ["", "", "", ""],

    //Rules for input validation
    basicRule: [
      (v) => !!v || "Muss angegeben werden",
    ],
    notNegativeRule: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) >= 0) || "Bitte geben Sie eine nicht-negative Zahl an"
    ],
    yearRule: [
      (v) => !!v || "Muss angegeben werden",
      (v) => parseInt(v) > 2017 || "Bitte geben Sie ein valides Jahr an",
    ],

  }),

  computed: {
    /**
    * Returns a list beginning with the current year until 2018.
    */
    possibleYears: function () {
      const beginningYear = 2018;
      let currentYear = new Date().getFullYear();
      return Array.from(new Array(currentYear - beginningYear + 1), (x, i) => i + beginningYear).reverse();
    },
  },

  methods: {

    /**
     * Adds a new building reference to this counter
     */
    newBuildingRef() {
      this.counter.building_references.push([
        null
      ])
    },

    /**
     * Removes the building reference at index i from the counter
     */
    removeBuildingRef(i) {
      if (i >= 0 && this.counter.building_references.length > i) {
        this.counter.building_references.splice(i, 1)
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.counter.building_references.length === 0) {
          this.newBuildingRef()
        }
      }
    },

    /**
     * sends CO2 factor as a json file to db
     */
    sendFactor: async function () {
      this.$set(this.displaySuccess, 0, false)
      this.$set(this.displayError, 0, false)
      this.$set(this.displayLoadingAnimation, 0, true)

      if(!this.co2_factor.year || !this.co2_factor.energy_type || !this.co2_factor.value || !this.co2_factor.contract){
        this.$set(this.errorMessage, 0, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 0, false)
        this.$set(this.displayError, 0, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addFaktor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          idEnergieversorgung: this.energy_map.get(this.co2_factor.energy_type),
          idVertrag: this.contract_map.get(this.co2_factor.contract),
          jahr: parseInt(this.co2_factor.year),
          wert: parseInt(this.co2_factor.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 0, "Der CO2-Faktor wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 0, false)
            this.$set(this.displaySuccess, 0, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 0, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 0, false)
            this.$set(this.displayError, 0, true)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends new building as a json file to db
     */
    sendNewBuilding: async function () {
      this.$set(this.displaySuccess, 1, false)
      this.$set(this.displayError, 1, false)
      this.$set(this.displayLoadingAnimation, 1, true)

      if(!this.building.number || !this.building.name || !this.building.hnf || !this.building.nnf  || !this.building.ngf || 
         !this.building.ff || !this.building.vf || !this.building.freif || !this.building.gesamtf){
        this.$set(this.errorMessage, 1, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 1, false)
        this.$set(this.displayError, 1, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/insertGebaeude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          nr: parseInt(this.building.number),
          bezeichnung: this.building.name,
          flaeche: {
            hnf: parseFloat(this.building.hnf),
            nnf: parseFloat(this.building.nnf),
            ngf: parseFloat(this.building.ngf),
            ff: parseFloat(this.building.ff),
            vf: parseFloat(this.building.vf),
            freif: parseFloat(this.building.freif),
            gesamtf: parseFloat(this.building.gesamtf),
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 1, "Das Gebäude wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 1, false)
            this.$set(this.displaySuccess, 1, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 1, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 1, false)
            this.$set(this.displayError, 1, true)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends new counter as a json file to db
     */
    sendNewCounter: async function () {
      this.$set(this.displaySuccess, 2, false)
      this.$set(this.displayError, 2, false)
      this.$set(this.displayLoadingAnimation, 2, true)

      if(!this.counter.primary_key || !this.counter.unit || !this.counter.energy_type ||
         !this.counter.name || this.buildingRefJSON().length === 0){
        this.$set(this.errorMessage, 2, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 2, false)
        this.$set(this.displayError, 2, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/insertZaehler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          pkEnergie: parseInt(this.counter.primary_key),
          idEnergieversorgung: this.energy_map.get(this.counter.energy_type),
          bezeichnung: this.counter.name,
          einheit: this.counter.unit,
          gebaeudeRef: this.buildingRefJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 2, "Der Zähler wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 2, false)
            this.$set(this.displaySuccess, 2, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 2, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 2, false)
            this.$set(this.displayError, 2, true)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends counter data as a json file to db
     */
    sendCounterData: async function () {
      this.$set(this.displaySuccess, 3, false)
      this.$set(this.displayError, 3, false)
      this.$set(this.displayLoadingAnimation, 3, true)

      if(!this.counter_data.year || !this.counter_data.primary_key || !this.counter_data.energy_type || !this.counter_data.value){
        this.$set(this.errorMessage, 3, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 3, false)
        this.$set(this.displayError, 3, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addZaehlerdaten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          pkEnergie: parseInt(this.counter_data.primary_key),
          idEnergieversorgung: this.energy_map.get(this.counter_data.energy_type),
          jahr: parseInt(this.counter_data.year),
          wert: parseFloat(this.counter_data.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 3, "Die Zählerdaten wurden erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 3, false)
            this.$set(this.displaySuccess, 3, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 3, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 3, false)
            this.$set(this.displayError, 3, true)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * parses the building references of a counter to integers
     */
    buildingRefJSON: function () {
      var buildingRefs = []

      for (var objekt of this.counter.building_references) {
        if (objekt[0] != null) {
          buildingRefs.push(
            parseInt(objekt[0]),
          )
        }
      }
      return buildingRefs
    },

  },
}
</script>