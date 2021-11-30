<template>
  <v-app>
    <v-main>
      <Uebersicht/>
    </v-main>
  </v-app>
</template>

<script>
import Uebersicht from './components/uebersichtUmfragen';

export default {
  name: 'App',

  components: {
    Uebersicht,
  },

  data: () => ({
    //
  }),
};
</script>
