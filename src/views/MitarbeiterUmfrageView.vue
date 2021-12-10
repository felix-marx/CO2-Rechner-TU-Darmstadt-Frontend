<template>
  <v-app>
    <!-- Header -->
    <SimpleHeader tabTitle="Umfrage" :anmeldenButton="false"/>

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

  props: {
    surveyNotFound: {
      default: false,
      type: Boolean
    }
  },
  components: {
    SimpleHeader,
    Footer,
    MitarbeiterUmfrage,
    SurveyNotFoundComponent
  },

  created: function () {
    this.surveyNotFound = function () {
      return this.$route.params.umfrageID === "42";
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
  }
};
</script>
