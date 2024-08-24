<template>
  <v-container>
    <v-row>
      <v-btn
        v-if="!props.buttonsRight"
        class="mr-1 px-0"
        :disabled="props.disabled"
        density="comfortable"
        icon="mdi-minus"
        style="margin-top: 2px"
        @click="decrement"
      />
      <v-text-field
        ref="textfield"
        v-model="model"
        :label="props.label"
        :rules="props.rules"
        :suffix="props.suffix"
        variant="outlined"
        :hide-spin-buttons="true"
        :disabled="props.disabled"
        density="compact"
      />
      <v-btn
        v-if="props.buttonsRight"
        class="ml-1 mr-1 px-0"
        :disabled="props.disabled"
        density="comfortable"
        icon="mdi-minus"
        style="margin-top: 2px"
        @click="decrement"
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
const model = defineModel({type: String});

const props = defineProps({
  defaultValue: {
    type: String,
    default: '0'
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
  },
  buttonsRight: {
    type: Boolean,
    default: false
  }
});


// created
model.value = props.defaultValue;

function increment() {
  let value = parseInt(model.value);

  if (isNaN(value)) {
    reset();
    return;
  }

  if (props.max === null) {
    model.value = (value + 1).toString();
  }
  else if (value < props.max) {
    model.value = (value + 1).toString();
  }
}

function decrement() {
  let value = parseInt(model.value);

  if (isNaN(value)) {
    reset();
    return;
  }

  if (props.min === null) {
    model.value = (value - 1).toString();
  }
  else if (value > props.min) {
    model.value = (value - 1).toString();
  }
}

function validate() {
  this.$refs.textfield.validate();
}

function resetValidation() {
  this.$refs.textfield.resetValidation();
}

function reset() {
  model.value = props.defaultValue;
}

defineExpose({
  validate,
  resetValidation,
  reset
});
</script>