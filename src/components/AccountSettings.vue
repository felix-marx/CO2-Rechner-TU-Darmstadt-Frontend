<template>
  <v-card
    elevation="2"
    outlined
  >
    <v-card-title>
      Account Löschen
    </v-card-title>
    <v-card class="pa-7">
      <v-row>
        <v-col cols="10">
          Hier können Sie ihren Account löschen. Wenn Sie sicher sind, dies tun zu wollen, drücken Sie bitte den folgenden Knopf.
        </v-col>
        <v-col cols="2">
          <v-dialog
            v-model="showDeleteDialog"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
              <v-col class="text-right">
                <v-btn
                  class="ma2"
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
                  <b>Diese Aktion kann nicht zurückgenommen werden und alle Ihre Umfragen werden gelöscht! </b>
                </p>
            
                <div>
                  Geben Sie zur Bestätigung bitte Ihren Nutzernamen in folgendes Feld ein:
                </div>
                <v-text-field
                  ref="mitarbeiterLinkTextfield"
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
  </v-card>
</template>

<script>
import Cookies from "../Cookie"
import LoadingAnimation from "./componentParts/loadingAnimation"


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
        method: "POST",
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
          console.log("Success:", data);
          this.responseData = data.data;
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.deleteRequestError = true;
          } else {
            this.accountDeleted = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
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
        if (data.status != "success") {
          console.log("Server konnte nicht löschen")
          this.deleteRequestError = true;
        }else{
          this.signedOut = true;
          //TODO Show error message in case of error 
          console.log("Success:", data)
        }
        this.displayLoadingAnimation = false;
      })
      .catch((error) => {
        //This is always the case when the backend returns nothing -> Timeout
        console.error("Error:", error)
        this.deleteRequestError = true;
        this.displayLoadingAnimation = false;
      });
    },

    forwardToLoginPage() {
      this.$router.push('/').catch(() => {});
    }
  }
};
</script>