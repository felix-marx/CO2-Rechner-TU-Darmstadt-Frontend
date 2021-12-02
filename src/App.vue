<template>
  <v-app>
    <v-main>
      <Umfrage/>
      <Mitarbeiterumfrage/>
    </v-main>
  </v-app>
</template>

<script>
import Umfrage from './components/umfrage.vue';
import Mitarbeiterumfrage from './components/mitarbeiterUmfrage.vue';

export default {
  name: 'App',

  components: {
    Umfrage,
    Mitarbeiterumfrage
},

  data: () => ({
    //
  }),
};
</script>
