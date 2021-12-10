<template>
  <v-app>
    <!-- Header -->
    <SimpleHeader
      tab-title="Umfrage"
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
import SimpleHeader from "@/components/SimpleHeader";
import MitarbeiterUmfrage from "@/components/mitarbeiterUmfrage";
import SurveyNotFoundComponent from "@/components/SurveyNotFoundComponent";

export default {
  name: "MitarbeiterUmfrageView",
  components: {
    SimpleHeader,
    Footer,
    MitarbeiterUmfrage,
    SurveyNotFoundComponent
  },

  props: {
    surveyNotFound: {
      default: false,
      type: Boolean
    }
  },

  computed: {

    bodyComponent: function () {
      if(this.surveyNotFound()) {
        return SurveyNotFoundComponent;
      } else {
        return MitarbeiterUmfrage;
      }

    }
  },

  created: function () {
    // TODO fetch from server if survey exists
    this.surveyNotFound = function () {
      return this.$route.params.umfrageID === "42";
    }
  }
};
</script>
