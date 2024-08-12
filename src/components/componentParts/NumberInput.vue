<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn
          @click="decrement"
        >
          <v-icon>
            mdi-minus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10">
        <v-text-field
          v-model="fieldValue"
          :label="props.label"
        />
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="increment"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "NumberInput",
}
</script>

<script setup>
import { ref } from 'vue';

const fieldValue = ref(0);

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
fieldValue.value = props.defaultValue;

function increment() {
  if (props.max === null) {
    fieldValue.value++;
  }
  else if (fieldValue.value < props.max) {
    fieldValue.value++;
  }
}

function decrement() {
  if (props.min === null) {
    fieldValue.value--;
  }
  else if (fieldValue.value > props.min) {
    fieldValue.value--;
  }
}

</script>