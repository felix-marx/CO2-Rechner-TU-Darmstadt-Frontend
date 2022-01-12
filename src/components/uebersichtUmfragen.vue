<template>
  <v-container>
    <!-- Die erstellte Umfrage soll eine Karte erhalten. -->
    <v-card
      v-for="(umfrage, index) in umfragen"
      :key="'umfrage_'+index"
      elevation="2"
      outlined
    >
      <v-list-item
        three-line
      >
        <v-list-item-content>
          <!--
          <div class="text-overline mb-4">
            Zuletzt bearbeitet am {{ editing_time }}
          </div>   -->

          <v-list-item-title class="text-h5 mb-1">
            Umfrage: {{ umfrage.bezeichnung }}
          </v-list-item-title>

          <div>
            Link zur Mitarbeiterumfrage: {{ mitarbeiterumfrageBaseURL + umfrage._id }}
          </div>
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
              class="ma2"
              outlined
              rounded
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                mdi-square-edit-outline
              </v-icon>
              <span>bearbeiten</span>
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
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="closeDialog(index)"
                >
                  Speichern
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- Hier kommt der Inhalt der Umfrage hin -->
            <v-card>
              <UmfrageBearbeitenComponent 
                :bilanzierungsjahrprop="umfrage.jahr"
                :anzahlmitarbeiterprop="umfrage.mitarbeiteranzahl"
                :gebaeudeprop="umfrage.gebaeude"
                :geraeteanzahl="umfrage.itGeraete"
              />
            </v-card>

            <!--
            <v-divider /> 
            <div>
              Aktuelle Auswertung
            </div>
            -->
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
              class="ma2"
              outlined
              rounded
              text
              v-bind="attrs"
              v-on="on"
            >
              <span>Auswertung</span>
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
            <v-card>
              <Nutzerauswertung :umfrageid="umfrage._id" />
            </v-card>
          </v-card>
        </v-dialog>
        
        <v-spacer />

        <v-dialog
          v-model="deleteSurvey[index]"
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
            <v-col class="text-right">
              <v-btn
                class="ma2"
                outlined
                text
                color="delete"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete-outline</v-icon>
                Löschen
              </v-btn>
            </v-col>
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
        v-show="deleteError[index]"
        type="error"
      >
        {{ message }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import UmfrageBearbeitenComponent from "./UmfrageBearbeitenComponent.vue";
import Nutzerauswertung from "./nutzerauswertung.vue";
import Cookies from "../Cookie";

  export default {
    components: {
      UmfrageBearbeitenComponent,
      Nutzerauswertung,
    },

    data: () => ({
      umfragen: [],
      deleteSurvey: [],
      dialog: [], 
      dialogAuswertung: [], 
      deleteError: [],
      message: "",

      notifications: false,
      sound: true,
      widgets: true,
      editing_time: "XX.YY.ZZZZ",

      // base url for Mitarbeiterumfragen
      mitarbeiterumfrageBaseURL: process.env.VUE_APP_URL + '/survey/'
    }),

    created() {
      this.fetchUmfragenForUser();
    },

    methods: {
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
          this.deleteError.splice(index, 1)
        }
        return
      },

      /**
       * Closes v-dialog with dialog as v-model
       */
      closeDialog(index) {
        this.$set(this.dialog, index, false)
      },

      /**
       * Closes v-dialog with dialogAuswertung as v-model
       */
      closeDialogAuswertung(index) {
        this.$set(this.dialogAuswertung, index, false)
      },

      fetchUmfragenForUser: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/GetAllUmfragenForUser?user=" + Cookies.getCookieAttribut("email"))
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if(data.data.umfragen !== null) {
            this.umfragen = data.data.umfragen;
          } else {
            this.umfragen = []
          }
          
          this.dialog = new Array(this.umfragen.length).fill(false)
          this.dialogAuswertung = new Array(this.umfragen.length).fill(false)
          this.deleteError = new Array(this.umfragen.length).fill(false)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      },

      /**
       * Fetches all existent MitarbeiterUmfragen from the Server, given an Umfrage.
       */
      fetchMitarbeiterUmfragen: async function (umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/mitarbeiterUmfrage/mitarbeiterUmfrageForUmfrage?id=" + umfrageID, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          let mitarbeiterUmfragen = data.data;
          return mitarbeiterUmfragen;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      },

      /**
       * Updates an existing Umfrage with the given ID. Please pass all values even if they were not changed.
       */
      updateUmfrage: async function (umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/updateUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: umfrageID,
          mitarbeiteranzahl: 420,
          jahr: 2018,
          gebaeude: null,
          itGeraete: null,
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

      /**
       * Updates an existing MitarbeiterUmfrage with the given ID. Please pass all values even if they were not changed.
       */
      updateMitarbeiterUmfrage: async function (umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/mitarbeiterUmfrage/updateMitarbeiterUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: umfrageID,
          pendelweg: null,
          tageImBuero: 2,
          dienstreise: null,
          itGeraete: null,
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

      /**
       * Loescht die Umfrage mit der gegebenen ID, gibt false bei error, true bei success zurueck
       */
      deleteUmfrage: async function (index, umfrageID) {
         await fetch(process.env.VUE_APP_BASEURL + "/umfrage/deleteUmfrage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: umfrageID,
          hauptverantwortlicher: {
            username: Cookies.getCookieAttribut("email"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken"),
          }
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status === "error") {
            this.deleteError[index] = true
            this.message = data.error.message
            return false
          }
          console.log("Success:", data);
          return true
        })
        .catch((error) => {
          this.deleteError[index] = true
          this.message = error.error.message
          console.error("Error:", error);
          return false
        });
      }
    }
  }
</script>

<!-- Ich muss alle für den entsprechenden Nutzer in der Datenbank angelegten Umfragen empfangen, damit diese angezeigt werden können -->
<!-- Ich möchte einzelne Umfrage Objekte einsehen können-->
<!-- Ich möchte einzelne Umfragen löschen können, auch aus der Datenbank-->