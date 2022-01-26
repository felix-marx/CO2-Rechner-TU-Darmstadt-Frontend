<template>
  <v-app>
    <Header />
    <v-container>
      <v-card class="pa-7 mt-2">
        <v-card-title>Bitte bestätigen Sie ihre E-Mail Adresse.</v-card-title>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";

export default {

    components: { Footer, Header },
    data: () => ({
    }),
    created() {
        // request the year of the umfrage
        this.postMailBestaetigung(this.$route.params.userID)
    },
    methods: {
        postMailBestaetigung: async function (userID){
            await fetch(process.env.VUE_APP_BASEURL + "/auth/emailBestaetigung", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: userID
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            //This is always the case when the backend returns a package
            if (data.status == "success") {
                this.$router.push('/')
            }
            //Message on success or error send from Backend 
            this.errorMessage = (data.status == "success") ? data.data.message : data.error.message
            })
            .catch((error) => {
            //This is always the case when the backend returns nothing -> Timeout
            console.error("Error:", error)
            });
    },
    }
}
</script>
