<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <!-- Past years' CO2 factors can be sent to the database-->
        <v-expansion-panel-header>
          CO2 Faktor
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-text-field
            v-model="co2_factor.year"
            placeholder="Jahr"
          />

          <v-select
            v-model="co2_factor.energy_type"
            :items="energy_types"
            flat
            placeholder="Energieart"
          />

          <v-text-field
            v-model="co2_factor.value"
            placeholder="Wert des CO2 Faktors in g/kWh"
          />

          <v-card-actions>
            <v-col class="text-left">
              <v-btn
                color="primary"
              >
                Absenden
                @click="sendFactor"
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- New buildings can be sent to the database -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          Gebäude Hinzufügen
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="building.number"
            placeholder="Gebäudenummer"
          />

          <v-text-field
            v-model="building.name"
            placeholder="Gebäudebezeichnung"
          />

          <v-row>
            <v-col>
              <v-text-field
                v-model="building.hnf"
                placeholder="Hauptnutzungsfläche in qm"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="building.nnf"
                placeholder="Nebennutzungsfläche in qm"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="building.ngf"
                placeholder="Nettogrundfläche in qm"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="building.ff"
                placeholder="Funktionsfläche in qm"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="building.vf"
                placeholder="Verkehrsfläche in qm"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="building.freif"
                placeholder="Freifläche in qm"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="building.gesf"
                placeholder="Gesamtfläche in qm"
              />
            </v-col>
          </v-row>

          <v-card-actions>
            <v-col class="text-left">
              <v-btn
                color="primary"
              >
                Absenden
                @click="sendNewBuilding"
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Counters can be sent to the database as soon as the associated buildings exist (a hint is still missing here!) -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          Zähler hinzufügen
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="counter.primary_key"
            placeholder="Primary Key des Zählers"
          />

          <v-select
            v-model="counter.unit"
            :items="units"
            flat
            placeholder="Zählereinheit"
          />

          <v-select
            v-model="counter.energy_type"
            :items="energy_types"
            flat
            placeholder="Zählertyp"
          />

          <v-text-field
            v-model="counter.name"
            placeholder="Bezeichnung des Zählers"
          />



          <div
            v-for="(building_reference, i) in counter.building_references"
            :key="'Gebäudereferenz-' + i"
          >
            <v-row>
              <v-col cols="9">
                <v-text-field
                  v-model="building_reference[0]"
                  placeholder="Gebäudereferenz"
                />
              </v-col>
              <v-col>
                <v-btn
                  color="add"
                  @click="newBuildingRef()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
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
              >
                Absenden
                @click="sendNewCounter"
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Past years' counter data can be sent to the database -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          Zählerdaten eintragen
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="counter_data.year"
            placeholder="Jahr der Zählerdaten"
          />
          
          <v-text-field
            v-model="counter_data.primary_key"
            placeholder="Primary Key des Zählers"
          />

          <v-select
            v-model="counter_data.energy_type"
            :items="energy_types"
            flat
            placeholder="Zählertyp"
          />

          <v-text-field
            v-model="counter_data.value"
            placeholder="Zählerwert"
          />

          <v-card-actions>
            <v-col class="text-left">
              <v-btn
                color="primary"
              >
                Absenden
                @click="sendCounterData"
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      date: null,
      co2_factor: {
        year: '',
        energy_type: null,
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
        gesf: null
      },
      counter: {
        primary_key: null,
        unit: null,
        energy_type: null,
        name: null,
        building_references: [[null]]
      },
      counter_data: {
        year: '',
        primary_key: null,
        energy_type: null,
        value: null
      },
      energy_types: ['Wärme', 'Strom', 'Kälte'],
      energy_map: new Map([['Wärme', 1], ['Strom', 2], ['Kälte', 3]]),
      units: ['kWh', 'MWh']
    }),
    methods: {
      
      /**
       * Adds a new building reference to this counter
       */
      newBuildingRef(){
        this.counter.building_references.push([
          null
        ])
      },

      /**
       * Removes the building reference at index i from the counter
       */
      removeBuildingRef(i){
        if(i >= 0 && this.counter.building_references.length > i) {
          this.counter.building_references.splice(i, 1)
          //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
          if(this.counter.building_references.length === 0) {
            this.newBuildingRef()
          }
        }
      },

      sendFactor: async function () {

        await fetch("http://localhost:9000/umfrage/addFaktor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idEnergieversorgung: this.energy_map.get(this.co2_factor.energy_type),
            jahr: parseInt(this.co2_factor.year),
            wert: parseInt(this.co2_factor.value),
         }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      sendNewBuilding: async function () {

        await fetch("http://localhost:9000/umfrage/insertGebaeude", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nr: parseInt(this.building.number),
            bezeichnung: this.building.name,
            flaeche: JSON.stringify({
              hnf: parseFloat(this.building.hnf),
              nnf: parseFloat(this.building.nnf),
              ngf: parseFloat(this.building.ngf),
              ff: parseFloat(this.building.ff),
              vf: parseFloat(this.building.vf),
              freif: parseFloat(this.building.freif),
              gesamtf: parseFloat(this.building.gesamtf),
            }),
         }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      
      sendNewCounter: async function () {

        await fetch("http://localhost:9000/umfrage/insertZaehler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pkEnergie: parseInt(this.counter.primary_key),
            idEnergieversorgung: this.energy_map.get(this.counter.energy_type),
            bezeichnung: this.counter.name,
            einheit: this.counter.unit,
            gebauedeRef: this.counter.building_references,
         }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      sendCounterData: async function () {

        await fetch("http://localhost:9000/umfrage/addZaehlerdaten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pkEnergie: this.counter_data.primary_key,
            idEnergieversorgung: this.energy_map.get(this.counter_data.energy_type),
            jahr: parseInt(this.counter_data.year),
            wert: parseFloat(this.counter_data.value),
         }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

    },
  }
</script>