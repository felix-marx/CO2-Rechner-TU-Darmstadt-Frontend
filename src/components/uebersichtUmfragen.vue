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
            Umfrage {{ index + 1 }}
          </v-list-item-title>
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
          <template v-slot:activator="{ on, attrs }">
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
              <v-toolbar-title>Umfragedaten</v-toolbar-title>
            </v-toolbar>
            <!-- Hier kommt der Inhalt der Umfrage hin -->
            <v-card>
              <v-card>
              <UmfrageBearbeitenComponent 
                :umfrage-prop="umfrage"
              />
            </v-card>
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
              <v-toolbar-title>Auswertungsergebnisse</v-toolbar-title>
            </v-toolbar>
            <v-card>
              <Nutzerauswertung :umfrageid="umfrage._id" />
            </v-card>
          </v-card>
        </v-dialog>
        
        <v-spacer />

        <v-checkbox
          v-model="deleteSurvey[index]"
        />
      </v-card-actions>
    </v-card>

    <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
    <v-col class="text-right">
      <v-btn
        class="ma2"
        outlined
        text
        :disabled="!deleteSurvey.some(x => x)"
        @click="removeSurvey(2)"
      >
        Ausgewählte löschen
      </v-btn>
    </v-col>
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
      notifications: false,
      sound: true,
      widgets: true,
      editing_time: "XX.YY.ZZZZ",
    }),

    created() {
      this.fetchUmfragenForUser();
      // this.fetchUmfragen();
      // this.fetchMitarbeiterUmfragen("61b23e9855aa64762baf76d7"); // TODO only for testing yet
      // this.updateUmfrage("61b23e9855aa64762baf76d7");
      // this.updateMitarbeiterUmfrage("61b34f9324756df01eee5ff4");
    },

    methods: {
      /**
       * needs to be written
       */
      removeSurvey() {
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

      /**
       * Fetches all existent Umfragen from the Server.
       */
      fetchUmfragen: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/alleUmfragen")
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfragen = data.data.umfragen;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      },

      fetchUmfragenForUser: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/GetAllUmfragenForUser?user=" + Cookies.getCookieAttribut("email"))
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfragen = data.data.umfragen;
          
          this.dialog = new Array(this.umfragen.length).fill(false)
          this.dialogAuswertung = new Array(this.umfragen.length).fill(false)
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
    }
  }
</script>

<!-- Ich muss alle für den entsprechenden Nutzer in der Datenbank angelegten Umfragen empfangen, damit diese angezeigt werden können -->
<!-- Ich möchte einzelne Umfrage Objekte einsehen können-->
<!-- Ich möchte einzelne Umfragen löschen können, auch aus der Datenbank-->