<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <v-form lazy-validation>
        <v-card class="pa-7">
          <!-- Mitarbeiter in Abteilung -->
          
          <br>
          <h3>Wie viele Mitarbeiter arbeiten in ihrer Abteilung?</h3>
          <v-divider />
          <br>

          <v-container>
            <v-row>
              <v-text-field
                v-model="anzahlMitarbeiter"
                :rules="absolutpositivRules" 
                label="Mitarbeiteranzahl" 
                type="number"
                prepend-icon="mdi-account"
              />
            </v-row>
          </v-container>

          <!-- Genutzte Gebäude -->

          <br>
          <h3>Welche Gebäude nutzt ihre Abteilung?</h3>
          <v-divider />
          <br>

          <div
            v-for="(objekt, index) in gebaeude"
            :key="index"
          >
            <v-row>
              <v-col
                cols="5"
              >
                <v-text-field 
                  v-model="objekt[0]" 
                  label="Gebäudenr" 
                  prepend-icon="mdi-domain" 
                  class="pr-5"
                />
              </v-col>
              <v-col
                cols="5"
              >
                <v-text-field 
                  v-model="objekt[1]" 
                  :rules="absolutpositivRules"
                  label="Nutzfläche" 
                  prepend-icon="mdi-domain" 
                  type="number"
                  suffix="qm"
                />
              </v-col>
              <v-col>
                <v-btn
                  color="add"
                  @click="newGebaeude()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  color="delete"
                  @click="removeGebaeude(index)"
                >
                  Löschen
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- Umfrage für IT Geräte: Multifunktionsgeräte + Toner, Drucker + Toner, Beamer, Server -->  

          <br>
          <h3>Welche IT-Geräte benutzen Sie in ihrer Abteilung gemeinschaftlich?</h3>
          <v-divider />
          <br>

          <v-container>
            <!-- Multifunktionsgeräte -->
            <v-row>
              <v-checkbox 
                v-model="geraeteAnzahl[0][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[0][2]"
                label="Multifunktionsgeräte z.B. Netzwerkdrucker"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
              <v-text-field
                v-model="geraeteAnzahl[1][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[0][2]"
                label="verbrauchte Toner"
                type="number"
                suffix="Toner"
              />
            </v-row>
            <!-- Drucker -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[2][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[2][2]"
                label="Laser- & Tintenstrahldrucker"
                type="number"
                suffix="Drucker"
                class="pr-5"
              />
              <v-text-field
                v-model="geraeteAnzahl[3][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[2][2]"
                label="verbrauchte Toner"
                suffix="Toner"
                type="number"
              />
            </v-row>
            <!-- Beamer -->
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[4][2]" />
              <v-text-field
                v-model="geraeteAnzahl[4][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[4][2]"
                label="Beamer"
                type="number"
                suffix="Beamer"
              />
            </v-row>
            <!-- Server -->
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[5][2]" />
              <v-text-field
                v-model="geraeteAnzahl[5][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[5][2]"
                label="interne Server"
                type="number"
                suffix="Server"
              />
            </v-row>
          </v-container>

          <!-- Papierverbrauch currently not used 
          <br>
          <h3>Wie viel Papier benutzen Sie in ihrer Abteilung?</h3>
          <v-divider></v-divider>
          <h5>Sollten Sie keine Angabe machen, werden ihre Mitarbeiter nach ihrem individuellen Papierverbrauch befragt.</h5>
          <br>

          <v-container>
            <v-row>
              <v-text-field v-model="papierverbrauch" label="Papierverbrauch" suffix="kg" type="number"></v-text-field>
            </v-row>
          </v-container> -->
          <v-row class="mt-1">
            <v-btn
              class="mr-4"
              @click="sendData()"
            >
              Absenden
            </v-btn>
            <LoadingAnimation v-if="dataRequestSent" />
          </v-row>
        </v-card>
      </v-form>
    </v-card>

    <!-- Component for showing Link for employees after sending formular data. -->
    <v-card
      v-if="dataReceived"
      class="mt-2"
      elevation="2"
      outlined
    >
      <!-- TODO replace example link -->
      <MitarbeiterLinkComponent
        :mitarbeiter-link="'www.tu-darmstadt.co2-rechner.de/dies_ist_ein_beispiellink'"
      />
    </v-card>

    <!-- Anzeigen der Berechnungsergebnisse -->
    <v-card
      elevation="2"
      class="mt-2"
      outlined
    >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Kategorie
              </th>
              <th class="text-left">
                Wert
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ "Stromemissionen" }}</td>
              <td>{{ responseData.stromEmissionen }}</td>
            </tr>
            <tr>
              <td>{{ "Wärmeemission" }}</td>
              <td>{{ responseData.waermeEmissionen }}</td>
            </tr>
            <tr>
              <td>{{ "Kälteemissionen" }}</td>
              <td>{{ responseData.kaelteEmissionen }}</td>
            </tr>
            <tr>
              <td>{{ "IT-Geräteemissionen" }}</td>
              <td>{{ responseData.itGeraeteEmissionen }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import MitarbeiterLinkComponent from "./mitarbeiterLinkComponent";
import LoadingAnimation from "./componentParts/loadingAnimation";

export default {
  components: {
    MitarbeiterLinkComponent,
    LoadingAnimation,
  },

  data: () => ({
    //Mitarbeiter
    anzahlMitarbeiter: null,

    //genutzte Gebäude
    // Format: [gebaeudeID, flaechenanteil]
    gebaeude: [[null, null]],

    //IT Geräte
    /* Geraet an Array Position format [intern Geraete ID, Anzahl, enabled]
     * [0] Multigeraete
     * [1] MultigeraetToner
     * [2] Laserdrucker
     * [3] LaserdruckerToner
     * [4] beamer
     * [5] server
     */
    geraeteAnzahl: [
      [7, null, false],
      [8, null, false],
      [9, null, false],
      [10, null, false],
      [4, null, false],
      [6, null, false],
    ],

    //Papiernutzung currently not used
    //papierverbrauch: null

    //Rules for input validation

    geraeteRules: [
      v => !!v || "Wenn Sie das Gerät nicht benutzten, wählen Sie es bitte ab",
      v => (parseInt(v) != 0) || "Wenn Sie das Gerät nicht benutzten, wählen Sie es bitte ab",
      v => (parseInt(v) > 0) || "Bitte geben Sie eine valide Menge an"
    ],
    nichtnegativRules: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) >= 0) || "Bitte geben Sie einen positiven Wert an"
    ],
    absolutpositivRules: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) > 0) || "Bitte geben Sie einen Wert größer Null an"
    ],
    
    // has Absenden Button been clicked
    dataRequestSent: false,
    dataReceived: false,
    responseData: {},
  }),
  methods: {
    /**
     * Prints all variables to the console
     */
    logging: function() {
      console.log("Mitarbeiter:", this.anzahlMitarbeiter, "\n Gebäude:", this.gebaeude, "\n geraeteAnzahl:", this.geraeteAnzahl);
    },

    /**
     * Adds a new Gebäude to the array, so that it can be selected
     */
    newGebaeude: function() {
      this.gebaeude.push([
        null, null
      ])
    },

    /**
     * Removes the Gebäude at position index so that it won't show
     */
    removeGebaeude: function(index) {
      if(index >= 0 && this.gebaeude.length > index) {
        this.gebaeude.splice(index, 1)
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if(this.gebaeude.length === 0) {
          this.newGebaeude()
        }
      }
      else {
        console.error("Negative or out of bounds array index supplied")
      }
    },

    /**
     * Returns an array of the Geräte data as specified in the API Documentation
     * If negative amounts of a certain Gerät is supplied it is ignored
     *  [{
     *    idITGeraete: Integer
     *    anzahl: Integer
     *  }]
     */
    itGeraeteJSON: function () {
      //Build IT Geräte Array of non-null gerate
      var usedITGeraete = [];
      //Special case were we set the Toner enabled value to the matchig geraete value
      this.geraeteAnzahl[1][2] = this.geraeteAnzahl[0][2];
      this.geraeteAnzahl[3][2] = this.geraeteAnzahl[2][2];

      for (var geraet of this.geraeteAnzahl) {
        if(geraet[1] > 0 && geraet[2]) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1]),
          });
        }
      }
      return usedITGeraete;
    },

    /**
     * Returns an array of the Gebäude data as specified in the API Documentation
     * [{
     *   gebaeudeNr: Integer
     *   flaechenanteil: Integer
     * }]
     */
    gebaeudeJSON: function() {
      var gebaeudeJSON = []

      for (var objekt of this.gebaeude) {
        gebaeudeJSON.push({
          gebaeudeNr: parseInt(objekt[0]),
          flaechenanteil: parseInt(objekt[1])
        })
      }
      return gebaeudeJSON
    },
    
    sendData: async function () {

      await fetch("http://localhost:9000/umfrage/hauptverantwortlicher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gebaeude: this.gebaeudeJSON(),
          anzahlMitarbeiter: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.responseData = data
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.dataRequestSent = false;
      this.dataReceived = true;
    },
  },
};
</script>

<!-- Removes the buttons in textfields to increase decrease number -->
<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>