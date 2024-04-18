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
        height="100%"
      >
        <v-card-title>
          Survey Share
        </v-card-title>

        <v-divider />

        <v-container>
          <v-row>
            <v-col>
              Es wurden zur Umfrage "{{ this.$route.params.umfrageID }}" eingeladen.
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn>
                Anfrage annehmen
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
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import loadingAnimation from '@/components/componentParts/LoadingAnimation.vue';
import constants from "../const.js";

export default {
  name: "Login",

  components: {
    Header,
    Footer
  },

  data: () => ({
    constants: constants,
    tabList: [],
    umfrageID: null,
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
  },

  methods: {
    setTabList(){
      this.tabList = [
        { id: 0, title: 'Survey Share', componentType: loadingAnimation},
      ]
    }
  }
};
</script>