<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
      :display-login-button="true"
    />

    <v-main class="mb-8">
      <v-card
        elevation="0"
        class="pb-4"
        height="100%"
      >
        <v-img
          max-height="30vh"
          src="../assets/rhein.jpg" 
        />

        <v-container>
          <v-row>
            <v-col class="text-center">
              <h1
                v-html="$t('landingpage.Login.Titel')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <label v-html="$t('landingpage.Login.Willkommen_1')" />
            </v-col>
          </v-row>

          <!-- Fields -->
          <v-row class="mt-4">
            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  FAQ
                </v-card-title>
                <v-divider />
                <v-img
                  class="mx-auto"
                  max-height="20vh"
                  max-width="20vh"
                  src="../assets/circle-info-solid.svg" 
                />
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  Mach mit!
                </v-card-title>
                <v-divider />
                <p class="ma-4">
                  Melden Sie sich einfach mit Ihrer TU-ID an und fangen Sie an, Ihre CO<sub>2</sub>-Bilanz zu erstellen. Eine  detailierte <a :href="faq_nutzung">Anleitung zur Nutzung des CO<sub>2</sub>-Rechners</a> finden Sie im FAQ.
                  <br>
                </p>
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  Was habt ich davon?
                </v-card-title>
                <v-divider />
                <p class="ma-4 pb-4">
                  Sie möchten mehr über den Hintergrund des CO<sub>2</sub>-Rechners erfahren? 
                  Dann lesen Sie den <a href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/projekte_buero/news_projekte_buero_details_374400.de.jsp">Artikel</a> des Büros für Nachhaltigkeit oder schauen Sie in das <a :href="faq">FAQ</a>.
                  <br>
                  > <a :href="faq_allgemein">Allgemeine Information zum CO<sub>2</sub>-Rechners</a>
                </p>
                <v-spacer />
              </v-card>
            </v-col>
          </v-row>

          <!-- Login Button -->
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

          <!-- Logos -->
          <v-row
            class="d-flex justify-space-around mt-10"
          >
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
                  src="../assets/logo_Maschinenbau.png"
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
                  src="../assets/logo_Nachhaltigkeit.jpg"
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
                  src="../assets/logo_tud.png"
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
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

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

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
};
</script>

<style>
  a { text-decoration: none; }
</style>