<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
      :display-login-button="true"
    />

    <v-main
      class="mb-8"
    >
      <v-card
        elevation="0"
        class="pb-4"
        height="100%"
      >
        <!-- Banner Image -->
        <v-img
          :max-height="imageHeight"
          src="../assets/footprints-in-sand.jpg"
          class="d-flex align-end"
        >
          <v-container v-if="$vuetify.breakpoint.width >= min_width_title">
            <!-- Title in grey box in image-->
            <v-row>
              <v-col class="text-left pb-0">
                <div
                  style="background-color: #F5F5F5; display: inline-block;"
                >
                  <h1
                    style="color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Titel')"
                  />
                  <p
                    style="font-size: large; color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Willkommen_1')"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-img>  
        
        <v-container>
          <!-- Title in grey box below image-->
          <template v-if="$vuetify.breakpoint.width < min_width_title">
            <v-row>
              <v-col class="text-left pa-0">
                <div
                  style="background-color: #F5F5F5; display: inline-block;"
                >
                  <h1
                    style="color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Titel')"
                  />
                  <p
                    style="font-size: large; color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Willkommen_1')"
                  />
                </div>
              </v-col>
            </v-row>
          </template>

          <!-- Icon-Boxes -->
          <!-- all boxes in one row -->
          <template v-if="$vuetify.breakpoint.width >= min_width_icons">
            <v-row class="mt-4">
              <v-spacer />
              <v-col
                class="d-flex flex-column"
                col="2"
              >
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    {{ $t('landingpage.Login.PanelTitel_1') }}
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_question_and_answer.svg" 
                    />
                  </a>
                </v-card>
              </v-col>

              <v-col
                class="d-flex flex-column"
                col="2"
              >
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    {{ $t('landingpage.Login.PanelTitel_2') }}
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="$keycloak.createLoginUrl()"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_broadcast.svg" 
                    />
                  </a>
                </v-card>
              </v-col>

              <v-col
                class="d-flex flex-column"
                col="2"
              >
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    <nobr>{{ $t('landingpage.Login.PanelTitel_3') }}</nobr>
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq_warum"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_lightbulb_green.svg"
                    />
                  </a>  
                </v-card>
              </v-col>
              <v-spacer />
            </v-row>
          </template>
          <!-- each box in a separate row -->
          <template v-else>
            <v-row class="mt-4">
              <v-col>
                <v-spacer />
                <v-card>
                  <v-card-title class="text-center justify-center">
                    {{ $t('landingpage.Login.PanelTitel_1') }}
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_question_and_answer.svg" 
                    />
                  </a>
                </v-card>
                <v-spacer />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    {{ $t('landingpage.Login.PanelTitel_2') }}
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="$keycloak.createLoginUrl()"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_broadcast.svg" 
                    />
                  </a>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    <nobr>{{ $t('landingpage.Login.PanelTitel_3') }}</nobr>
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq_warum"
                    class="py-4 px-3"
                  >
                    <v-img
                      contain
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="../assets/icon_lightbulb_green.svg"
                    />
                  </a>  
                </v-card>
              </v-col>
            </v-row>
          </template>

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
          <!-- all logos in one row -->
          <template v-if="$vuetify.breakpoint.width >= min_width_logos">
            <v-row
              class="d-flex justify-space-around mt-10"
            >
              <v-spacer />
              <v-col col="2">
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
              <v-col col="2">
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
              <v-col col="2">
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
              <v-spacer />
            </v-row>
          </template>
          <!-- each logo in a separate row -->
          <template v-else>
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
                    src="../assets/logo_Maschinenbau.png"
                  />
                </a>
              </v-col>
            </v-row>
            <v-row>
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
            </v-row>
            <v-row class="mb-16">  
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
          </template>
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
    faq_warum: process.env.VUE_APP_URL + '/faq#warum',
    min_width_logos: 830,   // minimum pixel width to display logos in one row
    min_width_icons: 750,   // minimum pixel width to display icons in one row
    min_width_title: 600,   // minimum pixel width to display title in banner image
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    imageHeight(){
      return (this.$vuetify.breakpoint.width >= this.min_width_title) ? "35vh" : "20vh"
    }
  },  
};
</script>

<style>
  a { text-decoration: none; }
</style>