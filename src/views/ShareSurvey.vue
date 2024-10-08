<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].colors.background}">
    <Header 
      :tabs="tabList"
      :display-user-setting="true"
      :display-back-button="false"
      :display-login-button="false"
    />

    <v-main :class="$vuetify.display.mobile ? 'mb-0 mx-3 pb-0' : 'mb-0 mx-3'">
      <v-card
        class="mt-3 mx-auto pb-4"
        :max-width="constants.v_card_max_width"
      >
        <v-card-title class="headerClass">
          {{ $t('shareSurvey.Title') }}
        </v-card-title>

        <v-divider />

        <v-container>
          <template v-if="displaySuccess">
            <v-row v-if="response.hinzugefuegt">
              <v-col :class="$vuetify.display.smAndUp ? 'mx-7' : 'mx-0'">
                {{ $t('shareSurvey.TeilenErfolgreich_1') }}{{ response.bezeichnung }}{{ $t('shareSurvey.TeilenErfolgreich_2') }}
              </v-col>
            </v-row>
            <v-row v-if="!response.hinzugefuegt">
              <v-col :class="$vuetify.display.smAndUp ? 'mx-7' : 'mx-0'">
                {{ $t('shareSurvey.SchonVorhanden_1') }}{{ response.bezeichnung }}{{ $t('shareSurvey.SchonVorhanden_2') }}
              </v-col>
            </v-row>

            <v-row>
              <v-col :class="$vuetify.display.smAndUp ? 'mx-7' : 'mx-0'">
                <v-btn
                  color="primary"
                  @click="$router.push('/survey?tab=1')"
                >
                  {{ $t('shareSurvey.BackButton') }}
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <v-row v-if="displayLoading">
            <v-col>
              <loadingAnimation />
            </v-col>
          </v-row>

          <template v-if="displayError">
            <v-row>
              <v-col :class="$vuetify.display.smAndUp ? 'mx-7' : 'mx-0'">
                {{ $t('shareSurvey.TeilenFehler') }}
              </v-col>
            </v-row>
            <v-row>
              <v-col :class="$vuetify.display.smAndUp ? 'mx-7' : 'mx-0'">
                <v-alert
                  class="mb-0"
                  type="error"
                  variant="tonal"
                >
                  {{ errorMessage }}
                </v-alert>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-card>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
import loadingAnimation from '@/components/componentParts/LoadingAnimation.vue';
import constants from "@/const.js";

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
    },
    '$vuetify.display.smAndUp': function() {
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
        { id: 0, title: this.$vuetify.display.smAndUp ? this.$t('shareSurvey.Tab') : this.$t('shareSurvey.Tab_kurz'), component: null},
      ]
    },

    shareUmfrageRequest: async function() {
       await fetch(import.meta.env.VITE_BASEURL + "/umfrage/share", {
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
          this.displayLoading = false;

          if (data.status == "success") {
            this.response = data.data;
            this.displaySuccess = true;
          } 
          else {
            this.errorMessage = data.error.message + " (Code: " + data.error.code + ")";
            this.displayError = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  }
};
</script>