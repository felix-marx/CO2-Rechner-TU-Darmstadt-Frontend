<template>
  <v-container>
    <v-card
      class="mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title class="mx-2">
        Gespeicherte Umfragen:
      </v-card-title>

      <v-row
        align="baseline" 
        class="mx-2"
      >
        <v-col
          cols="2"
          align="center"
        >
          Sortieren nach:
        </v-col>
        <v-col cols="5">
          <v-select
            v-model="sortingOptionSelected"
            item-text="name"
            item-value="key"
            :items="sortingOptions"
            label="Sortierkriterium"
            solo
            @input="sortUmfragen"
          />
        </v-col>
        <v-col cols="5">
          <v-select
            v-model="sortingOrderSelected"
            item-text="name"
            item-value="key"
            :items="sortingOrders"
            label="Reihenfolge"
            solo
            @input="sortUmfragen"
          />
        </v-col>
      </v-row>

      <!-- Die erstellte Umfrage soll eine Karte erhalten. -->
      <v-card
        v-for="(umfrage, index) in umfragen"
        :key="'umfrage_'+index"
        elevation="2"
        outlined
        class="pb-2"
      >
        <v-list-item
          three-line
        >
          <v-list-item-content>
            <div class="text-overline mb-1">
              Bilanzierungsjahr {{ umfrage.jahr }}
            </div> 
            <v-list-item-title class="text-h5 mb-4">
              {{ umfrage.bezeichnung }}
            </v-list-item-title>
            <v-row>
              <v-col
                cols="7"
              >
                <CopyButton
                  :button-text="'Link zur Umfrage kopieren'"
                  :text-to-copy="mitarbeiterumfrageBaseURL + umfrage._id"
                />
              </v-col>
              <v-col 
                cols=""
                class="text-right"
                align-self="center"
              >
                <div>
                  <b>{{ umfrage.mitarbeiterUmfrageRef.length }}/{{ umfrage.mitarbeiteranzahl }} </b> Mitarbeitende haben ausgefüllt
                </div>
              </v-col>
              <v-col
                cols="1"
                align-self="center"
              >
                <v-progress-circular 
                  :color=" umfrage.mitarbeiterUmfrageRef.length == umfrage.mitarbeiteranzahl ? 'primary' : 'grey'"
                  :value="100*(umfrage.mitarbeiterUmfrageRef.length / umfrage.mitarbeiteranzahl)"
                  :size="35"
                />
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <!-- Die erstellte Umfrage soll bearbeitet und ausgewählt werden können. -->
        <v-card-actions>
          <v-dialog
            v-model="dialog[index]"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                color="primary"
                rounded
                v-bind="attrs"
                v-on="on"
              >
                <v-icon 
                  left 
                >
                  mdi-clipboard-edit
                </v-icon>
                <span>anzeigen</span>
              </v-btn>
            </template>
            <v-card>
              <v-toolbar
                dark
                color="primary"
              >
                <v-btn
                  icon
                  dark
                  @click="closeDialog(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Umfrage</v-toolbar-title>
              </v-toolbar>
              <!-- Hier kommt der Inhalt der Umfrage hin -->
              <v-card
                v-if="dialog[index]"
              >
                <EditSurvey 
                  :umfrageidprop="umfrage._id"
                />
              </v-card>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogAuswertung[index]"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                color="primary"
                rounded
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  mdi-chart-bar
                </v-icon>
                Auswertung
              </v-btn>
            </template>
            <v-card>
              <v-toolbar
                dark
                color="primary"
              >
                <v-btn
                  icon
                  dark
                  @click="closeDialogAuswertung(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Auswertung</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card
                v-if="dialogAuswertung[index]"
              >
                <Nutzerauswertung
                  :umfrageid="umfrage._id"
                  :shared="true"
                />
              </v-card>
            </v-card>
          </v-dialog>
        
          <v-spacer />

          <!-- Mit diesem Button sollen ausgewählte Umfragen dupliziert werden können. -->
          <v-btn
            class="mx-2"
            outlined
            text
            color="primary"
            @click="duplicateSurvey(index, umfrage._id)"
          >
            <v-icon class="mr-1">
              mdi-content-copy
            </v-icon>
            Duplizieren
          </v-btn>

          <v-dialog
            v-model="deleteSurvey[index]"
            transition="dialog-bottom-transition"
            :max-width="constants.v_dialog_max_width"
          >
            <template v-slot:activator="{ on, attrs }">
              <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
              <v-btn
                class="mx-2 pl-1"
                outlined
                text
                color="delete"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete-outline</v-icon>
                Löschen
              </v-btn>
            </template>

            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                Löschen der Umfrage
              </v-toolbar>
              <v-card-text>
                <div class="pt-6">
                  Sind Sie sicher, dass Sie die Umfrage {{ umfrage.bezeichnung }} löschen möchten?
                  Diese Aktion kann nicht zurückgenommen werden.
                </div>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="removeSurvey(index, umfrage._id)"
                >
                  Ich bestätige
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>

        <v-alert
          v-show="errors[index]"
          type="error"
        >
          {{ message }}
        </v-alert>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import EditSurvey from "../userSurveyManagement/EditSurvey.vue";
import Nutzerauswertung from "../evaluation/SurveyEvaluation.vue";
import CopyButton from '../componentParts/CopyButton.vue';
import constants from "../../const.js";

export default {
  components: {
    EditSurvey,
    Nutzerauswertung,
    CopyButton
  },

  data: () => ({
    constants: constants,
    umfragen: [],
    deleteSurvey: [],
    dialog: [], 
    dialogAuswertung: [], 
    errors: [],
    message: "",

    notifications: false,
    sound: true,
    widgets: true,
    anteilMitarbeiterUmfrage: 40,

    displayLoadingAnimation: false,

    // sorting variables
    sortingOptionSelected: "jahr",
    sortingOrderSelected: "descending",
    sortingOptions: [
      {
        name: "Jahr",
        key: "jahr"},
      {
        name: "Bezeichnung",
        key: "bezeichnung",
      }
    ],
    sortingOrders: [
      {
        name: "absteigend",
        key: "descending",
      },
      {
        name: "aufsteigend",
        key: "ascending",
      }
    ],

    // base url for Mitarbeiterumfragen
    mitarbeiterumfrageBaseURL: process.env.VUE_APP_URL + '/survey/'
  }),

  created() {
    this.displayLoadingAnimation = true;
    this.fetchUmfragen().then(() => 
    this.sortUmfragen());
    this.displayLoadingAnimation = false;
  },

  methods: {
    /**
     * Sorts Umfragen by a given attribute and order
     */
    sortUmfragen() {
      if(this.umfragen.length === 0) {
        return;
      }
      this.umfragen.sort(GetSortOrder(this.sortingOptionSelected));
      if (this.sortingOrderSelected === "descending") {
        this.umfragen.reverse();
      }
    },

    /**
     * Loescht eine Umfrage nach Nutzerbestaetigung
     */
    async removeSurvey(index, umfrageID) {
      var ret = this.deleteUmfrage(index, umfrageID)
      if(ret) {
        this.umfragen.splice(index, 1)
        this.deleteSurvey.splice(index, 1)
        this.dialog.splice(index, 1)
        this.dialogAuswertung.splice(index,1)
        this.errors.splice(index, 1)
      }
      return
    },

    /**
     * Dupliziert eine Umfrage nach Nutzerbestaetigung
     */
      async duplicateSurvey(index, umfrageID) {
      await this.duplicateUmfrage(index, umfrageID)
    
      if(!this.errors[index]){
        this.fetchUmfragen()
      }

      return
    },

    /**
     * Closes v-dialog with dialog as v-model
     */
    closeDialog(index) {
      this.fetchUmfragen().then(() => this.sortUmfragen());
      this.$set(this.dialog, index, false)
    },

    /**
     * Closes v-dialog with dialogAuswertung as v-model
     */
    closeDialogAuswertung(index) {
      this.fetchUmfragen().then(() => this.sortUmfragen());
      this.$set(this.dialogAuswertung, index, false)
    },

    /**
     * Fetches all existent Umfragen from the Server.
     */
    fetchUmfragen: async function () {
    await fetch(process.env.VUE_APP_BASEURL + "/umfrage/alleUmfragen", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.data.umfragen !== null) {
          this.umfragen = data.data.umfragen;
        } else {
          this.umfragen = []
        }
        
        this.dialog = new Array(this.umfragen.length).fill(false)
        this.dialogAuswertung = new Array(this.umfragen.length).fill(false)
        this.errors = new Array(this.umfragen.length).fill(false)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },

    /**
     * Loescht die Umfrage mit der gegebenen ID, gibt false bei error, true bei success zurueck
     */
    deleteUmfrage: async function (index, umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage", {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        umfrageID: umfrageID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "error") {
          this.errors[index] = true
          this.message = data.error.message
          return false
        }
        return true
      })
      .catch((error) => {
        this.errors[index] = true
        this.message = "Server nicht erreichbar."
        console.error("Error:", error);
        return false
      });
    },

    /**
    * Dupliziert die Umfrage mit der gegebenen ID, gibt false bei error, true bei success zurueck
    */
    duplicateUmfrage: async function (index, umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/duplicate?id=" + umfrageID, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "error") {
          this.errors[index] = true
          this.message = data.error.message
          return false
        }
        return true
      })
      .catch((error) => {
        this.errors[index] = true
        this.message = "Server nicht erreichbar."
        console.error("Error:", error);
        return false
      });
    },
  }
}
  
//Comparer Function for sorting list of Umfragen    
function GetSortOrder(prop) {    
    return function(a, b) {    
        let aProp = a[prop];
        let bProp = b[prop];

        // if one element is null
        if (aProp !== null && bProp === null){
            return 1;
        }
        if (aProp === null && bProp !== null){
            return -1;
        }

        // if both element are non-null
        if (aProp > bProp) {    
            return 1;    
        } else if (aProp < bProp) {    
            return -1;    
        }    

        // same value or both elements are null
        return 0;    
    }    
}    
</script>