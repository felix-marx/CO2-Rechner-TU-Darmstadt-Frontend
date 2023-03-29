<template>
  <v-menu
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-capitalize"
        v-bind="attrs"
        text
        v-on="on"
      >
        <v-icon left>
          mdi-translate
        </v-icon>
        {{ langs.get($i18n.locale) }}
        <v-icon
          small
          right
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(lang, i) in Array.from(langs)"
        :key="`lang-${i}`"
        :value="lang"
        @click="$i18n.locale = lang[0]"
      >
        <v-list-item-title>{{ lang[1] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'SelectLocale',
  data() {
    return { langs : new Map( [
        [ 'en', "English" ],
        [ 'de', "Deutsch"]
      ])
    }
  }
}
</script>
