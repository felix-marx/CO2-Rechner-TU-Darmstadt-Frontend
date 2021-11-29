<template>
  <v-app>
    <v-main>
      <Umfrage/>
    </v-main>
  </v-app>
</template>

<script>
import Umfrage from './components/mitarbeiterUmfrage.vue';

export default {
  name: 'App',

  components: {
    Umfrage
},

  data: () => ({
    //
  }),
};
</script>
