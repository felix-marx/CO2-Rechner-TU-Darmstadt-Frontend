<template>
  <v-container>
    <v-row>
      <v-btn
        class="mr-1"
        size="x-large"
        @click="decrement"
      >
        <v-icon>
          mdi-minus
        </v-icon>
      </v-btn>
      <v-text-field
        v-model="model"
        :label="props.label"
        variant="outlined"
        type="number"
        :hide-spin-buttons="true"
      />
      <v-btn
        class="ml-1"
        size="x-large"
        @click="increment"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
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