<template>
  <v-container>
    <v-card
      :max-width="constants.v_card_max_width"
      elevation="2"
      border
      class="mx-auto"
    >
      <div class="text-center">
        <h3 class="text-center">
          {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_0') }}
          "{{ $route.params.umfrageID }}" {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_1') }}
        </h3>
        <p>
          {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_2') }}
        </p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import constants from "@/const.js";

export default {
  name: "ResultSharingDisabled",

  data() {
    return {
      constants: constants,
    }
  },
};
</script>