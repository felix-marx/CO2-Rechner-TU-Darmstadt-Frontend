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
import SurveyNotFoundComponent from "@/components/SurveyNotFoundComponent";
import LoadingAnimation from "@/components/componentParts/loadingAnimation";
import Nutzerauswertung from "@/components/nutzerauswertung";

export default {
  name: "AuswertungView",
  components: {
    Header,
    Footer,
    SurveyNotFoundComponent,
    LoadingAnimation,
    Nutzerauswertung
  },

  data: () => ({
      tabList: [{ id: 0, title: 'Auswertung', componentType: LoadingAnimation}],
      umfrageID: null,
      freigegeben: 0,
  }),

  computed: {

    /**
     * Returns the component to be shown in the body of the view. 
     * LoadingAnimation while the server is requested, SurveyNotFound if the survey does not exist 
     * or the Nutzerauswertung if the corresponding id exists.
     */
    bodyComponent: function () {
      // umfrageID is null until the server answered. Show loading animation during that.
      if (this.umfrageID === null) {
        return LoadingAnimation;
      }

      // show a message that the requested survey could not be found.
      if(this.surveyNotFound) {
        return SurveyNotFoundComponent;
      } 

      // else show Nutzerauswertung
      return Nutzerauswertung;
      
    },

    /**
     * Returns properties depending on the current component
     */
    properties: function() {
      if(this.bodyComponent === Nutzerauswertung){
        return {umfrageid: this.umfrageID}
      }
      return {}
    },

    /**
     * True, if a corresponding survey could be found (umfrageID is not an empty string). False otherwise.
     */
    surveyNotFound: function() {
      return this.umfrageID === "";
    },
  },

  created() {
    // request if a survey has result sharing enabled with the corresponding ID from the URL
    this.fetchUmfrage(this.$route.params.umfrageID);
  },

  methods: {
    /**
     * Requests from the server whether a survey with the givenID has result sharing enabled.
     */
  fetchUmfrage: async function (givenID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/GetSharedResults?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfrageID = givenID;
          if (data.status == "success"){
            this.freigegeben = data.data.freigegeben;
          }
          else{
            this.freigegeben = 0;
          }
        }).catch((error) => {
          console.error("Error:", error);
          this.umfrageID = "";
          this.freigegeben = 0;
        });
    },
  },

};
</script>
