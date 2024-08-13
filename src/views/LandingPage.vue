<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].colors.background}">
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
      :display-login-button="true"
    />

    <v-main :class="$vuetify.display.mobile ? 'mb-6 mx-3 pb-0' : 'mb-6 mx-3'">
      <v-card
        class="mt-3 mx-auto"
        :max-width="constants.v_card_max_width"
        height="100%"
      >
        <!-- Banner Image -->
        <v-img
          max-height="500px"
          src="@/assets/landingpage.png"
          class="d-flex align-end"
        /> 

        <div
          style="background-color: #F5F5F5;"
        >
          <h1
            style="color: black;"
            class="px-4 py-2"
            v-html="$t('landingpage.Login.Titel')"
          />
          <p
            style="font-size: large; color: black;"
            class="px-4 py-2 pb-4 mb-0"
            v-html="$t('landingpage.Login.Willkommen_1')"
          />
        </div>
        
        <v-container>
          <!-- Icon-Boxes -->
          <!-- all boxes in one row -->
          <template v-if="$vuetify.display.width >= min_width_icons">
            <v-row>
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
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_question_and_answer.svg" 
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
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_broadcast.svg" 
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
                    <span style="white-space: nowrap;">{{ $t('landingpage.Login.PanelTitel_3') }}</span>
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq_warum"
                    class="py-4 px-3"
                  >
                    <v-img
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_lightbulb_green.svg"
                    />
                  </a>  
                </v-card>
              </v-col>
            </v-row>
          </template>
          <!-- each box in a separate row -->
          <template v-else>
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
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_broadcast.svg" 
                    />
                  </a>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
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
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_question_and_answer.svg" 
                    />
                  </a>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="flex d-flex flex-column">
                  <v-card-title class="text-center justify-center flex d-flex flex-column">
                    <span style="white-space: nowrap;">{{ $t('landingpage.Login.PanelTitel_3') }}</span>
                  </v-card-title>
                  <v-divider />
                  <a
                    :href="faq_warum"
                    class="py-4 px-3"
                  >
                    <v-img
                      class="mx-auto"
                      height="20vh"
                      max-height="200px"
                      max-width="200px"
                      src="@/assets/icon_lightbulb_green.svg"
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
              <v-icon start>
                mdi-account
              </v-icon>
              {{ $t('header.Header.LoginButton') }}
            </v-btn>
            <v-spacer />
          </v-row>

          <!-- Logos -->
          <!-- all logos in one row -->
          <template v-if="$vuetify.display.width >= min_width_logos">
            <v-row
              class="d-flex justify-center mt-10"
            >
              <v-spacer />
              <v-col class="pl-4 pr-0">
                <a
                  href="https://www.fst.tu-darmstadt.de/fachgebiet/index.de.jsp"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto py-6"
                    max-height="177"
                    max-width="230"
                    src="@/assets/logo_Maschinenbau.png"
                  />
                </a>
              </v-col>
              <v-col>
                <a
                  href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/index.de.jsp"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto"
                    max-height="177"
                    max-width="230"
                    src="@/assets/logo_Nachhaltigkeit.jpg"
                  />
                </a>
              </v-col>
              <v-col class="px-2">
                <a
                  href="https://www.tu-darmstadt.de/"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto"
                    max-height="177"
                    max-width="230"
                    src="@/assets/logo_tud.png"
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
                  href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/index.de.jsp"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto"
                    max-height="177"
                    max-width="250"
                    src="@/assets/logo_Nachhaltigkeit.jpg"
                  />
                </a>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <a
                  href="https://www.fst.tu-darmstadt.de/fachgebiet/index.de.jsp"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto py-6"
                    max-height="177"
                    max-width="250"
                    src="@/assets/logo_Maschinenbau.png"
                  />
                </a>
              </v-col>
            </v-row>
            <v-row>  
              <v-col>
                <a
                  href="https://www.tu-darmstadt.de/"
                  target="_blank"
                >
                  <v-img
                    class="mx-auto"
                    max-height="177"
                    max-width="250"
                    src="@/assets/logo_tud.png"
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
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
import constants from "@/const.js";

export default {
  name: "Login",

  components: {
    Header,
    Footer,
  },

  data: () => ({
    constants: constants,
    faq: import.meta.env.VITE_URL + '/faq',
    faq_bilazierung: import.meta.env.VITE_URL + '/faq#bilanzierung',
    faq_allgemein: import.meta.env.VITE_URL + '/faq#allgemein',
    faq_warum: import.meta.env.VITE_URL + '/faq#warum',
    min_width_logos: 770,   // minimum pixel width to display logos in one row
    min_width_icons: 770,   // minimum pixel width to display icons in one row

    testField: null,
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  },

  watch: {
    testField: function() {
      console.log(this.testField); 
    }
  }
};
</script>

<style>
  a { text-decoration: none; }
</style>