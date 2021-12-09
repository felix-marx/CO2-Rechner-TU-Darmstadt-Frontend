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

    postAnmeldung: async function () {
      this.istRegistrierung = false
      if (!this.username || this.username.length < 5 || !this.password || this.password.length < 7) return
      await fetch("http://localhost:9000/anmeldung", {
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
          console.log("Success:", data)
        })
        .catch((error) => {
          console.error("Error:", error)
        });
    },
    postRegistrierung: async function () {
      this.istRegistrierung = true
      console.log(JSON.stringify({
        username: this.username,
        password: this.password,
      }))
      if (!this.username || !this.password || this.password != this.rePassword || this.username.length < 5 || this.password.length < 7 || !this.istRegistrierung) return
      await fetch("http://localhost:9000/registrierung", {
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
          console.log("Success:", data)
        })
        .catch((error) => {
          console.error("Error:", error)
        });
    }
  }
};
</script>