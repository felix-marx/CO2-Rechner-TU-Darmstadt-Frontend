<template>
  <v-app>
    <v-card
      elevation="2"
      class="py-4"
      outlined
    >
      <div class="text-center">
        <v-card-title class="justify-center">
          Kennwort Ändern
        </v-card-title>
      </div>

      <v-container>
        <v-row>
          <v-col />
          <v-col cols="16">
            <v-text-field
              v-model="password"
              class="px-5"
              label="Aktuelles Passwort"
              type="password"
              prepend-icon="mdi-key"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row>
          <v-col />
          <v-col cols="16">
            <v-text-field
              v-model="newPassword"
              class="px-5"
              :rules="passwordRule.concat(requiredRule)"
              label="Neues Passwort"
              type="password"
              prepend-icon="mdi-key"
              hint="Mindestens 8 Zeichen"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row>
          <v-col />
          <v-col cols="16">
            <v-text-field
              v-model="newPasswordRe"
              class="px-5"
              :rules="passwordRule.concat(requiredRule)"
              label="Neues Passwort wiederholen"
              type="password"
              prepend-icon="mdi-key"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row class="text-center">
          <v-col />
          <v-col
            
            cols="7"
          >
            <v-alert
              v-if="changedPasswordStatus === 1"
              outlined
              type="success"
              text
            >
              Ihr Kennwort wurde erfolgreich geändert!
            </v-alert>
            <v-alert
              v-if="changedPasswordStatus === 2"
              outlined
              type="error"
              text
            >
              Leider ist etwas schief gegangen, bitte wenden Sie sich an den Administrator oder probieren Sie es erneut.
            </v-alert>
          </v-col>
          <v-col />
        </v-row>
        <v-row>
          <v-col class="text-center py-3">
            <v-btn
              color="blue"
              @click="postPasswortAendern()"
            >
              <v-icon
                color="white"
                left
              >
                mdi-content-save-outline
              </v-icon>
              <span class="white--text">Kennwort ändern!</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import Cookies from '../Cookie'

export default {
  name: "PasswortAendern",

  data: () => ({
    changedPasswordStatus: 0, //default 0, success 1, error 2
    password: null,
    newPassword: null,
    newPasswordRe: null,
    requiredRule: [
      v => !!v || "Muss angegeben werden",
    ],
    passwordRule: [
      v => (v && v.length >= 8) || 'Mindestens 8 Zeichen'
    ]
  }),

  methods: {
    postPasswortAendern: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/auth/passwortAendern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          passwort: this.password,
          neuesPasswort: this.newPassword
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            this.changedPasswordStatus = 1
          } else {
              this.changedPasswordStatus = 2
              this.password = null
              this.newPassword = null
              this.newPasswordRe = null
          }
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    },
  }
};
</script>