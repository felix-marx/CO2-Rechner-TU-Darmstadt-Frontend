<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <v-form lazy-validation>
        <v-card class="pa-7">
          <!-- Bilanzierungsjahr -->

          <br>
          <h3>
            Auf welches Bilanzierungsjahr beziehen Sie sich in dieser Umfrage?
          </h3>
          <v-divider />
          <br>

          <v-row>
            <v-col cols="5">
              <v-autocomplete
                v-model="bilanzierungsjahr"
                :items="possibleYears"
                label="Bilanzierungsjahr"
                prepend-icon="mdi-calendar-question"
                class="pr-5"
              />
            </v-col>
          </v-row>

          <!-- Mitarbeitende in Abteilung -->

          <br>
          <h3>Wie viele Mitarbeitende gibt es in Ihrer Abteilung?</h3>
          <v-divider />
          <br>

          <v-container>
            <v-row>
              <v-text-field
                v-model="anzahlMitarbeiter"
                :rules="absolutpositivRules"
                :min="0"
                label="Mitarbeitendenzahl"
                type="number"
                prepend-icon="mdi-account"
              />
            </v-row>
          </v-container>

          <!-- Genutzte Gebäude -->

          <br>
          <h3>
            Welche Gebäude nutzt Ihre Abteilung?
            <Tooltip
              tooltip-text="Alle Gebäude beginnen je nach Standort mit den Buchstaben S, B, L,
              H oder W. Die Autovervollständigung sollte Ihnen dabei helfen."
            />
          </h3>

          <v-divider />
          <br>

          <div
            v-for="(objekt, index) in gebaeude"
            :key="index"
          >
            <v-row>
              <v-col cols="5">
                <v-autocomplete
                  v-if="gebaeudeIDs"
                  v-model="objekt[0]"
                  :items="gebaeudeIDs"
                  label="Gebäudenummer"
                  prepend-icon="mdi-domain"
                  class="pr-5"
                />
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="objekt[1]"
                  :rules="absolutpositivRules"
                  :min="0"
                  label="Nutzfläche"
                  prepend-icon="mdi-domain"
                  type="number"
                  suffix="qm"
                />
              </v-col>
              <v-col>
                <v-btn
                  class="add_text--text"
                  color="add"
                  @click="newGebaeude()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="delete_text--text"
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
          <h3>
            Welche IT-Geräte benutzen Sie in Ihrer Abteilung gemeinschaftlich?
          </h3>
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
                :min="0"
                label="Multifunktionsgeräte z.B. Netzwerkdrucker"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
              <v-text-field
                v-model="geraeteAnzahl[1][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[0][2]"
                :min="0"
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
                :min="0"
                label="Laser- & Tintenstrahldrucker"
                type="number"
                suffix="Drucker"
                class="pr-5"
              />
              <v-text-field
                v-model="geraeteAnzahl[3][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[2][2]"
                :min="0"
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
                :min="0"
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
                :min="0"
                label="interne Server"
                type="number"
                suffix="Server"
              />
            </v-row>
          </v-container>

          <!-- Papierverbrauch currently not used 
          <br>
          <h3>Wie viel Papier benutzen Sie in Ihrer Abteilung?</h3>
          <v-divider></v-divider>
          <h5>Sollten Sie keine Angabe machen, werden Ihre Mitarbeiter nach Ihrem individuellen Papierverbrauch befragt.</h5>
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
      v-if="displaySurveyLink"
      class="mt-2"
      elevation="2"
      outlined
    >
      <!-- TODO replace example link -->
      <MitarbeiterLinkComponent
        :mitarbeiter-link="'www.tu-darmstadt.co2-rechner.de/survey/'+ responseData.umfrageID"
      />
    </v-card>
  </v-container>
</template>

<script>
import Cookies from '../Cookie'
import Tooltip from "@/components/componentParts/tooltip.vue";
import MitarbeiterLinkComponent from "./mitarbeiterLinkComponent";
import LoadingAnimation from "./componentParts/loadingAnimation";

export default {
  components: {
    MitarbeiterLinkComponent,
    LoadingAnimation,
    Tooltip,
},

  data: () => ({
    // Bilanzierungsjahr
    bilanzierungsjahr: null,

    //Mitarbeiter
    anzahlMitarbeiter: null,

    // genutzte Gebäude
    // Format: [gebaeudeID, flaechenanteil]
    gebaeude: [[null, null]],

    // mögliche gebäudeIDs
    gebaeudeIDs: [],

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
      (v) =>
        !!v || "Wenn Sie das Gerät nicht benutzen, wählen Sie es bitte ab.",
      (v) =>
        parseInt(v) != 0 ||
        "Wenn Sie das Gerät nicht benutzen, wählen Sie es bitte ab.",
      (v) => parseInt(v) > 0 || "Bitte geben Sie eine valide Menge an.",
    ],
    nichtnegativRules: [
      (v) => !!v || "Muss angegeben werden.",
      (v) => parseInt(v) >= 0 || "Bitte geben Sie einen positiven Wert an.",
    ],
    absolutpositivRules: [
      (v) => !!v || "Muss angegeben werden.",
      (v) => parseInt(v) > 0 || "Bitte geben Sie einen Wert größer Null an.",
    ],

    // has Absenden Button been clicked
    dataRequestSent: false,
    responseData: null,
  }),
  computed: {
    /**
     * Returns a list beginning with the current year until 2018.
     */
    possibleYears: function() {
      const beginningYear = 2018;
      let currentYear = new Date().getFullYear();
      return Array.from(new Array(currentYear - beginningYear + 1), (x, i) => i + beginningYear).reverse();
    },

    /**
     * True, if a valid survey link was received and should be shown. False otherwise.
     */
    displaySurveyLink: function() {
      return this.responseData && this.responseData.umfrageID !== "";
    }
  },

  created() {
    // get all possible gebaeude IDs on creation of the component
      this.fetchGebaeudeData();
  },

  methods: {
    /**
     * Prints all variables to the console
     */
    logging: function () {
      console.log(
        "Mitarbeiter:",
        this.anzahlMitarbeiter,
        "\n Gebäude:",
        this.gebaeude,
        "\n geraeteAnzahl:",
        this.geraeteAnzahl
      );
    },

    /**
     * Adds a new Gebäude to the array, so that it can be selected
     */
    newGebaeude: function () {
      this.gebaeude.push([null, null]);
    },

    /**
     * Removes the Gebäude at position index so that it won't show
     */
    removeGebaeude: function (index) {
      if (index >= 0 && this.gebaeude.length > index) {
        this.gebaeude.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.gebaeude.length === 0) {
          this.newGebaeude();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
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
        if (geraet[1] > 0 && geraet[2]) {
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
    gebaeudeJSON: function () {
      var gebaeudeJSON = [];

      for (var objekt of this.gebaeude) {
        gebaeudeJSON.push({
          gebaeudeNr: parseInt(translateGebaeudeIDToNumeric(objekt[0])),
          nutzflaeche: parseInt(objekt[1]),
        });
      }
      return gebaeudeJSON;
    },

    /**
     * Sends all formular data to the server.
     */
    sendData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/insertUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jahr: parseInt(this.bilanzierungsjahr),
          gebaeude: this.gebaeudeJSON(),
          mitarbeiteranzahl: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON(),
          hauptverantwortlicher: {
            username: Cookies.getCookieAttribut("email"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          }
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.responseData = data.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.dataRequestSent = false;
    },

    /**
     * Fetches all possible gebaeudeIDs from the server to display in the dropdown menu of the formular.
     */
    fetchGebaeudeData: async function () {
      await fetch("http://localhost:9000/umfrage/gebaeude")
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.gebaeudeIDs = data.data.gebaeude.map(gebInt => translateGebaeudeIDToSymbolic(gebInt));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};

/**
 * Translates a given gebaeudeID to its numerical equivalent.
 * E.g. S101 is translated to 1101, L312 to 3312 and so on.
 */
function translateGebaeudeIDToNumeric(gebaeudeID) {
  if(!gebaeudeID) return null;

  let gebaeudeDict = {
    "S": 1,
    "B": 2,
    "L": 3,
    "H": 4,
    "W": 5,
  };
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return parseInt(translatedID);
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
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return translatedID;
}
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