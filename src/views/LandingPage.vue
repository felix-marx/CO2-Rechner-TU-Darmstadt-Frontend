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
        <!-- Banner Image -->
        <v-img
          max-height="35vh"
          src="../assets/rhein.jpg"
          class="d-flex align-end"
        >
          <v-container>
            <v-row>
              <v-col class="text-left">
                <h1
                  style="color: white;"
                  v-html="$t('landingpage.Login.Titel')"
                />
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col class="text-center">
                <p
                  style="font-size: large; color: white;"
                  v-html="$t('landingpage.Login.Willkommen_1')"
                />
              </v-col>
            </v-row> -->
            
            <v-row>
              <v-col class="text-left mb-0 pa-0">
                <div
                  style="background-color: #F5F5F5; display: inline-block;"
                >
                  <h1
                    style="color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Titel')"
                  />
                </div>
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-col class="text-left mb-0 pa-0">
                <div
                  style="background-color: #F5F5F5;"
                  margin="mx-auto"
                  width="200px"
                >
                  <h1
                    style="color: black;"
                    class="px-4 py-2"
                    v-html="$t('landingpage.Login.Titel')"
                  />
                </div>
              </v-col>
            </v-row> -->
          </v-container>
        </v-img>  
        

        <!-- Titel -->
        <v-container>
          <!-- <v-row>
            <v-col class="text-center">
              <h1
                v-html="$t('landingpage.Login.Titel')"
              />
            </v-col>
          </v-row> -->
          <v-row>
            <v-col class="text-center">
              <p
                style="font-size: large"
                v-html="$t('landingpage.Login.Willkommen_1')"
              />
            </v-col>
          </v-row>

          <!-- Fields -->
          <v-row class="mt-4">
            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  {{ $t('landingpage.Login.PanelTitel_1') }}
                </v-card-title>
                <v-divider />
                <a
                  :href="faq"
                >
                  <v-img
                    contain
                    class="my-2"
                    height="15vh"
                    width="100%"
                    max-height="200px"
                    src="../assets/circle-question-solid.svg" 
                  />
                </a>
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  {{ $t('landingpage.Login.PanelTitel_2') }}
                </v-card-title>
                <v-divider />
                <a
                  :href="$keycloak.createLoginUrl()"
                >
                  <v-img
                    contain
                    class="my-2"
                    height="15vh"
                    width="100%"
                    max-height="200px"
                    src="../assets/exclamation-solid.svg" 
                  />
                </a>
              </v-card>
            </v-col>

            <v-col class="d-flex flex-column">
              <v-card class="flex d-flex flex-column">
                <v-card-title class="text-center justify-center">
                  {{ $t('landingpage.Login.PanelTitel_3') }}
                </v-card-title>
                <v-divider />
                <a
                  :href="faq_warum"
                >
                  <v-img
                    contain
                    class="my-2"
                    height="15vh"
                    width="100%"
                    max-height="200px"
                    src="../assets/lightbulb-regular.svg" 
                  />
                </a>  
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
    faq_warum: process.env.VUE_APP_URL + '/faq#warum',
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