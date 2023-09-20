<template>
  <v-app>
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="true"
    />
    <v-main class="mb-16">
      <v-container>
        <v-card elevation="0">
          Test
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../componentParts/Header.vue'
import Footer from '../footer/Footer.vue'
import loadingAnimation from '../componentParts/LoadingAnimation.vue'

export default {
    name: "FAQ",
    components: {
        Header,
        Footer
    },
    data: () => ({
        tabList: [{ id: 0, title: 'FAQ', componentType: loadingAnimation}],
    }),
}

</script>