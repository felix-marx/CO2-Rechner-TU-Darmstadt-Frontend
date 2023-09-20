<template>
  <v-card
    class="mt-2"
    elevation="2"
    outlined
  >
    <v-card class="pa-7">
      <h2> {{ $t('userSurvey.MailTemplate.MailVorlage_0') }} </h2>
      <br>
      <!-- Mail Text -->
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_1') }}</p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_2') }}<sub>2</sub>{{ $t('userSurvey.MailTemplate.MailVorlage_3') }} {{ umfrageJahr }}  {{ $t('userSurvey.MailTemplate.MailVorlage_4') }}</p>
      <p>
        <a
          target="_blank"
          :href="umfrageLink"
        >{{ umfrageLink }}</a>
      </p>
      <p>{{ $t('userSurvey.MailTemplate.MailVorlage_5') }} {{ umfrageJahr }} {{ $t('userSurvey.MailTemplate.MailVorlage_6') }} </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_7') }} </p>
      <p v-if="mail!='UNKNOWN_MAIL'">
        {{ $t('userSurvey.MailTemplate.MailVorlage_8') }}
        <a
          target="_blank"
          :href="'mailto:'+ mail"
        >{{ mail }}</a>.
      </p>
      <p> {{ $t('userSurvey.MailTemplate.MailVorlage_9') }} </p>
    </v-card>
  </v-card>
</template>

<script>

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