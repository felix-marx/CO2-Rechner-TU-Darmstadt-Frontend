<template>
  <v-app>
    <!-- Header -->
    <Header
      :tabs="tabList"
      :anmelden-button="false"
    />

    <!-- main body -->
    <v-main>
      <component
        :is="bodyComponent"
        v-bind="properties"
      />
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
import LoadingAnimation from "@/components/componentParts/loadingAnimation";

export default {
  name: "MitarbeiterUmfrageView",
  components: {
    Header,
    Footer,
    MitarbeiterUmfrage,
    SurveyNotFoundComponent,
    LoadingAnimation
  },

  data: () => ({
      tabList: [{ id: 0, title: 'Umfrage', componentType: LoadingAnimation}],
      umfrageID: null,
      bezeichnung: "",
  }),

  computed: {

    /**
     * Returns the component to be shown in the body of the view. LoadingAnimation while the server is requested, SurveyNotFound if the survey does not exist or the survey
     * if the corresponding id exists.
     */
    bodyComponent: function () {
      // umfrageID is null until the server answered. Show loading animation during that.
      if (this.umfrageID === null) {
        return LoadingAnimation;
      }

      // either show the survey or a message, that the requested survey could not be found.
      if(this.surveyNotFound) {
        return SurveyNotFoundComponent;
      } else {
        return MitarbeiterUmfrage;
      }
    },

    properties: function() {
      if(this.bodyComponent === MitarbeiterUmfrage){
        return {bezeichnung: this.bezeichnung}
      }
      return {}
    },

    /**
     * True, if a corresponding survey could be found (umfrageID is not an empty string). False otherwise.
     */
    surveyNotFound: function() {
      return this.umfrageID === "";
    }
  },

  created() {
    // request if a survey exists with the corresponding ID from the URL
    this.fetchUmfrageExists(this.$route.params.umfrageID);
  },

  methods: {
    /**
     * Requests from the server whether a survey with the givenID exists.
     */
  fetchUmfrageExists: async function (givenID) {
      await fetch(process.env.VUE_APP_BASEURL + "/mitarbeiterUmfrage/exists?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.status == "success"){
            this.umfrageID = data.data.umfrageID;
            this.bezeichnung = data.data.bezeichnung;
          }
          else{
            this.umfrageID = "";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.umfrageID = ""
        });
    },
  },

};
</script>
