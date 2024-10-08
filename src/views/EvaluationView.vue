<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].colors.background}">
    <!-- Header -->
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="false"
      :display-login-button="false"
    />

    <!-- main body -->
    <v-main :class="$vuetify.display.mobile ? 'mb-0 pb-0' : 'mb-0'">
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
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
import SurveyNotFound from "@/components/colleagueSurvey/SurveyNotFound.vue";
import LoadingAnimation from "@/components/componentParts/LoadingAnimation.vue";
import SurveyEvaluation from "@/components/evaluation/SurveyEvaluation.vue";
import ResultSharingDisabled from "@/components/evaluation/ResultSharingDisabled.vue";

export default {
  name: "AuswertungView",
  components: {
    Header,
    Footer,
    SurveyNotFound,
    LoadingAnimation,
    SurveyEvaluation,
    ResultSharingDisabled
  },

  data() {
    return {
      tabList: [],
      umfrageID: null,
      freigegeben: 0,
    }
  },

  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    /**
     * Returns the component to be shown in the body of the view. 
     * LoadingAnimation while the server is requested, SurveyNotFound if the survey does not exist 
     * or the SurveyEvaluation if the corresponding id exists.
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

      if(this.surveyShareDisabled) {
        return ResultSharingDisabled;
      }

      // else show SurveyEvaluation
      return SurveyEvaluation;
      
    },

    /**
     * Returns properties depending on the current component
     */
    properties: function() {
      if(this.bodyComponent === SurveyEvaluation){
        return {umfrageid: this.umfrageID, shared: true}
      }
      return {}
    },

    /**
     * True, if a corresponding survey could be found (umfrageID is not an empty string). False otherwise.
     */
    surveyNotFound: function() {
      return this.umfrageID === "";
    },

    /**
     * True, if the corresponding survey has result sharing enabled
     */
    surveyShareDisabled: function() {
      return this.freigegeben === 0;
    }
  },

  watch: {
    '$i18n.locale': function() {
      this.setTabList();
    }
  },

  created() {
    this.setTabList();
    // request if a survey has result sharing enabled with the corresponding ID from the URL
    this.fetchUmfrage(this.$route.params.umfrageID);
  },

  methods: {
    /**
     * Requests from the server whether a survey with the givenID has result sharing enabled.
     */
    fetchUmfrage: async function (givenID) {
      await fetch(import.meta.env.VITE_BASEURL + "/umfrage/sharedResults?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          this.umfrageID = givenID;
          if (data.status == "success"){
            // Umfrage exists
            this.umfrageID = givenID;
            this.freigegeben = data.data.freigegeben;
          }
          else{
            // Umfrage doesn't exists
            this.umfrageID = "";
            this.freigegeben = 0;
          }
        }).catch((error) => {
          console.error("Error:", error);
          this.umfrageID = "";
          this.freigegeben = 0;
        });
      },

    setTabList(){
      this.tabList = [
        { id: 0, title: this.$t('common.Auswertung'), component: null},
      ]
    }
  },

};
</script>
