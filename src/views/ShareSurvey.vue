<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Header 
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
          Survey Share Seite
        </v-card-title>
      </v-card>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import constants from "../const.js";

export default {
  name: "Login",

  components: {
    Header,
    Footer
  },

  data: () => ({
    constants: constants,
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  },  
};
</script>