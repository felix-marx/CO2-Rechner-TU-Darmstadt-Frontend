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
          <div class="text-overline mb-4">
            Zuletzt bearbeitet am {{ editing_time }}
          </div>

          <v-list-item-title class="text-h5 mb-1">
            Umfrage {{ umfrage._id }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Die erstellte Umfrage soll bearbeitet und ausgewählt werden können. -->
      <v-card-actions>
        <v-dialog
          v-model="dialog"
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
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Umfrage {{ umfrage._id }}</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="dialog = false"
                >
                  Speichern
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- Hier kommt der Inhalt der Umfrage hin -->
            <v-card>
              <UmfrageBearbeitenComponent
                :bilanzierungsjahr="umfrage.jahr"
              />
            </v-card>
            <v-divider /> 
            <div>
              Aktuelle Auswertung
            </div>
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

  export default {
    components: {
      UmfrageBearbeitenComponent
    },

    data: () => ({
      umfragen: [],
      deleteSurvey: [],
      dialog: false, 
      notifications: false,
      sound: true,
      widgets: true,
      editing_time: "XX.YY.ZZZZ",
    }),

    created() {
      this.fetchUmfragen();
      this.fetchMitarbeiterUmfragen("61b23e9855aa64762baf76d7"); // TODO only for testing yet
      this.updateUmfrage("61b23e9855aa64762baf76d7");
      this.updateMitarbeiterUmfrage("61b34f9324756df01eee5ff4");
    },

    methods: {
      /**
       * needs to be written
       */
      removeSurvey() {
        return
      },

      /**
       * Fetches all existent Umfragen from the Server.
       */
      fetchUmfragen: async function () {
      await fetch("http://localhost:9000/umfrage/alleUmfragen")
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfragen = data.data.umfragen;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      },

      /**
       * Fetches all existent MitarbeiterUmfragen from the Server, given an Umfrage.
       */
      fetchMitarbeiterUmfragen: async function (umfrageID) {
      await fetch("http://localhost:9000/mitarbeiterUmfrage/mitarbeiterUmfrageForUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: umfrageID,
        }),
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


      // Temporär aus Anmeldung kopiert
      // TODO: Bei Merge entfernen bzw. refaktorisieren

        /**
       * Checks if identifier is set in cookie
       */
      checkIfCookieAttributExists: function(identifier) {
        return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith(identifier))
      },

      /**
       * Gets the value of the identifier set in the cookie if it is set else null
       */
      getCookieAttribut: function(identifier) {
        if(this.checkIfCookieAttributExists(identifier)) {
          return document.cookie
            .split("; ")
            .find(row => row.startsWith(identifier))
            .split("=")[1]
        }
        return null
      },

      /**
       * Updates an existing Umfrage with the given ID. Please pass all values even if they were not changed.
       */
      updateUmfrage: async function (umfrageID) {
      await fetch("http://localhost:9000/umfrage/updateUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: umfrageID,
          mitarbeiteranzahl: 420,
          jahr: 1969,
          gebaeude: null,
          itGeraete: null,
          hauptverantwortlicher: {
            username: this.getCookieAttribut("email"),
            sessiontoken: this.getCookieAttribut("sessiontoken")
          }
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
      await fetch("http://localhost:9000/mitarbeiterUmfrage/updateMitarbeiterUmfrage", {
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
          hauptverantwortlicher: {
            username: this.getCookieAttribut("email"),
            sessiontoken: this.getCookieAttribut("sessiontoken")
          }
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