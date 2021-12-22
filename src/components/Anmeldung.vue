<template>
  <v-app>
    <Header />
    <v-main>
      <v-card
        elevation="2"
        outlined
      >
        <v-card-title class="justify-center">
          Anmeldung
        </v-card-title>
        <v-container>
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
              @click="$router.push('registrierung')"
            >
              <span>Neues Konto erstellen</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
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
      return this.checkIfCookieAttributExists("email")
    },
  },

  methods: {
    passwordConfirmationRule() {
      return () => (this.password === this.rePassword) || 'Passwörter sind nicht gleich'
    },

    /**
     * Sets the cookie at the given identifier to the given value overwritting the existing value
     */
    setCookie: function (identifier, value) {
      document.cookie = identifier + "=" + value + "; SameSite=Lax"
    },

    /**
     * Checks if identifier is set in cookie
     */
    checkIfCookieAttributExists: function (identifier) {
      return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith(identifier))
    },

    /**
     * Gets the value of the identifier set in the cookie if it is set else null
     */
    getCookieAttribut: function (identifier) {
      if (this.checkIfCookieAttributExists(identifier)) {
        return document.cookie
          .split("; ")
          .find(row => row.startsWith(identifier))
          .split("=")[1]
      }
      return null
    },

    /**
     * Deletes the value stored at the identifer in cookie
     */
    deleteCookieAttribut: function (identifier) {
      //By setting the cookie expire date to an past date it automatically gets deleted
      document.cookie = identifier + "=; SameSite=Lax; expires=Thu, 18 Dec 2013 12:00:00 UTC"
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
            this.setCookie("sessiontoken", data.data.sessiontoken)
            this.setCookie("email", this.username)
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
            this.setCookie("sessiontoken", data.data.sessiontoken)
            this.setCookie("email", this.username)
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
          this.deleteCookieAttribut("email")
          this.deleteCookieAttribut("sessiontoken")
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