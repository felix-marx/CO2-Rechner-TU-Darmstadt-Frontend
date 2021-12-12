<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
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
            placeholder="Wert des CO2 Faktors"
          />

          <v-card-actions>
            <v-col class="text-right">
              <v-btn
                text
                color="primary"
              >
                Senden
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

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

          <v-text-field
            v-model="building.surface"
            placeholder="Grundfläche in qm"
          />

          <v-card-actions>
            <v-col class="text-right">
              <v-btn
                text
                color="primary"
              >
                Senden
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

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
            v-model="counter.type"
            :items="energy_types"
            flat
            placeholder="Zählertyp"
          />

          <v-text-field
            v-model="counter.name"
            placeholder="Bezeichnung des Zählers"
          />

          <v-text-field
            v-model="counter.building_reference"
            placeholder="Gebäudereferenz"
          />

          <v-card-actions>
            <v-col class="text-right">
              <v-btn
                text
                color="primary"
              >
                Senden
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>

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
            v-model="counter_data.type"
            :items="energy_types"
            flat
            placeholder="Zählertyp"
          />

          <v-text-field
            v-model="counter_data.value"
            placeholder="Zählerwert"
          />

          <v-card-actions>
            <v-col class="text-right">
              <v-btn
                text
                color="primary"
              >
                Senden
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
        surface: null
      },
      counter: {
        primary_key: null,
        counter_type: null,
        name: null,
        building_reference: null
      },
      counter_data: {
        year: '',
        primary_key: null,
        type: null,
        value: null
      },
      energy_types: ['g/kWh'],
    }),
  }
</script>