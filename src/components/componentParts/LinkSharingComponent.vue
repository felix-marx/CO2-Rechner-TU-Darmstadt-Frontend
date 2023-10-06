<template>
  <v-container class="pa-7">
    <v-row>
      <h4>
        {{ $t('componentParts.LinkSharingComponent.Link_0') }} {{ this.$props.linkZiel }} {{ $t('componentParts.LinkSharingComponent.Link_1') }}
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
        {{ $t('componentParts.LinkSharingComponent.Link_Button') }}
      </v-btn>
    </v-row>
    <v-row>
      <v-alert
        :value="copySuccessful"
        dense
        text
        type="success"
      >
        {{ $t('componentParts.copyButton.LinkInZwischenablage') }}
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LinkSharingComponent",

  // Link for employees needs to be passed as prop (or write method which sets link)
  props: {
    mitarbeiterLink: {
      type: String,
      default: "",
    },
    linkZiel: {
      type: String,
      default: "Umfrage",
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
      // navigator.clipboard is not available in all browsers, therefore check for existence
      if (!navigator.clipboard) {
        // use deprecated methods if that is the case
        this.mitarbeiterLink.select();
        document.execCommand("copy");
      } else {
        // otherwise make use of the Clipboard API

        navigator.clipboard
          .writeText(this.mitarbeiterLink)
          .then(() =>  {
          if(this.mitarbeiterLink !== "UNDEFINED_CLIPBOARD_TEXT"){
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