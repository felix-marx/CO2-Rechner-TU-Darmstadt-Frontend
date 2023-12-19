<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
      :display-login-button="true"
    />
    <v-main class="mb-8">
      <v-card
        elevation="2"
        class="pb-4"
        outlined
      >
        <div class="text-center">
          <h2
            class="py-3" 
            v-html="$t('landingpage.Login.Titel')"
          />
          <label v-html="$t('landingpage.Login.Willkommen_1')" />
        </div>

        <v-container class="mt-4">
          <v-row>
            <v-spacer />
            <v-btn
              class="ma-4"
              color="primary"
              @click="$keycloak.loginFn()"
            >
              <v-icon left>
                mdi-account
              </v-icon>
              {{ $t('header.Header.LoginButton') }}
            </v-btn>
            <v-spacer />
          </v-row>
        </v-container>

        <!-- Logos -->
        <v-container class="d-flex justify-space-around mt-10 mb-6 py-10">
          <v-row>
            <v-col>
              <a
                href="https://www.fst.tu-darmstadt.de/fachgebiet/index.de.jsp"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto py-6"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_Maschinenbau.png"
                />
              </a>
            </v-col>
            <v-col>
              <a
                href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/index.de.jsp"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_Nachhaltigkeit.jpg"
                />
              </a>
            </v-col>
            <v-col>
              <a
                href="https://www.tu-darmstadt.de/"
                target="_blank"
              >
                <v-img
                  contain
                  class="mx-auto"
                  max-height="177"
                  max-width="250"
                  src="../../assets/logo_tud.png"
                />
              </a>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../footer/Footer.vue";
import Header from "../header/Header.vue";

export default {
  name: "Login",

  components: {
    Header,
    Footer
  },

  data: () => ({
    faq: process.env.VUE_APP_URL + '/faq',
    faq_bilazierung: process.env.VUE_APP_URL + '/faq#bilanzierung',
    faq_allgemein: process.env.VUE_APP_URL + '/faq#allgemein',
    faq_nutzung: process.env.VUE_APP_URL + '/faq#nutzung',
  }),
};
</script>

<style>
  a { text-decoration: none; }
</style>