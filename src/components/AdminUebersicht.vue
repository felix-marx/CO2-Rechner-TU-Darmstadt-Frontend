<template>
  <v-card>
    Lorem Ipsum
  </v-card>
</template>

<script>
  export default {
      name: "AdminUebersicht",

      methods: {
      /**
       * Fetches all existent Umfragen from the Server.
       */
      /*
      fetchUmfragen: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/alleUmfragen")
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.umfragen = data.data.umfragen;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      },
      */
      }
      
  }
</script>