<template>
  <v-app>
    <Header />
    <v-main>
      <v-card
        elevation="2"
        class="py-4"
        outlined
      >
        <div class="text-center">
          <v-icon size="100">
            mdi-lock-outline
          </v-icon>
          <v-card-title class="justify-center">
            <h2>Probleme beim Anmelden?</h2>
          </v-card-title>
          <br>Geben Sie einfach Ihre E-Mail Adresse ein und wir schicken Ihnen ein neues Kennwort zu.
        </div>
        <v-container>
          <v-row>
            <v-col />
            <v-col cols="16">
              <v-text-field
                v-model="username"
                label="E-Mail Adresse"
                prepend-icon="mdi-account"
              />
            </v-col>
            <v-col />
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                color="primary"
              >
                <v-icon left>
                  mdi-lock-open-outline
                </v-icon>
                <span>Kennwort zurücksetzen</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                color="blue"
                @click="$router.push({path: '/'})"
              >
                <v-icon
                  left
                  color="#ffffff"
                >
                  mdi-account
                </v-icon>
                <span class="white--text">Zurück zur Anmeldung</span>
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
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
//import Cookies from "../Cookie.js"


export default {
  name: "Anmeldung",

  components: {
    Header,
    Footer
  }
  ,

  data: () => ({
    username: null
  }),

  computed: {
  },

  methods: {
    },

    
};
</script>