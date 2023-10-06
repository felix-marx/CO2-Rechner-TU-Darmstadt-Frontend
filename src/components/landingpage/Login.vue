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
            <v-col>
              <v-card>
                <v-card-title>
                  CO2-Bilanzierung
                </v-card-title>
                <v-divider />
                <p class="ma-4 pb-4">
                  Eine CO2-Bilanz dient der Darstellung der Treibhausgasemissionen einer Organisation, eines Produktes, einer Dienstleistung oder einer Aktivität innerhalb einer definierten Betrachtungsgrenze. Die Bilanz umfasst alle klimaschädlichen Emissionen und drückt diese in CO2-Äquivalente aus.
                </p>
              </v-card>
            </v-col>

            <v-col>
              <v-card>
                <v-card-title>
                  Verwednung des CO<sub>2</sub>-Rechner
                </v-card-title>
                <v-divider />
                <p class="ma-4 pb-4">
                  > <a :href="faq_nutzung">Anleitung zur Verwendung des CO2-Rechners</a>
                </p>
              </v-card>
            </v-col>

            <v-col>
              <v-card>
                <v-card-title>
                  Hintergrund des CO<sub>2</sub>-Rechners
                </v-card-title>
                <p class="ma-4 pb-4">
                  > <a href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/projekte_buero/news_projekte_buero_details_374400.de.jsp">CO₂-Bilanzierung: webbasiertes Tool online</a>
                </p>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-card>
                <v-card-title>
                  FAQ
                </v-card-title>
                <p class="ma-4 pb-4">
                  Alles wissenwertes zum CO2-Rechner finden sie im <a :href="faq_link">FAQ</a>.
                </p>
              </v-card>
            </v-col>

            <v-spacer />

            <v-col cols="3">
              <v-card>
                <v-card-title>
                  Verwednung des CO<sub>2</sub>-Rechner
                </v-card-title>
              </v-card>
            </v-col>

            <v-spacer />

            <v-col cols="3">
              <v-card>
                <v-card-title>
                  Video
                </v-card-title>
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
    faq_link: process.env.VUE_APP_URL + '/faq',
    faq_nutzung: process.env.VUE_APP_URL + '/faq#nutzung',
  }),
};
</script>