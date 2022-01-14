<template>
  <!-- general tooltip component. Small "pop-up" when hovering with mouse over circle with question mark -->
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
    // text to show as tooltip
    tooltipText: {
      default: "missing text",
      type: String
    }
  },
};
</script>
