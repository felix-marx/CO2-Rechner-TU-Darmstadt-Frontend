<template>
  <!-- general tooltip component. Small "pop-up" when hovering with mouse over circle with question mark -->
  <v-tooltip
    location="bottom"
    :max-width="constants.v_tooltip_max_width"
  >
    <template #activator="{ props }">
      <v-icon
        class="mb-1"
        v-bind="props"
        @click="() => {}"
      >
        {{ tooltipIcon }}
      </v-icon>
    </template>
    {{ tooltipText }}
  </v-tooltip>
</template>

<script>
import constants from "@/const.js";

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
