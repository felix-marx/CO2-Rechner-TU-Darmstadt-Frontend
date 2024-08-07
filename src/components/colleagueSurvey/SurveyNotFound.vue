<template>
  <div class="text-center">
    <h3 class="text-center">
      {{ $t("colleagueSurvey.surveyNotFound.SurveyNotFound_0") }}
      {{ $route.params.umfrageID }} {{ $t("colleagueSurvey.surveyNotFound.SurveyNotFound_1") }}
    </h3>
    <p>
      {{ $t("colleagueSurvey.surveyCompleted.UmfrageVollstaendig_1") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SurveyNotFound",
};
</script>