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
          <v-row
            v-if="passwortZurueck === 1"
            class="text-center"
          >
            <v-col />
            <v-col
              cols="13"
            >
              <v-alert
                outlined
                type="success"
                text
              >
                Wir haben Ihnen eine Mail mit einem neuen Kennwort geschickt! 
              </v-alert>
            </v-col>
            <v-col />
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                color="primary"
                @click="postPasswortVergessen()"
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
  },

  data: () => ({
    username: null,
    passwortZurueck: 0
  }),

  computed: {
  },

  methods: {
    postPasswortVergessen: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/auth/passwortVergessen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if(data.status === "success"){
              this.passwortZurueck = 1 //Hat korrekt funktioniert
          } else {
              this.passwortZurueck = 2 //Irgendwas ist schief gegangen
          }
        })
        .catch((error) => {
        //This is always the case when the backend returns nothing -> Timeout
        console.error("Error:", error)
        });
      },    
    }, 
};
</script>