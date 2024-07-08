<template>
  <!-- general tooltip component. Small "pop-up" when hovering with mouse over circle with question mark -->
  <v-tooltip
    bottom
    :max-width="constants.v_tooltip_max_width"
    :nudge-width="constants.v_tooltip_max_width"
  >
    <template v-slot:activator="{ on }">
      <v-icon
        class="mb-1"
        v-on="on"
        @click="() => {}"
      >
        {{ tooltipIcon }}
      </v-icon>
    </template>
    {{ tooltipText }}
  </v-tooltip>
</template>

<script>
import constants from "../../const.js";

export default {
  name: "Tooltip",

  props: {
    tooltipText: {
      default: "missing text",
      type: String
    },
    tooltipIcon: {
      default: "mdi-help-circle-outline",
      type: String
    }
  },

  data: () => ({
    constants: constants
  })
};
</script>
