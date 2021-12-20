<template>
  <v-container class="pa-7">
    <v-row>
      <h4>
        Leiten Sie den folgenden Link an ihre Mitarbeitenden weiter, um ihnen
        Zugang zur Umfrage zu gewähren:
      </h4>
    </v-row>
    <v-row>
      <!--- Textfield for display of employee link --->
      <v-text-field
        ref="mitarbeiterLinkTextfield"
        v-model="mitarbeiterLink"
        outlined
        readonly
      />
      <v-btn
        dark
        x-large
        color="primary"
        @click="copyLink()"
      >
        Link kopieren
      </v-btn>
    </v-row>
    <v-row>
      <v-alert
        :value="copySuccessful"
        dense
        text
        type="success"
      >
        Link erfolgreich in die Zwischenablage kopiert.
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MitarbeiterLinkComponent",

  // Link for employees needs to be passed as prop (or write method which sets link)
  props: {
    mitarbeiterLink: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    copySuccessful: false,
  }),

  watch: {
    // timeout for letting message for successful copying disappear
    copySuccessful(new_val){
      if(new_val){
        setTimeout(()=>{this.copySuccessful=false},5000)
      }
    }  
  },

  methods: {
    /**
     * Copies the current value in mitarbeiterLinkTextfield to the clipboard.
     */
    copyLink: function () {
      let textToCopy =
        this.$refs.mitarbeiterLinkTextfield.$el.querySelector("input").value;

      // navigator.clipboard is not available in all browsers, therefore check for existence
      if (!navigator.clipboard) {
        // use deprecated methods if that is the case
        textToCopy.select();
        document.execCommand("copy");
      } else {
        // otherwise make use of the Clipboard API

        navigator.clipboard
          .writeText(textToCopy)
          .then(() => this.setCopySuccessful(true))
          .catch(() => this.setCopySuccessful(false));
      }
      // this.copySuccessful = true;
    },

    setCopySuccessful: function (value) {
      this.copySuccessful = value;
    },
  }
};
</script>