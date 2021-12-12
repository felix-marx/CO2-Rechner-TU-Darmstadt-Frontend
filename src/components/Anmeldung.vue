<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
      >
        <span class="mr-2">Anmelden</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card class="d-flex justify-center">
      <v-container>
        <v-card-title class="justify-center">
          {{ istRegistrierung ? "Registrierung" : "Anmeldung" }}
        </v-card-title>
        <v-row>
          <v-text-field
            v-model="username"
            class="px-5"
            :rules="requiredRule"
            label="E-Mail Adresse"
            prepend-icon="mdi-account"
            required
          />
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            class="px-5"
            :rules="passwordRule.concat(requiredRule)"
            label="Passwort"
            type="password"
            prepend-icon="mdi-key"
          />
        </v-row>
        <v-row v-if="istRegistrierung">
          <v-text-field
            v-model="rePassword"
            class="px-5"
            :rules="passwordRule.concat(requiredRule)"
            label="Passwort"
            type="password"
            prepend-icon="mdi-key"
            hint="Mindestens 8 Zeichen"
          />
        </v-row>
        <v-row
          v-if="istRegistrierung"
          class="px-5"
        >
          <v-checkbox
            v-model="agbBestaetigt"
            label="Ich erkläre mich mit den AGB von TU-Darmstadt einverstanden."
          />
        </v-row>
        <!-- Error Message on wrong user input and error in backend -->
        <v-row v-if="errorMessage != null">
          <p
            class="mx-12"
          >
            {{ errorMessage }}
          </p>
        </v-row>
        <v-row>
          <v-col class="px-10">
            <v-btn
              color="primary"
              @click="postAnmeldung()"
            >
              <span>Anmelden</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-10">
            <v-btn
              color="error"
              @click="postRegistrierung()"
            >
              <span>Registrieren</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Anmeldung",

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
     * Checks if the user input is valid and returns true if valid
     * Otherwise false and sets errorMessage to user fault
     */
    checkValidInput: function(registrierung) {
      if (!this.username || !this.password) {
        this.errorMessage = "Unvollständige Angabe"
        return false
      }
      if(registrierung && this.password != this.rePassword) {
        this.errorMessage = "Passwort stimmt nicht überein"
        return false
      }
      if(this.username.length < 5) {
        this.errorMessage = "Email Mindestlänge ist 5 Zeichen"
        return false
      }
      if(this.password.length < 7) {
        this.errorMessage = "Passwort Mindestlänge ist 7 Zeichen"
        return false
      }
      this.errorMessage = null
      return true
    },

    postAnmeldung: async function () {
      //User input validation and set error message
      this.istRegistrierung = false 
      if(!this.checkValidInput(this.istRegistrierung)) {
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
          if(data.success) {
            this.setCookie("sessiontoken", data.cookietoken)
            this.setCookie("email", this.username)
          } else {
            this.errorMessage = data.message
          }
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
      if(!this.checkValidInput(this.istRegistrierung)) {
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
          if(data.success) {
            this.setCookie("sessiontoken", data.cookietoken)
            this.setCookie("email", this.username)
          } else {
            //Error case from backend
            this.message = data.message
          }
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