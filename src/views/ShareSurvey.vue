<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Header 
      :tabs="tabList"
      :display-user-setting="true"
      :display-back-button="false"
      :display-login-button="false"
    />

    <v-main
      class="mb-16 mx-3"
    >
      <v-card
        class="mt-3 mx-auto"
        :max-width="constants.v_card_max_width"
      >
        <v-card-title>
          Survey Share
        </v-card-title>

        <v-divider />

        <v-container>
          <template v-if="displaySuccess">
            <v-row v-if="response.hinzugefuegt">
              <v-col>
                Es wurden zur Umfrage "{{ response.bezeichnung }}" eingeladen. Die Umfrage wurde zu Ihrem Konto hinzugefügt.
              </v-col>
            </v-row>
            <v-row v-if="!response.hinzugefuegt">
              <v-col>
                Die Umfrage "{{ response.bezeichnung }}" wurde bereits mit Ihnen geteilt und befindet sich in Ihrer Umfragenübersicht.
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  @click="$router.push('/survey?tab=1')"
                >
                  Zurück zum Dashboard
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <v-row v-if="displayLoading">
            <v-col>
              <loadingAnimation />
            </v-col>
          </v-row>
          <v-row v-if="displayError">
            <v-col>
              <v-alert
                type="error"
                text
              >
                Es ist ein Fehler aufgetreten: {{ errorMessage }}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import loadingAnimation from '@/components/componentParts/LoadingAnimation.vue';
import constants from "../const.js";

export default {
  name: "Login",

  components: {
    Header,
    Footer,
    loadingAnimation
  },

  data: () => ({
    constants: constants,
    tabList: [],
    umfrageID: null,
    response: {
      bezeichnung: null,
      hinzugefuegt: null,
    },
    errorMessage: null,

    displayLoading: false,
    displaySuccess: false,
    displayError: false,
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  },

  watch: {
    '$i18n.locale': function() {
      this.setTabList();
    }
  },

  created() {
    this.setTabList();
    this.umfrageID = this.$route.params.umfrageID
    this.displayLoading = true;

    this.shareUmfrageRequest();
  },

  methods: {
    setTabList(){
      this.tabList = [
        { id: 0, title: 'Survey Share', componentType: loadingAnimation},
      ]
    },

    shareUmfrageRequest: async function() {
       await fetch(process.env.VUE_APP_BASEURL + "/umfrage/share", {
        method: "Post",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: this.umfrageID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.displayLoading = false;

          if (data.status == "success") {
            this.response = data.data;
            this.displaySuccess = true;
          } 
          else {
            this.errorMessage = data.error.message + " (Code: " + data.error.code + ")";
            this.displayError = true;
          }

          console.log(this.displayLoading);
          console.log(this.displaySuccess);
          console.log(this.displayError);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  }
};
</script>