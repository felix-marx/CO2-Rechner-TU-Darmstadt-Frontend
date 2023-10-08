<template>
  <div class="text-center">
    <h3 class="text-center">
      {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_0') }}
      "{{ this.$route.params.umfrageID }}" {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_1') }}
    </h3>
    <p>
      {{ $t('evaluation.ResultSharingDisabled.ResultSharingDisabled_2') }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ResultSharingDisabled",

};
</script>