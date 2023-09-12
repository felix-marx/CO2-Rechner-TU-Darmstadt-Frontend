<template>
  <v-app>
    <Header 
      :display-user-setting="false"
      :display-back-button="false"
    />
    <v-main class="mb-16">
      <v-card
        elevation="2"
        class="py-4"
        outlined
      >
        <div class="text-center">
          <v-card-title class="justify-center">
            <h2>TU Darmstadt CO<sub>2</sub>-Rechner</h2>
          </v-card-title>Willkommen bei dem TU Darmstadt CO<sub>2</sub>-Rechner. Mit diesem können Sie die CO<sub>2</sub>-Emissionen von TU-Einheiten berechnen.
        </div>
        <v-container>
          <v-row>
            <v-col
              v-if="!$keycloak.authenticated"
              class="text-center ma-0 pa-0"
            >
              <v-btn
                color="primary"
                type="button"
                @click="$keycloak.loginFn()"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Anmelden</span>
              </v-btn>
            </v-col>
            <v-col
              v-if="$keycloak.authenticated"
              class="text-center ma-0 pa-0"
            >
              <v-btn
                color="primary"
                type="button"
                @click="$keycloak.logoutFn()"
              >
                <v-icon left>
                  mdi-account
                </v-icon>
                <span>Abmelden</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Logos -->
        <v-container class="d-flex justify-space-around mb-6 py-10">
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
import Footer from "../componentParts/Footer.vue";
import Header from "../componentParts/Header.vue";


export default {
  name: "Login",

  components: {
    Header,
    Footer
  },
};
</script>