<template>
  <v-container>
    <v-card
      class="mb-5 mx-auto"
      elevation="2"
      border
      :max-width="constants.v_card_max_width"
    >
      <v-card-title class="headerClass ml-2 mt-2">
        {{ $t('header.accountSettings.AccountLoeschen') }}
        <v-divider />
      </v-card-title>

      <v-container>
        <v-row>
          <v-col class="py-0 pl-7 pr-7">
            {{ $t('header.accountSettings.AccountLoeschen_text') }}
          </v-col>
        </v-row>
        <v-row>  
          <v-col class="py-4 pl-7 pr-7">
            <v-dialog
              v-model="showDeleteDialog"
              transition="dialog-bottom-transition"
              :max-width="constants.v_dialog_max_width"
            >
              <template #activator="{ props }">
                <!-- Mit diesem Button soll der Account gelöscht werden. -->
                <v-btn
                  variant="outlined"
                  color="delete"
                 
                  v-bind="props"
                >
                  <v-icon> mdi-delete-outline </v-icon>
                  {{ $t('common.Loeschen') }}
                </v-btn>
              </template>
              <v-card>
                <v-toolbar
                  class="px-4"
                  color="primary"
                  dark
                >
                  {{ $t('header.accountSettings.LoeschenDesAccounts') }}
                </v-toolbar>
                <v-card-text>
                  <p class="pt-6">
                    {{ $t('header.accountSettings.AccountLoeschen_bestaetigen_0') }}
                    <br>
                    <b>{{ $t('header.accountSettings.AccountLoeschen_bestaetigen_1') }} </b>
                  </p>
            
                  <div>
                    {{ $t('header.accountSettings.AccountLoeschen_bestaetigen_2') }}
                  </div>
                  <v-text-field
                    v-model="usernameConfirmation"
                    variant="outlined"
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
                    variant="tonal"
                  >
                    {{ $t('header.accountSettings.AccountGeloescht_0') }}
                  </v-alert>
                  <v-alert
                    v-if="deleteRequestError && !displayLoadingAnimation"
                    type="error"
                    variant="tonal"
                  >
                    {{ $t('header.accountSettings.AccountNichtGeloescht') }}
                  </v-alert>
                  <v-spacer />
                  <v-btn
                    :disabled="!checkUsernameConfirmation || accountDeleted"
                    color="delete"
                    variant="text"
                    @click="deleteAccountAndSignout()"
                  >
                    {{ $t('header.accountSettings.Bestaetigung') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import LoadingAnimation from "@/components/componentParts/LoadingAnimation.vue"
import constants from "@/const.js";

export default {
  name: "AccountSettings",

  components: {
    LoadingAnimation
  },

  data: () => ({
    constants: constants,
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
      return "delete" === this.usernameConfirmation
    },
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
      await this.deleteAccount();

      if (this.accountDeleted) {
        this.$keycloak.logoutFn();
      }
    },

    /**
     * Sends a Post-Request to the server for deleting the account.
     */
    async deleteAccount() {
      await fetch(import.meta.env.VITE_BASEURL + "/nutzer", {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.$keycloak.tokenParsed.preferred_username,
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

    forwardToLoginPage() {
      this.$router.push('/').catch(() => {});
    }
  }
};
</script>