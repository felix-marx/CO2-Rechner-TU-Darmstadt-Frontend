<template>
  <v-app>
    <Header 
      :display-user-setting="false"
    />
    <v-main class="mb-16">
      <v-container v-if="displayLoadingAnimation">
        <LoadingAnimationVue />
      </v-container>

      <v-container
        v-if="emailConfirmed"
        class="text-center"
      >
        <v-card>
          <h2 class="pa-7 mt-2">
            {{ $t('MailAuthentication.MailBestaetigt') }}
          </h2>
          <v-btn
            color="primary"
            class="mb-8"
            large
            @click="$router.push({ path: '/' })"
          >
            <v-icon left>
              mdi-account
            </v-icon>
            <span>{{ $t('common.ZurueckAnmeldung') }}</span>
          </v-btn>
        </v-card>
      </v-container>

      <v-container
        v-if="emailNotConfirmed"
        class="text-center"
      >
        <v-card class="pa-7 mt-2">
          <h2>{{ $t('MailAuthentication.MailBestaetigungFehlgeschlagen') }}</h2>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../componentParts/Footer.vue";
import Header from "../componentParts/Header.vue";
import LoadingAnimationVue from "../componentParts/LoadingAnimation.vue";

export default {

  components: { Footer, Header, LoadingAnimationVue },
  data: () => ({
    displayLoadingAnimation: true,
    emailConfirmed: false,
    emailNotConfirmed: false,
  }),

  created() {
    this.postMailBestaetigung(this.$route.params.nutzerID)
  },

  methods: {
    postMailBestaetigung: async function (nutzerID) {
      await fetch(process.env.VUE_APP_BASEURL + "/auth/emailBestaetigung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nutzerID: nutzerID
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          if (data.status == "success") {
            this.emailConfirmed = true
            this.displayLoadingAnimation = false
          } else {
            this.displayLoadingAnimation = false
            this.emailNotConfirmed = true
          }
        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
          this.displayLoadingAnimation = false
          this.emailNotConfirmed = true
        });
    },
  }
}
</script>
