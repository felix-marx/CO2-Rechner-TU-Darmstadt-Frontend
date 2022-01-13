<template>
  <v-container>
    <!-- Umfrage Card -->
    <v-card
      elevation="2"
      outlined
    > 
      <!-- Introduction Text -->
      <v-card class="pa-7">
    
        <!-- Umfrage -->
        <v-form lazy-validation>
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
          <v-row>
                <!-- TODO replace example link -->
    
          </v-row>
        </v-form>
        <br>
        <v-divider />
        <v-row justify='end'>
          <v-col>
            <br>
            <LoadingAnimation v-if="saveRequestSent" />
            <v-alert
              v-if="showSaveWarning && !saveRequestSent"
              dense
              outlined
              text
              type="warning"
            >
              Vergessen Sie nicht, Ihre Änderungen zu speichern!
            </v-alert>
            <v-alert
              v-if="showSaveSuccessful && !saveRequestSent"
              dense
              outlined
              text
              type="success"
            >
              Änderungen erfolgreich gespeichert.
            </v-alert>
            <v-alert
              v-if="showSaveFailed && !saveRequestSent"
              dense
              outlined
              text
              type="error"
            >
              Änderungen konnten nicht übernommen werden. Falls das Problem weiterhin besteht, kontaktieren Sie bitte ihren Systemadministrator.
            </v-alert>
          </v-col>
          <v-col cols=2>
            <br>
            <v-btn
                class="delete_text--text"
                color="delete"
                @click="saveButtonClicked()"
              >
              Änderungen speichern
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>

    <v-card
      elevation="2"
      outlined
    > 

    <MitarbeiterLinkComponent
      :mitarbeiter-link="mitarbeiterLink"
    />
    </v-card>

    <!-- Component for showing Link for employees after sending formular data. -->

    <MailvorlageComponent
      :umfrage-jahr="String(bilanzierungsjahr)"
      :umfrage-link="'www.tu-darmstadt.co2-rechner.de/survey/'+ umfrageID"
      :user-mail="getUserMail()"
    />
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/tooltip.vue";
import MailvorlageComponent from "./MailvorlageComponent";
import LoadingAnimation from "./componentParts/loadingAnimation";
import MitarbeiterLinkComponent from "./mitarbeiterLinkComponent"
import Cookies from '../Cookie'

export default {
  name: "UmfrageBearbeitenComponent",
  
  components: {
    MailvorlageComponent,
    MitarbeiterLinkComponent,
    LoadingAnimation,
    Tooltip
  },

  props: {
    umfrageProp: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    // umfrage data
    umfrageID: null,
    mitarbeiterLink: null,

    geraeteAnzahl: null,
    gebaeude: null,
    bilanzierungsjahr: null,
    anzahlMitarbeiter: null,

    // display of alerts
    showSaveWarning: true,
    showSaveSuccessful: false,
    showSaveFailed: false,
    saveRequestSent: false,

    // mögliche gebäudeIDs
    gebaeudeIDs: [],

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
      this.parseUmfrageDataForDisplay();
      this.fetchGebaeudeData();
  },

  methods: {

    saveButtonClicked: function() {
      this.saveRequestSent = true;
      this.sendData();
    },

    /**
     * Returns the mail of the currently logged in user.
     */
    getUserMail: function() {
      return Cookies.getCookieAttribut('email');
    },

    /**
     * Prints all variables to the console
     */
    logging: function () {
      console.log(
        "Mitarbeiter:",
        this.umfrageProp.mitarbeiteranzahl,
        "\n Gebäude:",
        this.umfrageProp.gebaeude,
        "\n itGeraete:",
        this.umfrageProp.itGeraete
      );
    },

    /**
     * Parses all data to be in line with reusing the code from umfrage.vue for display.
     */
    parseUmfrageDataForDisplay: function() {
      this.umfrageID = this.umfrageProp._id;
      this.mitarbeiterLink = 'www.tu-darmstadt.co2-rechner.de/survey/' + this.umfrageID;
      this.anzahlMitarbeiter = this.umfrageProp.mitarbeiteranzahl;
      this.bilanzierungsjahr = this.umfrageProp.jahr;
      this.gebaeude = [[null, null]];
      this.geraeteAnzahl = [
          [7, null, false],     // Multifunktionsgeraete
          [8, null, false],   // Multifuntionstoner
          [9, null, false],   // Tintenstrahldrucker
          [10, null, false],  // Tintenstrahltoner
          [4, null, false],   // Beamer
          [6, null, false],   // Server
      ];


      for(let i = 0; i < this.umfrageProp.gebaeude.length; i++){
        // extend array if there is more than the one default (null)-element
        if (i > 0) {
          this.newGebaeude();
        }

        // set gebaeude entry
        let gebID = translateGebaeudeIDToSymbolic(this.umfrageProp.gebaeude[i].gebaeudeNr);
        let flaeche = String(this.umfrageProp.gebaeude[i].nutzflaeche);
        let gebEntry = [gebID, flaeche];

        this.gebaeude[i] = gebEntry;     
      }

      // IT geraete
      for(let i = 0; i < this.umfrageProp.itGeraete.length; i++){
        let geraet = this.umfrageProp.itGeraete[i];
        switch (geraet.idITGeraete) {
          case 4:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[4][1] = geraet.anzahl;
              this.geraeteAnzahl[4][2] = true;
            }
          break;
          case 6:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[5][1] = geraet.anzahl;
              this.geraeteAnzahl[5][2] = true;
            }
          break;
          case 7:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[0][1] = geraet.anzahl;
              this.geraeteAnzahl[0][2] = true;
            }
          break;
          case 8:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[1][1] = geraet.anzahl;
              this.geraeteAnzahl[1][2] = true;
            }
          break;
          case 9:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[2][1] = geraet.anzahl;
              this.geraeteAnzahl[2][2] = true;
              
            }
          break;
          case 10:
            if (geraet.anzahl > 0) {
              this.geraeteAnzahl[3][1] = geraet.anzahl;
              this.geraeteAnzahl[3][2] = true;
            }
        }
      }
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
        if ((objekt[0] !== null) && (objekt[1] !== null)){
          gebaeudeJSON.push({
            gebaeudeNr: parseInt(translateGebaeudeIDToNumeric(objekt[0])),
            nutzflaeche: parseInt(objekt[1]),
          });
        }
      }
      return gebaeudeJSON;
    },

    /**
     * Sends an update request to the server
     */
    sendData: async function () {
      this.saveRequestSent = true;
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/updateUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: this.umfrageID,
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
          this.saveRequestSent = false;
          if(data.status === "success"){
            console.log("Success:", data);
            this.responseData = data.data;
            this.showSaveWarning = false;
            this.showSaveFailed = false;
            this.showSaveSuccessful = true;
          } else {
            console.error("Error:", data.error);
            this.showSaveWarning = false;
            this.showSaveSuccessful = false;
            this.showSaveFailed = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.showSaveWarning = false;
          this.showSaveSuccessful = false;
          this.showSaveFailed = true;
        });
    },

    fetchGebaeudeData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeude")
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.gebaeudeIDs = data.data.gebaeude.map(gebInt => translateGebaeudeIDToSymbolic(gebInt));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    getPropYear() {
      if(this.bilanzierungsjahrprop != null){
        return this.bilanzierungsjahrprop;
      } else{
        return 2020;
      }
    }
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