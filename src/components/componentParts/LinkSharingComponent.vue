<template>
  <v-container>
    <v-row>
      <h4>
        {{ $props.text }}
      </h4>
    </v-row>

    <!-- Desktop -->
    <template v-if="!$vuetify.display.mobile">
      <v-row>
        <!--- Textfield for display of employee link --->
        <v-text-field
          ref="mitarbeiterLinkTextfield"
          v-model="localMitarbeiterLink"
          variant="outlined"
          readonly
        />
        <v-btn
          size="x-large"
          color="primary"
          @click="copyLink()"
        >
          {{ $t('componentParts.LinkSharingComponent.Link_Button') }}
        </v-btn>
      </v-row>
    </template>

    <!-- Mobile -->
    <template v-else>
      <v-row>
        <!--- Textfield for display of employee link --->
        <v-text-field
          ref="mitarbeiterLinkTextfield"
          v-model="localMitarbeiterLink"
          variant="outlined"
          readonly
        />
      </v-row>
      <v-row class="mb-0">
        <v-btn
          color="primary"
          @click="copyLink()"
        >
          {{ $t('componentParts.LinkSharingComponent.Link_Button') }}
        </v-btn>
      </v-row>
    </template>
    
    <v-row>
      <v-alert
        class="my-4"
        :model-value="copySuccessful"
        density="compact"
        variant="tonal"
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
    text: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    copySuccessful: false,
  }),

  computed: {
    localMitarbeiterLink: function () {
      return this.mitarbeiterLink;
    },
  },

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