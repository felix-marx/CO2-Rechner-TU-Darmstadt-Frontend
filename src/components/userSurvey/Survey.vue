<template>
  <v-container>
    <!-- Umfrage Card -->
    <v-card
      elevation="2"
      outlined
    > 
      <!-- Introduction Text -->
      <v-card class="pa-7">
        <p>
          Sehr geehrte Teilnehmer*Innen,
        </p><p>
          in diesem CO<sub>2</sub>-Rechner werden Daten zur Berechnung von CO<sub>2</sub>-Emissionen erfragt, die im Zusammenhang mit der Arbeit der Mitarbeitenden Ihrer TU-Einheit entstehen. Der Rechner besteht aus zwei Teilen: einem allgemeinen Teil, der zentral für alle Mitarbeitende der Einheit ausgefüllt wird und einen zweiten Teil, den alle Mitarbeitenden Ihrer TU-Einheit in einer Umfrage ausfüllen.
        </p>
        <p>
          Die gesamte Berechnung bezieht sich immer auf ein vollständig abgeschlossenes Kalenderjahr.
        </p>
        <p>Der erste Teil des CO<sub>2</sub>-Rechner erfragt allgemeine Angaben über Ihre TU-Einheit, wie beispielsweise Anzahl der Mitarbeitenden, Standort Ihrer Einheit und gemeinschaftlich genutzte IT-Geräte. Sollten Sie keine genauen Angaben kennen, geben Sie bitte eine grobe Schätzung an. Wenn Sie diesen ersten Teil beantwortet haben, klicken Sie auf "<i>Speichern &amp; Link generieren</i>". Dadurch wird ein Link generiert, der zu der Umfrage für die Mitarbeitenden führt. Schicken Sie diesen Link an alle Mitarbeitende Ihrer TU-Einheit. Eine Mailvorlage finden Sie unter dem Link.</p>
        <p>Hinter einigen Fragen befindet sich ein Fragezeichensymbol, dort finden Sie zusätzliche Hinweise und Informationen, die zur Beantwortung der Frage hilfreich sind.  </p>
        <p>Falls Sie zu einem späteren Zeitpunkt nochmals Angaben ändern oder vervollständigen möchten, können Sie in der linken oberen Ecke „<i>Umfragenübersicht</i>“ auswählen, um auf den ersten Teil des CO<sub>2</sub>-Rechners wieder zuzugreifen. Bitte klicken Sie am Ende auf „<i>Speichern</i>“ um ihre Änderungen final einzutragen. </p>
        <p>
          Bei weiteren Nachfragen oder Anmerkungen wenden Sie sich gerne an <a
            href="mailto:co2-rechner@zv.tu-darmstadt.de"
          >co2-rechner@zv.tu-darmstadt.de</a>.
        </p>
        <p>Vielen Dank, dass Sie den CO<sub>2</sub>-Rechner verwenden und so einen Beitrag zur Nachhaltigkeit an der TU Darmstadt leisten. </p>
      </v-card>

      <v-card class="pa-7 mt-2">
        <!-- Umfrage -->
        <v-form lazy-validation>
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
                v-model="bezeichnung"
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
          <h3>Auf welches Bilanzierungsjahr beziehen Sie sich in dieser Umfrage?</h3>
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
                v-model="anzahlMitarbeiter"
                :rules="absolutpositivRules"
                :min="0"
                label="Mitarbeitendenzahl"
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
            >Lageplan</a>)?
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
                  suffix="qm"
                  :disabled="blockInput"
                />
              </v-col>
              <v-col>
                <v-btn
                  class="add_text--text"
                  color="add"
                  :disabled="blockInput"
                  @click="newGebaeude()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="delete_text--text"
                  color="delete"
                  :disabled="blockInput"
                  @click="removeGebaeude(index)"
                >
                  Löschen
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-alert
            v-if="duplicateBuilding"
            type="warning"
            dense
          >
            Sie haben mehrmals das selbe Gebäude ausgewählt.
          </v-alert>

          <v-alert
            v-if="dataGap"
            class="mt-3 mb-0"
            type="info"
            text
            dense
            style="white-space: pre-wrap"
          >
            {{ dataGapWarningMessage }}
          </v-alert>


          <!-- Umfrage für IT Geräte: Multifunktionsgeräte + Toner, Drucker + Toner, Beamer, Server -->

          <br>
          <h3>Welche und wie viele IT-Geräte benutzen Sie in Ihrer Abteilung gemeinschaftlich in allen Gebäuden zusammen?</h3>
          <v-divider />
          <br>

          <v-container>
            <!-- Multifunktionsgeräte -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[0][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="geraeteAnzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[0][2] || blockInput"
                :min="0"
                label="Multifunktionsgeräte z.B. Netzwerkdrucker"
                class="pr-5"
                suffix="Gerät/e"
              />
              <v-text-field
                v-model="geraeteAnzahl[1][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[0][2] || blockInput"
                :min="0"
                label="verbrauchte Toner"
                suffix="Toner"
              />
            </v-row>
            <!-- Drucker -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[2][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="geraeteAnzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[2][2] || blockInput"
                :min="0"
                label="Laser- &amp; Tintenstrahldrucker"
                suffix="Drucker"
                class="pr-5"
              />
              <v-text-field
                v-model="geraeteAnzahl[3][1]"
                :rules="nichtnegativRules"
                :disabled="!geraeteAnzahl[2][2] || blockInput"
                :min="0"
                label="verbrauchte Toner"
                suffix="Toner"
              />
            </v-row>
            <!-- Beamer -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[4][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="geraeteAnzahl[4][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[4][2] || blockInput"
                :min="0"
                label="Beamer"
                suffix="Beamer"
              />
            </v-row>
            <!-- Server -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[5][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="geraeteAnzahl[5][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[5][2] || blockInput"
                :min="0"
                label="interne Server"
                suffix="Server"
              />
            </v-row>
          </v-container>
          <v-row class="mt-1 text-center">
            <v-dialog
              v-model="errorDialog"
              transition="dialog-bottom-transition"
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4"
                  color="primary"
                  :disabled="blockInput"
                  v-bind="attrs"
                  v-on="on"
                  @click="problemeInUmfrage()"
                >
                  Speichern &amp; Link generieren
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
                    Möchten Sie ihre Umfrage wirklich speichern?<br>
                    Sie können sie anschließend noch weiter in der Umfragenübersicht bearbeiten, auswerten und mit Mitarbeitenden teilen.
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
                    @click="sendData(), errorDialog = false"
                  >
                    {{ (errorTextArray.nonRequired.length == 0) ? "Umfrage speichern" : "Umfrage trotzdem speichern" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Ende des Absende Dialogs -->
            <v-btn
              v-if="displaySurveyLink"
              class="mr-4"
              color="primary"
              @click="resetPage()"
            >
              Weitere Umfrage erstellen
            </v-btn>
            <LoadingAnimation v-if="dataRequestSent" />
          </v-row>
        </v-form>
      </v-card>
    </v-card>

    <!-- Component for showing Link for employees after sending formular data. -->
    <v-card
      v-if="displaySurveyLink || displayLoadingAnimation"
      class="mt-2"
      elevation="2"
      outlined
    >
      <LoadingAnimation v-if="displayLoadingAnimation" />
      <LinkSharingComponent
        v-if="displaySurveyLink"
        :mitarbeiter-link="mitarbeiterumfrageBaseURL + responseData.umfrageID"
        :link-ziel="'Umfrage'"
      />
    </v-card>

    <MailTemplate
      v-if="displaySurveyLink"
      :umfrage-jahr="String(bilanzierungsjahr)"
      :umfrage-link="mitarbeiterumfrageBaseURL+ responseData.umfrageID"
    />
    <v-card
      v-if="!displaySurveyLink && errorMessage"
    >
      <v-alert
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import Cookies from '../Cookie.js'
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LinkSharingComponent from "../componentParts/LinkSharingComponent";
import MailTemplate from "./MailTemplate";
import LoadingAnimation from "../componentParts/LoadingAnimation";

export default {
  components: {
    LinkSharingComponent,
    MailTemplate,
    LoadingAnimation,
    Tooltip,
  },

  data: () => ({
    // Bezeichnung
    bezeichnung: null,

    // Bilanzierungsjahr
    bilanzierungsjahr: null,

    //Mitarbeiter
    anzahlMitarbeiter: null,

    // genutzte Gebäude
    // Format: [gebaeudeID, flaechenanteil]
    gebaeude: [[null, null]],

    // mögliche gebäudeIDs
    gebaeudeIDs: [],
    gebaeudeIDsUndZaehler: [],
    zaehler: [],
    mapGebauedeZaehlerRefs: null,
    mapZaehlerWerte: null,

    //IT Geräte
    /* Geraet an Array Position format [intern Geraete ID, Anzahl, enabled]
     * [0] Multigeraete
     * [1] MultigeraetToner
     * [2] Laserdrucker
     * [3] LaserdruckerToner
     * [4] Beamer
     * [5] Server
     */
    geraeteAnzahl: [
      [7, null, false],
      [8, null, false],
      [9, null, false],
      [10, null, false],
      [4, null, false],
      [6, null, false],
    ],

    // Blockiere Inputfelder nach Absenden der Umfrage
    blockInput: false,

    // has Absenden Button been clicked
    dataRequestSent: false,
    responseData: null,
    // Dialogvariable + Array mit fehlerhaften Eingaben {fehler: "", pflicht: 0}
    errorDialog: false,
    errorTextArray: {
      required: [],
      nonRequired: []
    },

    // base url for Mitarbeiterumfragen
    mitarbeiterumfrageBaseURL: process.env.VUE_APP_URL + '/survey/',

    // Error Nachricht von Server bei Fehler
    errorMessage: null,
    
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
    displayLoadingAnimation: false,
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

    /**
     * True, if a valid survey link was received and should be shown. False otherwise.
     */
    displaySurveyLink: function () {
      return this.responseData && this.responseData.umfrageID !== "";
    },

    /**
     * Vergleicht ob das selbe Gebaeude zweimal ausgewaehlt wurde
     */
    duplicateBuilding: function() {
      for(var i = 0; i < this.gebaeude.length; i++) {
        for(var j = 0; j < i; j++) {
          if(this.gebaeude[i][0] == this.gebaeude[j][0] && this.gebaeude[i][0] != null) {
            return true
          }
        }
      }
      return false
    },

    dataGapWarningMessage: function() {
      var msg = "Datenlücken:"

      for(var i = 0; i < this.gebaeude.length; i++) {
        console.log(this.gebaeude[i])

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])

          console.log(zaehlerRefs)

          if (zaehlerRefs["kaelteRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Kältezahler"
          }
          if (zaehlerRefs["stromRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Stromzahler"
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Wärmezahler"
          }

          if (this.bilanzierungsjahr) {
            var functCheck = (zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                msg = msg + "\n " + zaehler + " von " + this.gebaeude[i][0] + " hat keine Wert für das Jahr " + this.bilanzierungsjahr
              }
            }

            zaehlerRefs["kaelteRef"].forEach(functCheck);
            zaehlerRefs["stromRef"].forEach(functCheck);
            zaehlerRefs["waermeRef"].forEach(functCheck);
          }
        }
      }

      return msg
    },

    dataGap: function(){
      return this.dataGapWarningMessage != "Datenlücken:"
    },
  },

  created() {
    // get all possible gebaeude IDs on creation of the component
    //this.fetchGebaeudeData();
    this.fetchGebaeudeUndZaehlerData();
  },

  methods: {
    /**
     * Returns an array containing a list with every required field missing
     */
    requiredFieldsMissingArray: function() {
      var fieldsarray = []
      if(this.bezeichnung == "" || this.bezeichnung == null) {
        fieldsarray.push("Bezeichnung")
      }
      if(!this.possibleYears.includes(parseInt(this.bilanzierungsjahr))) {
        fieldsarray.push("Bilanzierungsjahr")
      }
      if(this.anzahlMitarbeiter == null || this.anzahlMitarbeiter <= 0) {
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
      this.geraeteAnzahl[1][2] = this.geraeteAnzahl[0][2];
      this.geraeteAnzahl[3][2] = this.geraeteAnzahl[2][2];
      var nonRequiredArray = []
      
      // Gebaeude
      if(this.duplicateBuilding) {
        nonRequiredArray.push("Sie haben das mehrmals das selbe Gebäude ausgewählt.")
      } 
      for(const gebaeude of this.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push("Sie haben für das Gebäude " + gebaeude[0] + " keine gültige Nutzfläche angegeben.")
        }
      }
      // IT Geraete
      for(const it of this.geraeteAnzahl) {
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
     * Returns the mail of the currently logged in user.
     */
    getUserMail: function() {
      return Cookies.getCookieAttribut('username');
    },

    /**
     * Adds a new Gebäude to the array, so that it can be selected
     */
    newGebaeude: function () {
      this.gebaeude.push([null, null]);
    },

    /**
     * Setzt alle Felder auf den Default zurueck und schaltet den 
     */
    resetPage: function () {
      this.bezeichnung =  null
      this.bilanzierungsjahr = null
      this.anzahlMitarbeiter = null
      this.gebaeude = [[null, null]]
      this.geraeteAnzahl = [
        [7, null, false],
        [8, null, false],
        [9, null, false],
        [10, null, false],
        [4, null, false],
        [6, null, false],
      ]
      this.blockInput = false
      this.dataRequestSent = false
      this.responseData = null
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
     * Sends all formular data to the server.
     */
    sendData: async function () {
      // Disable Inputfields
      this.blockInput = true
      this.displayLoadingAnimation = true;
      this.errorMessage = null;

      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/insertUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bezeichnung: this.bezeichnung,
          jahr: parseInt(this.bilanzierungsjahr),
          gebaeude: this.gebaeudeJSON(),
          mitarbeiteranzahl: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON(),
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          }
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.responseData = data.data;
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.blockInput = false
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
        });

      this.displayLoadingAnimation = false;
    },

    /**
     * Fetches all possible gebaeudeIDs from the server to display in the dropdown menu of the formular.
     */
    fetchGebaeudeData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.gebaeudeIDs = data.data.gebaeude.map(gebInt => translateGebaeudeIDToSymbolic(gebInt));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * Fetches all possible gebaeudeIDs and the Zaehler References from the database.
     */
     fetchGebaeudeUndZaehlerData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeudeUndZaehler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.gebaeudeIDsUndZaehler = data.data.gebaeude
          this.zaehler = data.data.zaehler

          //console.log(data)
        
          this.gebaeudeIDs = data.data.gebaeude.map(obj => translateGebaeudeIDToSymbolic(obj.nr));

          this.mapGebauedeZaehlerRefs = new Map(
            data.data.gebaeude.map((obj) => [translateGebaeudeIDToSymbolic(obj.nr), {kaelteRef: obj.kaelteRef, stromRef: obj.stromRef, waermeRef: obj.waermeRef}])
          )
          //console.log(this.mapGebauedeZaehlerRefs)

          this.mapZaehlerWerte = new Map(
            data.data.zaehler.map((obj) => [obj.pkEnergie, new Map(obj.zaehlerdatenVorhanden.map((obj2) => [obj2.jahr, obj2.vorhanden]))])
          )
          //console.log(this.mapZaehlerWerte)
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
  if (!gebaeudeID) return null;

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
