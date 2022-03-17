<template>
  <v-container class="py-0">
    <v-row>
      <v-col>
        <v-btn
          dark
          outlined
          color="primary"
          @click="copyLink()"
        >
          {{ buttonText }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="py-0"
      >
        <v-alert
          :value="copySuccessful"
          dense
          text
          type="success"
        >
          Link erfolgreich in die Zwischenablage kopiert.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CopyButton",

  // Link for employees needs to be passed as prop (or write method which sets link)
  props: {
    buttonText: {
      type: String,
      default: "",
    },
    textToCopy: {
      type: String,
      default: "UNDEFINED_CLIPBOARD_TEXT",
    }
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

      // navigator.clipboard is not available in all browsers, therefore check for existence
      if (!navigator.clipboard) {
        // use deprecated methods if that is the case
        this.textToCopy.select();
        document.execCommand("copy");
      } else {
        // otherwise make use of the Clipboard API

        navigator.clipboard
          .writeText(this.textToCopy)
          .then(() =>  {
          if(this.textToCopy !== "UNDEFINED_CLIPBOARD_TEXT"){
            this.setCopySuccessful(true);
          }
          })
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