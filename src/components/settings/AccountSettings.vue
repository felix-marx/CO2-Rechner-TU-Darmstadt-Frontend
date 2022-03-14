<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <v-card-title>
        Account Löschen
        <v-divider class="ml-2" />
      </v-card-title>
      <v-card
        class="pl-7 pr-7"
        elevation="0"
      >
        <v-row>
          <v-col cols="10">
            <div class="mt-4">
              Hier können Sie Ihren Account löschen. Wenn Sie sicher sind, dies tun zu wollen, drücken Sie bitte den folgenden Knopf.
            </div>
          </v-col>
          <v-col cols="2">
            <v-dialog
              v-model="showDeleteDialog"
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- Mit diesem Button soll der Account gelöscht werden. -->
                <v-col class="text-right">
                  <v-btn
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
                  Löschen des Accounts
                </v-toolbar>
                <v-card-text>
                  <p class="pt-6">
                    Sind Sie sicher, dass Sie Ihren Account löschen möchten?
                    <br>
                    <b>Diese Aktion kann nicht zurückgenommen werden und alle Ihre Umfragen werden gelöscht! </b>
                  </p>
            
                  <div>
                    Geben Sie zur Bestätigung bitte Ihre E-Mail-Adresse in folgendes Feld ein:
                  </div>
                  <v-text-field
                    v-model="usernameConfirmation"
                    outlined
                  />
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <LoadingAnimation
                    v-if="displayLoadingAnimation"
                  />
                  <v-alert
                    v-if="accountDeleted && signedOut && !displayLoadingAnimation"
                    type="success"
                  >
                    Ihr Account wurde erfolgreich gelöscht. Sie können dieses Fenster nun schließen.
                  </v-alert>
                  <v-alert
                    v-if="deleteRequestError && !displayLoadingAnimation"
                    type="error"
                  >
                    Ihr Account konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.
                  </v-alert>
                  <v-spacer />
                  <v-btn
                    :disabled="!checkUsernameConfirmation || accountDeleted"
                    color="delete"
                    text
                    @click="deleteAccountAndSignout()"
                  >
                    Ich bestätige
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
      
      <v-card-title>
        Kennwort Ändern  
        <v-divider class="ml-2" />
      </v-card-title>
      <v-card
        class="pl-7 pr-7"
        elevation="0"
      >
        Hier können Sie Ihr Kennwort ändern.
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
                <span class="white--text">Kennwort ändern</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import Cookies from "../Cookie.js"
import LoadingAnimation from "../componentParts/LoadingAnimation"


export default {

  name: "AccountSettings",

  components: {
    LoadingAnimation
  },

  data: () => ({
    usernameConfirmation: "",
    accountDeleted: false,
    showDeleteDialog: false,
    deleteRequestError: false,
    displayLoadingAnimation: false,
    signedOut: true,
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
  
  computed: {
    /**
     * Checks whether the typed in username when deleting an account and the actual username match.
     */
    checkUsernameConfirmation: function () {
      return this.cookieAttribut === this.usernameConfirmation
    },

    /**
     * Returns the username of the logged in user.
     */
    cookieAttribut: function () {
      return Cookies.getCookieAttribut('username')
    }
  },

  watch:{
    showDeleteDialog: function(newValue){
      if(!newValue && this.accountDeleted){
        this.forwardToLoginPage();
      }
    }
  },

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

    async deleteAccountAndSignout(){
      this.displayLoadingAnimation = true;
      this.deleteAccount();
      this.deleteAbmelden();
    },

    /**
     * Sends a Post-Request to the server for deleting the account.
     */
    async deleteAccount() {
      await fetch(process.env.VUE_APP_BASEURL + "/nutzerdaten/deleteNutzerdaten", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.cookieAttribut,
          authToken: {
            username: Cookies.getCookieAttribut("username"),
            sessiontoken: Cookies.getCookieAttribut("sessiontoken")
          }
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.responseData = data.data;
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.displayLoadingAnimation = false;
            this.deleteRequestError = true;
          } else {
            this.displayLoadingAnimation = false;
            this.accountDeleted = true;
          }
        })
        .catch((error) => {
          console.error(error)
          this.errorMessage = "Server nicht erreichbar."
          this.displayLoadingAnimation = false;
          this.deleteRequestError = true;
        });
    },
 
    async deleteAbmelden() {
      await fetch(process.env.VUE_APP_BASEURL + "/auth/abmeldung", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Cookies.getCookieAttribut('username')
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          //Delete cookie and log if not success
          Cookies.deleteCookieAttribut("username")
          Cookies.deleteCookieAttribut("sessiontoken")
          Cookies.deleteCookieAttribut("rolle")
          if (data.status != "success") {
            this.deleteRequestError = true;
          }else{
            this.signedOut = true;
          }
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
          this.deleteRequestError = true;
          
      })
    },

    forwardToLoginPage() {
      this.$router.push('/').catch(() => {});
    }
  }
};
</script>