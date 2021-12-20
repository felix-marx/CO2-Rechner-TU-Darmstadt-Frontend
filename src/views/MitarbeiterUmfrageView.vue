<template>
  <v-app>
    <!-- Header -->
    <Header
      :tabs="tabList"
      :anmelden-button="false"
    />

    <!-- main body -->
    <v-main>
      <component :is="bodyComponent" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MitarbeiterUmfrage from "@/components/mitarbeiterUmfrage";
import SurveyNotFoundComponent from "@/components/SurveyNotFoundComponent";

export default {
  name: "MitarbeiterUmfrageView",
  components: {
    Header,
    Footer,
    MitarbeiterUmfrage,
    SurveyNotFoundComponent
  },

  data: () => ({
      tabList: [{ id: 0, title: 'Umfrage', componentType: MitarbeiterUmfrage}],
      umfrageID: null
  }),

  computed: {

    bodyComponent: function () {
      if(this.surveyNotFound) {
        return SurveyNotFoundComponent;
      } else {
        return MitarbeiterUmfrage;
      }
    },

    surveyNotFound: function() {
      return this.umfrageID === "";
    }
  },

  created() {
    this.fetchUmfrageExists(this.$route.params.umfrageID);
  },

  methods: {
  fetchUmfrageExists: async function (givenID) {
      await fetch("http://localhost:9000/mitarbeiterUmfrage/exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: givenID,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfrageID = data.umfrageID;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

};
</script>
