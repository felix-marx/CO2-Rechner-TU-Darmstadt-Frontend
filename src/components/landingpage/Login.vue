<template>
  <v-app>
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
    />
    <v-main class="mb-16">
      <v-card
        elevation="2"
        class="py-4"
        outlined
      >
        <div class="text-center">
          <v-card-title class="justify-center">
            <h2>TU Darmstadt CO<sub>2</sub>-Rechner</h2>
          </v-card-title>Willkommen bei dem TU Darmstadt CO<sub>2</sub>-Rechner. Mit diesem können Sie die CO<sub>2</sub>-Emissionen von TU-Einheiten berechnen.
          <br> Erstellen Sie einfach ein Konto, um eine Umfrage für Ihre TU-Einheit zu erstellen.
          <v-card-title
            class="justify-center"
          >
            {{ istRegistrierung ? "Registrierung" : "Anmeldung" }}
          </v-card-title>
        </div>
        <!-- <v-container>
          <v-row>
            <v-col v-if="!$keycloak.authenticated">
              <v-btn @click="login">
                Login            
              </v-btn>
            </v-col>
            <v-col v-if="$keycloak.authenticated">
              <v-btn @click="logout">
                Logout            
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="sendRequest2">
                OK           
              </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="sendRequest">
                Hello           
              </v-btn>
            </v-col>
          </v-row>
        </v-container> -->

        <!-- Signin -->
        <v-container>
          <v-row>
            <v-col
              v-if="!$keycloak.authenticated"
              class="text-center ma-0 pa-0"
            >
              <v-btn
                color="primary"
                type="button"
                @click="$keycloak.loginFn()"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Anmelden</span>
              </v-btn>
            </v-col>
            <v-col
              v-if="$keycloak.authenticated"
              class="text-center ma-0 pa-0"
            >
              <v-btn
                color="primary"
                type="button"
                @click="$keycloak.logoutFn()"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Abmelden</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Logos -->
        <v-container class="d-flex justify-space-around mb-6 py-10">
          <v-row>
            <v-col>
              <a
                href="https://www.fst.tu-darmstadt.de/fachgebiet/index.de.jsp"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto py-6"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_Maschinenbau.png"
                />
              </a>
            </v-col>
            <v-col>
              <a
                href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/index.de.jsp"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_Nachhaltigkeit.jpg"
                />
              </a>
            </v-col>
            <v-col>
              <a
                href="https://www.tu-darmstadt.de/"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_tud.png"
                />
              </a>
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


export default {
  name: "Login",

  components: {
    Header,
    Footer
  },

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

  methods: {
    // sendRequest: async function() {
    //   await fetch(process.env.VUE_APP_BASEURL + "/hello", {
    //     method: 'GET',
    //     headers: {
    //       "Authorization": "Bearer " + this.$keycloak.token,
    //     }
    //   }).then(response => {
    //     if (response.status === 200) {
    //       response.text().then(text => {
    //         alert(text);
    //       });
    //     } else {
    //       alert("Error");
    //     }
    //   });
    // },
    // sendRequest2: async function() {
    //   await fetch(process.env.VUE_APP_BASEURL + "/", {
    //     method: 'GET',
    //     headers: {
    //       "Authorization": "Bearer " + this.$keycloak.token,
    //     }
    //   }).then(response => {
    //     if (response.status === 200) {
    //       response.text().then(text => {
    //         alert(text);
    //       });
    //     } else {
    //       alert("Error");
    //     }
    //   });
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
      var regex = /.+@(.*\.)?tu-darmstadt\.de/
      if (registrierung && !regex.test(this.username)) {
        this.errorMessage = "Bitte geben Sie eine gültige TU E-Mail an"
        return false
      }
      if (this.password.length < 8) {
        this.errorMessage = "Passwort Mindestlänge ist 8 Zeichen"
        return false
      }
      this.errorMessage = null
      return true
    },
  }
};
</script>