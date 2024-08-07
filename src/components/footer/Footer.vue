<template>
  <!--- Footer :app="!$vuetify.display.mobile" --->
  <v-footer
    app
    color="primary"
    class="py-1"
    :style="{ 'position': $vuetify.display.mobile ? 'static' : 'fixed' }"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <!--- Contact Dialog --->
      <Contact />

      <v-btn
        v-for="(fElem, index) in footerButtons"
        :key="'footerButton-' + index"
        :href="fElem.href"
        class="mx-4"
        :target="fElem.target"
        variant="text"
      >
        <span class="text-white">{{ fElem.text }}</span>
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
import Contact from "@/components/footer/Contact.vue";

export default {
  name: "Footer",
    components: {
      Contact,
  },

  data: () => ({
    // Contact and OpenSource component not in footerButtons for it is as Dialog and not a Button
    footerButtons: [],
  }),

  watch: {
    '$i18n.locale': function() {
      this.setFooterButtons();
    }
  },
  
  created() {
    this.setFooterButtons();
  },

  methods: {
    setFooterButtons() {
      this.footerButtons = [
        {
          text: this.$t('footer.Footer.Impressum'),
          href: "https://www.tu-darmstadt.de/impressum/index.de.jsp",
          target: "_blank",
        },
        {
          text: this.$t('footer.Footer.Datenschutzerklearung'),
          href: import.meta.env.VITE_URL + "/datenschutz", // Eigene Datenschutzerklaerung
          target: "",
        },
        {
          text: this.$t('footer.Footer.FAQ'),
          href: import.meta.env.VITE_URL + "/faq",
          target: "",
        },
      ]
    }  
  },
};
</script>