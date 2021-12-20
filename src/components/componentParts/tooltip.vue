<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">
        mdi-help-circle-outline
      </v-icon>
    </template>
    {{ tooltipText }}
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip",

  props: {
    tooltipText: {
      default: "missing text",
      type: String
    }
  },
};
</script>
