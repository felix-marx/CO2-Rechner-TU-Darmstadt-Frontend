<template>
  <v-container>
    <v-row>
      <v-btn
        class="mr-1 px-0"
        :disabled="props.disabled"
        density="comfortable"
        icon="mdi-minus"
        rounded="0"
        style="margin-top: 2px"
        @click="decrement"
      />
      <v-text-field
        v-model="model"
        :label="props.label"
        :rules="props.rules"
        :suffix="props.suffix"
        variant="outlined"
        type="number"
        :hide-spin-buttons="true"
        :disabled="props.disabled"
        density="compact"
      />
      <v-btn
        class="ml-1"
        :disabled="props.disabled"
        density="comfortable"
        icon="mdi-plus"
        style="margin-top: 2px"
        @click="increment"
      />
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "NumberInput",
}
</script>

<script setup>
const model = defineModel({type: Number});

const props = defineProps({
  defaultValue: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  suffix: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  }
});


// created
model.value = props.defaultValue;

function increment() {
  if (props.max === null) {
    model.value++;
  }
  else if (model.value < props.max) {
    model.value++;
  }
}

function decrement() {
  if (props.min === null) {
    model.value--;
  }
  else if (model.value > props.min) {
    model.value--;
  }
}

</script>