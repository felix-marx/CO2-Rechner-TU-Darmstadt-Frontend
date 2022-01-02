<template>
  <v-app>
    <Header />
    <v-main>
      <v-card
        elevation="2"
        outlined
      >
        <v-card-title class="justify-center">
          {{ istRegistrierung ? "Registrierung" : "Anmeldung" }}
        </v-card-title>
        <!-- Signin -->
        <v-container v-if="!istRegistrierung">
          <v-row>
            <v-col />
            <v-col cols="8">
              <v-text-field
                v-model="username"
                :rules="requiredRule"
                label="E-Mail Adresse"
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
          <v-row>
            <v-col class="px-10">
              <v-btn
                color="primary"
                :style="{ left: '50%', transform: 'translateX(-50%)' }"
                @click="postAnmeldung()"
              >
                <span>Anmelden</span>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              color="error"
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              @click="istRegistrierung = true"
            >
              <span>Neues Konto erstellen</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
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
                label="E-Mail Adresse"
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
          <v-row
            class="px-5"
          >
            <v-col />
            <v-col cols="8">
              <v-checkbox
                v-model="agbBestaetigt"
                label="Ich erkläre mich mit den AGB von TU-Darmstadt einverstanden."
              />
            </v-col>
            <v-col />
          </v-row>
          <!-- Error Message on wrong user input and error in backend -->
          <v-row
            v-if="errorMessage != null && errorMessage != ''"
            justify="center"
          >
            <p>
              {{ errorMessage }}
            </p>
          </v-row>
          <v-row>
            <v-btn
              color="error"
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              @click="postRegistrierung()"
            >
              <span>Konto erstellen</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col class="px-10">
              <v-btn
                color="primary"
                :style="{ left: '50%', transform: 'translateX(-50%)' }"
                @click="postAnmeldung()"
              >
                <span>Anmelden</span>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import Cookies from "../Cookie.js"


export default {
  name: "Anmeldung",

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
    agbBestaetigt: false,
    dialog: false,
    //Für Fehlermeldung bei Response
    errorMessage: null,

    requiredRule: [
      v => !!v || "Muss angegeben werden",
    ],
    passwordRule: [
      v => (v && v.length >= 8) || 'Min 8 characters'
    ]
  }),

  computed: {
    showAnmelden: function () {
      return Cookies.checkIfCookieAttributExists("email")
    },
  },

  methods: {
    passwordConfirmationRule() {
      return () => (this.password === this.rePassword) || 'Passwörter sind nicht gleich'
    },

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
        this.errorMessage = "Email Mindestlänge ist 5 Zeichen"
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

      await fetch("http://localhost:9000/auth/anmeldung", {
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
            Cookies.setCookie("email", this.username)
            this.$router.push('/admin')
          }
          //Message on success or error send from Backend
          this.errorMessage = (data.status == "success") ? data.data.message : data.error.message
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

      await fetch("http://localhost:9000/auth/registrierung", {
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
            Cookies.setCookie("sessiontoken", data.data.sessiontoken)
            Cookies.setCookie("email", this.username)
            this.$router.push('/survey')
          }
          //Message on success or error send from Backend 
          this.message = (data.status == "success") ? data.data.message : data.error.message
          console.log("Success:", data)
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    },

    deleteAbmelden: async function () {
      await fetch("http://localhost:9000/auth/abmeldung", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.getCookieAttribut("email")
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          //Delete cookie and log if not success
          Cookies.deleteCookieAttribut("email")
          Cookies.deleteCookieAttribut("sessiontoken")
          if (data.status != "success") {
            console.log("Server konnte nicht löschen")
          }

          //TODO Show error message in case of error 
          console.log("Success:", data)
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    }
  }
};
</script>