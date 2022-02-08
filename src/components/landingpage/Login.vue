<template>
  <v-app>
    <Header />
    <v-main>
      <v-card
        elevation="2"
        class="py-4"
        outlined
      >
        <div class="text-center">
          <v-card-title class="justify-center">
            <h2>TU-Darmstadt CO2-Rechner</h2>
          </v-card-title>Willkommen bei dem TU-Darmstadt CO2-Rechner, mit diesem können Sie die CO2-Emissionen von TU Einheiten berechnen.
          <br> Erstellen Sie einfach einen Konto, um eine Umfrage für Ihre TU-Einheit zu erstellen.
          <v-card-title
            class="justify-center"
          >
            {{ istRegistrierung ? "Registrierung" : "Anmeldung" }}
          </v-card-title>
        </div>
        <!-- Signin -->
        <v-container v-if="!istRegistrierung">
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="username"
                :rules="requiredRule"
                label="E-Mail"
                prepend-icon="mdi-account"
                required
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="password"
                :rules="passwordRule.concat(requiredRule)"
                label="Passwort"
                type="password"
                prepend-icon="mdi-key"
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row
            v-if="errorMessage != null && errorMessage != ''"
            justify="center"
          >
            <p class="error--text">
              {{ errorMessage }}
            </p>
          </v-row>
          <v-row>
            <v-col class="text-center ma-0 pa-0">
              <v-btn
                color="primary"
                @click="postAnmeldung()"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Anmelden</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-tooltip
                bottom
              > 
                <template v-slot:activator="{ on }">
                  <a
                    target="_blank"
                    @click="$router.push('/passwortVergessen')"
                    v-on="on"
                  >Passwort vergessen?</a>
                </template>
                Öffnet die Passwort vergessen Seite.
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center ma-0 pa-0">
              <v-btn
                color="blue"
                @click="() => { istRegistrierung = true; errorMessage = '' }"
              >
                <v-icon
                  color="white"
                  left
                >
                  mdi-account-plus
                </v-icon>
                <span class="white--text">Neues Konto erstellen</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- Register -->
        <v-container v-if="istRegistrierung">
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="username"
                class="px-5"
                :rules="requiredRule"
                label="E-Mail"
                prepend-icon="mdi-account"
                required
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="password"
                class="px-5"
                :rules="passwordRule.concat(requiredRule)"
                label="Passwort"
                type="password"
                prepend-icon="mdi-key"
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="rePassword"
                class="px-5"
                :rules="passwordRule.concat(requiredRule)"
                label="Passwort wiederholen"
                type="password"
                prepend-icon="mdi-key"
                hint="Mindestens 8 Zeichen"
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row class="text-center">
            <v-col />
            <v-col
              v-if="bestaetigungAnzeigen"
              cols="7"
            >
              <v-alert
                outlined
                type="success"
                text
              >
                Ihr Konto wurde erfolgreich erstellt. Damit Sie ihr Konto verwenden können, müssen Sie ihre E-Mail bestätigen.
                <br> Unsere Bestätigungsmail ist schon auf dem Weg zu Ihnen und Sie können gleich loslegen!
              </v-alert>
            </v-col>
            <v-col />
          </v-row>

          <v-row class="px-5">
            <v-col />
            <v-col
              cols="8"
              class="text-center"
            >
              <div>
                Indem Sie auf „Konto erstellen“ klicken, stimmen Sie unseren Datenschutzerklärung zu.
                <br>In unserer
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      :href="datenschutzlink"
                      @click.stop
                      v-on="on"
                    >Datenschutzerklärung</a>
                  </template>
                  Öffnet eine neue Seite mit der Datenschutzerklärung
                </v-tooltip> erfahren Sie, welche Daten wir erfassen und verwenden.
              </div>
            </v-col>
            <v-col />
          </v-row>
          <!-- Error Message on wrong user input and error in backend -->
          <v-row
            v-if="errorMessage != null && errorMessage != ''"
            justify="center"
          >
            <p class="error--text">
              {{ errorMessage }}
            </p>
          </v-row>
          <v-row>
            <v-col class="text-center py-3">
              <v-btn
                color="blue"
                @click="postRegistrierung()"
              >
                <v-icon
                  color="white"
                  left
                >
                  mdi-account-plus
                </v-icon>
                <span class="white--text">Konto erstellen</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="ma-0 pa-0 text-center">
              <v-btn
                color="primary"
                @click="() => { istRegistrierung = false; errorMessage = '' }"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Zurück zur Anmeldung</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- Logos -->
        <v-container class="d-flex justify-space-around mb-6 py-10">
          <v-row>
            <v-col>
              <v-img
                contain
                class="mx-auto py-15"
                max-height="177"
                max-width="250"
                src="../../assets/logo_Maschinenbau.png"
              />
            </v-col>
            <v-col>
              <v-img
                contain
                class="mx-auto"
                max-height="177"
                max-width="250"
                src="../../assets/logo_Nachhaltigkeit.jpg"
              />
            </v-col>
            <v-col>
              <v-img
                contain
                class="mx-auto"
                max-height="177"
                max-width="250"
                src="../../assets/logo_tud.png"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../componentParts/Footer.vue";
import Header from "../componentParts/Header.vue";
import Cookies from "../Cookie.js"


export default {
  name: "Login",

  components: {
    Header,
    Footer
  }
  ,

  data: () => ({
    username: null,
    password: null,
    rePassword: null,
    istRegistrierung: false,
    bestaetigungAnzeigen: false,
    agbBestaetigt: false,
    dialog: false,
    //Für Fehlermeldung bei Response
    errorMessage: null,
    datenschutzlink: process.env.VUE_APP_URL + "/datenschutz",

    requiredRule: [
      v => !!v || "Muss angegeben werden",
    ],
    passwordRule: [
      v => (v && v.length >= 8) || 'Mindestens 8 Zeichen'
    ]
  }),

  computed: {
    showAnmelden: function () {
      return Cookies.checkIfCookieAttributExists("username")
    },
  },

  methods: {
    // passwordConfirmationRule() {
    //   return () => (this.password === this.rePassword) || 'Passwörter sind nicht gleich'
    // },

    /**
     * Checks if the user input is valid and returns true if valid
     * Otherwise false and sets errorMessage to user fault
     */
    checkValidInput: function (registrierung) {
      if (!this.username || !this.password) {
        this.errorMessage = "Unvollständige Angabe"
        return false
      }
      if (registrierung && this.password != this.rePassword) {
        this.errorMessage = "Passwort stimmt nicht überein"
        return false
      }
      if (this.username.length < 5) {
        this.errorMessage = "E-Mail Mindestlänge ist 5 Zeichen"
        return false
      }
      if (this.password.length < 8) {
        this.errorMessage = "Passwort Mindestlänge ist 8 Zeichen"
        return false
      }
      this.errorMessage = null
      return true
    },

    postAnmeldung: async function () {
      //User input validation and set error message
      this.istRegistrierung = false
      if (!this.checkValidInput(this.istRegistrierung)) {
        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/auth/anmeldung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          if (data.status == "success") {
            Cookies.setCookie("sessiontoken", data.data.sessiontoken)
            Cookies.setCookie("username", this.username)
            this.$router.push('/survey').catch(() => { })
          }
          //Message on success or error send from Backend
          this.errorMessage = (data.status == "success") ? '' : data.error.message
          console.log("Success:", data)
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    },

    postRegistrierung: async function () {
      //User input validation and set error message
      this.istRegistrierung = true
      if (!this.checkValidInput(this.istRegistrierung)) {
        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/auth/registrierung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          if (data.status == "success") {
            this.bestaetigungAnzeigen = true
          }
          //Message on success or error send from Backend 
          this.errorMessage = (data.status == "success") ? '' : data.error.message
          console.log("Success:", data)
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    },
  }
};
</script>