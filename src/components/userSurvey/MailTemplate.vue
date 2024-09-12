<!-- eslint-disable vue/no-v-html -->
<template>
  <v-card
    class="mt-2 mx-auto"
    elevation="2"
    border
    :max-width="constants.v_card_max_width"
  >
    <v-card class="pa-7">
      <h2> {{ $t('userSurvey.MailTemplate.MailVorlage_0') }} </h2>
      <br>
      <!-- Mail Text -->
      <p>**English version below**</p>
      <p>---</p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_1', 'de') }}</p>
      <p><label v-html="$t('userSurvey.MailTemplate.MailVorlage_2', 'de')" /> {{ umfrageJahr }}{{ $t('userSurvey.MailTemplate.MailVorlage_4', 'de') }}</p>
      <p>
        <a
          target="_blank"
          :href="umfrageLink"
        >{{ umfrageLink }}</a>
      </p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_5', 'de') }} {{ umfrageJahr }} {{ $t('userSurvey.MailTemplate.MailVorlage_6', 'de') }} </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_7', 'de') }} </p>
      <p v-if="mail!='UNKNOWN_MAIL'">
        {{ $t('userSurvey.MailTemplate.MailVorlage_8', 'de') }}
        <a
          target="_blank"
          :href="'mailto:'+ mail"
        >{{ mail }}</a>.
      </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_9', 'de') }} </p>
      <br>
      <p>**English version**</p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_1', 'en') }}</p>
      <p><label v-html="$t('userSurvey.MailTemplate.MailVorlage_2', 'en')" /> {{ umfrageJahr }}{{ $t('userSurvey.MailTemplate.MailVorlage_4', 'en') }}</p>
      <p>
        <a
          target="_blank"
          :href="umfrageLink"
        >{{ umfrageLink }}</a>
      </p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_5', 'en') }} {{ umfrageJahr }} {{ $t('userSurvey.MailTemplate.MailVorlage_6', 'en') }} </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_7', 'en') }} </p>
      <p v-if="mail!='UNKNOWN_MAIL'">
        {{ $t('userSurvey.MailTemplate.MailVorlage_8', 'en') }}
        <a
          target="_blank"
          :href="'mailto:'+ mail"
        >{{ mail }}</a>.
      </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_9', 'en') }} </p>
    </v-card>
  </v-card>
</template>

<script>
import constants from "@/const.js";

export default {
  name: "MailTemplate",

  props: {
    umfrageJahr: {
      default: "UNKNOWN_YEAR",
      type: String,
    },
    umfrageLink: {
      default: "UNKNOWN_LINK",
      type: String
    },
  },

  data: () => ({
    constants: constants,
  }),

  computed: {
    mail: function(){
      if (this.$keycloak.tokenParsed.email != undefined){
        return this.$keycloak.tokenParsed.email
      }
      else {
        return "UNKNOWN_MAIL"
      }
    }
  }
};
</script>