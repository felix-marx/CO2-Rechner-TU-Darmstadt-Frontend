<template>
  <div class="text-center">
    <h3 class="text-center">
      Es tut uns leid, aber die Umfrage mit ID
      "{{ this.$route.params.umfrageID }}" konnte nicht gefunden werden.
    </h3>
    <p>
      Bitte wenden Sie sich an die Person, von der Sie den Link für die Umfrage erhalten haben.  
    </p>
  </div>
</template>

<script>
export default {
  name: "SurveyNotFound",
};
</script>