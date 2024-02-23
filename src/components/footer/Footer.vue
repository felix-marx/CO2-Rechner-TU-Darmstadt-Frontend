<template>
  <!--- Footer --->
  <v-footer
    padless
    fixed
    bottom
  >
    <v-card
      text
      tile
      width="100%"
      class="primary text-center"
    >
      <v-row justify="center">
        <v-card-text>
          <!--- Contact Dialog --->
          <Contact />

          <v-btn
            v-for="(fElem, index) in footerButtons"
            :key="'footerButton-' + index"
            :href="fElem.href"
            class="mx-4"
            :target="fElem.target"
            text
          >
            <span class="mx-2 white--text">{{ fElem.text }}</span>
          </v-btn>
        </v-card-text>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
import Contact from "../footer/Contact.vue";
import i18n from "@/i18n";

export default {
  name: "Footer",
    components: {
      Contact,
  },

  data: () => ({
    padless: true,
    dialog: false,
    
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
          text: i18n.t('footer.Footer.Impressum'),
          href: "https://www.tu-darmstadt.de/impressum/index.de.jsp",
          target: "_blank",
        },
        {
          text: i18n.t('footer.Footer.Datenschutzerklearung'),
          href: process.env.VUE_APP_URL + "/datenschutz", // Eigene Datenschutzerklaerung
          target: "",
        },
        {
          text: i18n.t('footer.Footer.FAQ'),
          href: process.env.VUE_APP_URL + "/faq",
          target: "",
        },
      ]
    }  
  },
};
</script>