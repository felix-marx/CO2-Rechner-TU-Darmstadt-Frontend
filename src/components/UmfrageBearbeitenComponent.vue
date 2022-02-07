<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <v-form lazy-validation>
        <v-card class="pa-7">
          <v-row class="mt-1 text-center">
            <v-btn
              class="mr-4"
              color="primary"
              @click="flipBearbeiten()"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              {{ ( blockInput ? " Bearbeiten aktivieren" : " Bearbeiten deaktivieren") }}
            </v-btn>
            
            <v-dialog
              v-model="errorDialog"
              transition="dialog-bottom-transition"
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue"
                  class="white--text"
                  :disabled="blockInput"
                  v-bind="attrs"
                  v-on="on"
                  @click="problemeInUmfrage()"
                >
                  <v-icon left>
                    mdi-content-save
                  </v-icon>
                  Änderungen speichern
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  {{ (errorTextArray.required.length != 0 || errorTextArray.nonRequired.length != 0) ? "Probleme mit Ihrer Eingabe!" : "Umfrage vollständig?" }}
                </v-toolbar>
                <v-card-text>
                  <div
                    v-if="errorTextArray.nonRequired.length != 0 || errorTextArray.required.length != 0"
                    class="pt-6"
                  >
                    <div
                      v-if="errorTextArray.required.length != 0"
                    >
                      Sie haben folgende Pflichtfelder nicht angegeben: <br>
                      <v-list
                        flat
                      >
                        <v-list-item
                          v-for="(problem, index) in errorTextArray.required"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="text-sm-body-2 delete--text font-weight-black"
                              v-text="problem"
                            />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                    <div
                      v-if="errorTextArray.nonRequired.length != 0"
                    >
                      Ihre Umfrage enthält folgende kleinere Probleme: <br>
                      <v-list
                        flat
                      >
                        <v-list-item
                          v-for="(problem, index) in errorTextArray.nonRequired"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="text-sm-body-2"
                              v-text="problem"
                            />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                  <div 
                    v-if="errorTextArray.required.length == 0 && errorTextArray.nonRequired.length == 0"
                    class="pt-6"
                  >
                    Möchten Sie ihre Änderungen wirklich speichern?
                  </div>
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="errorDialog = false"
                  >
                    Weiter bearbeiten
                  </v-btn>
                  <v-btn
                    v-if="errorTextArray.required.length == 0"
                    color="primary"
                    text
                    @click="sendEdit(), errorDialog = false"
                  >
                    {{ (errorTextArray.nonRequired.length == 0) ? "Änderungen speichern" : "Änderungen trotzdem speichern" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Ende des Absende Dialogs -->
           
            <LoadingAnimation v-if="dataRequestSent" />
          </v-row>
          
          <!-- Bezeichnung -->
          <br>
          <h3>
            Wie soll Ihre Umfrage bezeichnet werden?
          </h3>
          <v-divider />
          <br>

          <v-row>
            <v-col>
              <v-text-field
                v-model="umfrage.bezeichnung"
                :min="0"
                label="Bezeichnung"
                type="string"
                prepend-icon="mdi-form-textbox"
                :disabled="blockInput"
              />
            </v-col>
          </v-row>

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
                v-model="umfrage.jahr"
                :items="possibleYears"
                label="Bilanzierungsjahr"
                prepend-icon="mdi-calendar-question"
                class="pr-5"
                :disabled="blockInput"
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
                v-model="umfrage.mitarbeiteranzahl"
                :rules="absolutpositivRules"
                :min="0"
                label="Mitarbeitendenzahl"
                type="number"
                prepend-icon="mdi-account"
                :disabled="blockInput"
              />
            </v-row>
          </v-container>

          <!-- Genutzte Gebäude -->

          <br>
          <h3>
            Welche Gebäude nutzt Ihre Abteilung (<a
              href="https://www.tu-darmstadt.de/universitaet/campus/index.de.jsp"
              target="_blank"
            >Campus Start</a>)?
            <Tooltip
              tooltip-text="Alle Gebäude beginnen je nach Standort mit den Buchstaben S, B, L,
              H oder W. Die Autovervollständigung sollte Ihnen dabei helfen."
            />
          </h3>

          <v-divider />
          <br>

          <div
            v-for="(objekt, index) in umfrage.gebaeude"
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
                  :disabled="blockInput"
                />
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="objekt[1]"
                  :rules="absolutpositivRules"
                  :min="0"
                  label="Nutzfläche des ausgewählten Gebäudes"
                  prepend-icon="mdi-domain"
                  type="number"
                  suffix="qm"
                  :disabled="blockInput"
                />
              </v-col>
              <v-col>
                <v-btn
                  v-if="!blockInput"
                  class="add_text--text"
                  color="add"
                  @click="newGebaeude()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  v-if="!blockInput"
                  class="delete_text--text"
                  color="delete"
                  @click="removeGebaeude(index)"
                >
                  Löschen
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-row
            v-if="duplicateBuilding"
          >
            <v-alert
              type="warning"
            >
              Sie haben mehrmals das selbe Gebäude ausgewählt.
            </v-alert>
          </v-row>
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
                v-model="umfrage.geraeteanzahl[0][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[0][2] || blockInput"
                :min="0"
                label="Multifunktionsgeräte z.B. Netzwerkdrucker"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[1][1]"
                :rules="nichtnegativRules"
                :disabled="!umfrage.geraeteanzahl[0][2] || blockInput"
                :min="0"
                label="verbrauchte Toner"
                type="number"
                suffix="Toner"
              />
            </v-row>
            <!-- Drucker -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[2][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[2][2] || blockInput"
                :min="0"
                label="Laser- & Tintenstrahldrucker"
                type="number"
                suffix="Drucker"
                class="pr-5"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[3][1]"
                :rules="nichtnegativRules"
                :disabled="!umfrage.geraeteanzahl[2][2] || blockInput"
                :min="0"
                label="verbrauchte Toner"
                suffix="Toner"
                type="number"
              />
            </v-row>
            <!-- Beamer -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[4][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[4][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[4][2] || blockInput"
                :min="0"
                label="Beamer"
                type="number"
                suffix="Beamer"
              />
            </v-row>
            <!-- Server -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[5][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[5][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[5][2] || blockInput"
                :min="0"
                label="interne Server"
                type="number"
                suffix="Server"
              />
            </v-row>
          </v-container>
        </v-card>
      </v-form>
    </v-card>

    <v-card
      v-if="displaySuccess || displayLoadingAnimation || displayError"
      elevation="2"
    >
      <LoadingAnimation v-if="displayLoadingAnimation" />
      <v-alert
        v-if="displaySuccess"
        type="success"
      >
        Die Umfrage wurde erfolgreich geändert.
      </v-alert>
      <v-alert
        v-if="displayError"
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/tooltip.vue";
import LoadingAnimation from "./componentParts/loadingAnimation";
import Cookies from "../Cookie"

export default {
  name: "UmfrageBearbeitenComponent",
  
  components: {
    LoadingAnimation,
    Tooltip
  },

  props: {
    //UmfrageId
    umfrageidprop: {
      type: String,
      default: "",
    }
  },

  data: () => ({
    umfrage: {
      bezeichnung: null,
      mitarbeiteranzahl: null,
      jahr: null,
      gebaeude: [[null, null]],
      geraeteanzahl: [[7, null, false], [8, null, false], [9, null, false], [10, null, false], [4, null, false], [6, null, false]],
      umfrageID: "",
    },

    // Fehlermeldung bei Fehler mit Server
    errorMessage: null,

    // mögliche gebäudeIDs
    gebaeudeIDs: [],

    // Blockiere Inputfelder bevor bearbeiten geklickt
    blockInput: true,

    // has Absenden Button been clicked
    dataRequestSent: false,

    // for user feedback after updating survey
    displayLoadingAnimation: false,
    displayError: false,
    displaySuccess: false,

    // Dialogvariable + Array mit fehlerhaften Eingaben {fehler: "", pflicht: 0}
    errorDialog: false,
    errorTextArray: {
      required: [],
      nonRequired: []
    },

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
     * Vergleicht ob das selbe Gebaeude zweimal ausgewaehlt wurde
     */
    duplicateBuilding: function() {
      for(var i = 0; i < this.umfrage.gebaeude.length; i++) {
        for(var j = 0; j < i; j++) {
          if(this.umfrage.gebaeude[i][0] == this.umfrage.gebaeude[j][0] && this.umfrage.gebaeude[i][0] != null) {
            return true
          }
        }
      }
      return false
    }
  },

  created() {
      this.fetchGebaeudeData();
      this.umfrage.umfrageID = JSON.parse(JSON.stringify(this.umfrageidprop));
      this.fetchUmfrageData();
  },

  methods: {
    flipBearbeiten: function() {
        this.blockInput = !this.blockInput
        this.displaySuccess = false
        this.displayError = false
        this.displayLoadingAnimation = false
    },

    /**
     * Returns an array containing a list with every required field missing
     */
    requiredFieldsMissingArray: function() {
      var fieldsarray = []
      if(this.umfrage.bezeichnung == "" || this.umfrage.bezeichnung == null) {
        fieldsarray.push("Bezeichnung")
      }
      if(!this.possibleYears.includes(parseInt(this.umfrage.jahr))) {
        fieldsarray.push("Bilanzierungsjahr")
      }
      if(this.umfrage.mitarbeiteranzahl == null || this.umfrage.mitarbeiteranzahl <= 0) {
        fieldsarray.push("Anzahl Mitarbeitenden")
      }
      return fieldsarray
    },

    /**
     * Determines errors in Umfrage and writes Error message and if the field is requiered to the errorTextArray variable
     * {
     *  nonRequired: []
     *  required:    []
     * }
     */
    problemeInUmfrage: function() {
      this.umfrage.geraeteanzahl[1][2] = this.umfrage.geraeteanzahl[0][2];
      this.umfrage.geraeteanzahl[3][2] = this.umfrage.geraeteanzahl[2][2];
      var nonRequiredArray = []
      
      // Gebaeude
      if(this.duplicateBuilding) {
        nonRequiredArray.push("Sie haben das mehrmals das selbe Gebäude ausgewählt.")
      } 
      for(const gebaeude of this.umfrage.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push("Sie haben für das Gebäude " + gebaeude[0] + " keine gültige Nutzfläche angegeben.")
        }
      }
      // IT Geraete
      for(const it of this.umfrage.geraeteanzahl) {
        if(it[2] && it[1] <= 0) { 
          if((it[0] != 8 && it[0] != 10)) {
            nonRequiredArray.push("Sie haben das Gerät " + resolveITGeraetID(it[0]) + " angewählt, aber keine gültige Anzahl angegeben.")
          } else { // Toner
            nonRequiredArray.push("Sie haben einem ausgewählten Gerät keine verwendeten Toner hinzugefügt. Wenn Sie das Gerät nicht in Benutzung haben, ignorieren Sie diese Nachricht.")
          }
        }
      }
      this.errorTextArray.nonRequired = nonRequiredArray
      this.errorTextArray.required = this.requiredFieldsMissingArray()
    },

    /**
     * Adds a new Gebäude to the array, so that it can be selected
     */
    newGebaeude: function () {
      this.umfrage.gebaeude.push([null, null]);
    },

    /**
     * Removes the Gebäude at position index so that it won't show
     */
    removeGebaeude: function (index) {
      if (index >= 0 && this.umfrage.gebaeude.length > index) {
        this.umfrage.gebaeude.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.umfrage.gebaeude.length === 0) {
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
      this.umfrage.geraeteanzahl[1][2] = this.umfrage.geraeteanzahl[0][2];
      this.umfrage.geraeteanzahl[3][2] = this.umfrage.geraeteanzahl[2][2];

      for (var geraet of this.umfrage.geraeteanzahl) {
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

      for (var objekt of this.umfrage.gebaeude) {
        if (!!objekt[0] && !!objekt[1]) {
          gebaeudeJSON.push({
            gebaeudeNr: parseInt(translateGebaeudeIDToNumeric(objekt[0])),
            nutzflaeche: parseInt(objekt[1]),
          });
        }
      }
      return gebaeudeJSON;
    },

    /**
     * sendEdit sendet eine POST Request ans Backend, wodurch die Werte der Umfrage mit ID umfrageID aktualisiert werden
     */
    sendEdit: async function () {
      this.displayLoadingAnimation = true
      this.blockInput = true

      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/updateUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          },
          umfrageID: this.umfrage.umfrageID,
          bezeichnung: this.umfrage.bezeichnung,
          jahr: parseInt(this.umfrage.jahr),
          gebaeude: this.gebaeudeJSON(),
          mitarbeiteranzahl: parseInt(this.umfrage.mitarbeiteranzahl),
          itGeraete: this.itGeraeteJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if(data.status == "success") {
            this.displaySuccess = true
            this.displayLoadingAnimation = false
          }
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.displayError = true
            this.displayLoadingAnimation = false
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
        });
      this.dataRequestSent = false;
    },

    /**
     * fetchGebaeudeData sendet eine POST Request ans Backend welche alle gespeicherten Gebaeude fetched.
     */
    fetchGebaeudeData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeude",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          }
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.gebaeudeIDs = data.data.gebaeude.map(gebInt => translateGebaeudeIDToSymbolic(gebInt));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * fetchUmfrageData sendet eine POST Request ans Backend. 
     * Liefert die aktuell in der Datenbank liegenden Umfragewerte der Umfrage mit ID umfrageID zurueck.
     */
    fetchUmfrageData: async function() {
       await fetch(process.env.VUE_APP_BASEURL + "/umfrage/getUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          },
          umfrageID: this.umfrage.umfrageID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if(data.status == "error") {
            this.errorMessage = data.error.message
          }
          else {
            // Bezeichner
            this.umfrage.bezeichnung = data.data.bezeichnung
            // Mitarbeiter
            this.umfrage.mitarbeiteranzahl = data.data.mitarbeiteranzahl
            // Bilanzjahr
            this.umfrage.jahr =  data.data.jahr
            // Gebaeude
            this.umfrage.gebaeude = this.parseGebaeude(data.data.gebaeude)
            if(this.umfrage.gebaeude.length == 0) {
              this.umfrage.gebaeude = [[null, null]]
            }
            // IT Geraete
            this.umfrage.geraeteanzahl = this.parseITGeraete(data.data.itGeraete)
          }
          
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
        });
    },

    /**
     * parseGebaeude uebersetzt die numerische Gebaeudekennung (1101) in symbolische (S101) fuer alle Gebaeude in umfrage.gebaeude 
     */
    parseGebaeude: function(gebaeude) {
      this.umfrage.gebaeude = []
      for(var i = 0; i < gebaeude.length; i++) {
        this.umfrage.gebaeude.push([translateGebaeudeIDToSymbolic(gebaeude[i].gebaeudeNr), gebaeude[i].nutzflaeche]);
      }
      return this.umfrage.gebaeude
    },

    /**
     * parseITGeraete traegt die IT Geraete aus itGeraete in das Array geraeteanzahl an den korrekten Stellen ein.
     */
    parseITGeraete: function(itGeraete) {
    var map = new Map([[7,0], [8,1], [9,2], [10,3], [4,4], [6,5]])
    this.geraeteanzahl = [[7, null, false], [8, null, false], [9, null, false], [10, null, false], [4, null, false], [6, null, false]]
    for(var i = 0; i < itGeraete.length; i++) {
      var index = map.get(itGeraete[i].idITGeraete)
      this.geraeteanzahl[index] = [itGeraete[i].idITGeraete, itGeraete[i].anzahl, true]
    }
    return this.geraeteanzahl
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

function resolveITGeraetID(geraetID) {
  let ITGeraetIDDict = {
    7: "Multifunktionsgeräte",
    8: "Multifunktionsgeräte Toner",
    9: "Laser & Tintenstrahldrucker",
    10: "Laser & Tintenstrahldrucker Toner",
    4: "Beamer",
    6: "interne Server"
  };
  return ITGeraetIDDict[geraetID]
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