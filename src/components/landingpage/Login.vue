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
          <v-img
            max-height="400"
            src="../../assets/rhein.jpg" 
          />
          <h2
            class="py-3" 
            v-html="$t('landingpage.Login.Titel')"
          />
          <label v-html="$t('landingpage.Login.Willkommen_1')" />
        </div>

        <v-container class="mt-4">
          <v-row>
            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title>
                  Was ist eine CO<sub>2</sub>-Bilanzierung?
                </v-card-title>
                <v-divider />
                <p class="ma-4 pb-4">
                  Eine CO<sub>2</sub>-Bilanz dient der Darstellung der Treibhausgasemissionen einer Organisation, eines Produktes, einer Dienstleistung oder einer Aktivität innerhalb einer definierten Betrachtungsgrenze. Die Bilanz umfasst alle klimaschädlichen Emissionen und drückt diese in CO<sub>2</sub>-Äquivalente aus.
                  <br>
                  > <a :href="faq_bilazierung">Mehr zu CO<sub>2</sub>-Bilanzierungen</a>
                </p>
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title>
                  Nutzung des CO<sub>2</sub>-Rechner
                </v-card-title>
                <v-divider />
                <p class="ma-4">
                  Melden Sie sich einfach mit Ihrer TU-ID an und fangen Sie an, Ihre CO<sub>2</sub>-Bilanz zu erstellen. Eine  detailierte <a :href="faq_nutzung">Anleitung zur Nutzung des CO<sub>2</sub>-Rechners</a> finden Sie im FAQ.
                  <br>
                  > <a @click="$keycloak.loginFn()">Zum Login</a> 
                </p>
                <v-spacer />
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title>
                  Hintergrund des CO<sub>2</sub>-Rechners
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