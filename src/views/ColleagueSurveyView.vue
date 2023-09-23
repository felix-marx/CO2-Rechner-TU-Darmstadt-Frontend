<template>
  <v-app>
    <!-- Header -->
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="false"
    />

    <!-- main body -->
    <v-main class="mb-16">
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
import Footer from "@/components/componentParts/Footer";
import Header from "@/components/componentParts/Header";
import ColleagueSurvey from "@/components/colleagueSurvey/ColleagueSurvey";
import SurveyNotFound from "@/components/colleagueSurvey/SurveyNotFound";
import LoadingAnimation from "@/components/componentParts/LoadingAnimation";
import UmfrageCompleted from "@/components/colleagueSurvey/SurveyCompleted"
import i18n from "../i18n";

export default {
  name: "ColleagueSurveyView",
  components: {
    Header,
    Footer,
    ColleagueSurvey,
    SurveyNotFound,
    UmfrageCompleted,
    LoadingAnimation
  },

  data: () => ({
      tabList: [{ id: 0, title: i18n.t('common.Umfrage'), componentType: LoadingAnimation}],
      umfrageID: null,
      bezeichnung: "",
      umfrageComplete: false
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

      // show a message that the requested survey could not be found.
      if(this.surveyNotFound) {
        return SurveyNotFound;
      } 

      // show a message that the requested survey is already complete.
      if(this.umfrageComplete){
        return UmfrageCompleted;
      }

      // else show ColleagueSurvey
      return ColleagueSurvey;
      
    },

    /**
     * Returns properties depending on the current component
     */
    properties: function() {
      if(this.bodyComponent === ColleagueSurvey){
        return {bezeichnung: this.bezeichnung}
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
    // request if a survey exists with the corresponding ID from the URL
    this.fetchUmfrageExists(this.$route.params.umfrageID);
  },

  methods: {
    /**
     * Requests from the server whether a survey with the givenID exists.
     */
  fetchUmfrageExists: async function (givenID) {
      await fetch(process.env.VUE_APP_BASEURL + "/mitarbeiterumfrage/exists?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success"){
            this.umfrageID = data.data.umfrageID;
            this.umfrageComplete = data.data.complete;
            this.bezeichnung = data.data.bezeichnung;
          }
          else{
            this.umfrageID = "";
            this.dataUmfrageComplete = false;
          }
        }).catch((error) => {
          console.error("Error:", error);
          this.umfrageID = "";
          this.dataUmfrageComplete = false;
        });
    },
  },

};
</script>
