<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        class="text-capitalize"
       
        variant="text"
        v-bind="props"
      >
        <v-icon start>
          mdi-translate
        </v-icon>
        {{ langs.get($i18n.locale) }}
        <v-icon
          size="small"
          end
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(lang, i) in Array.from(langs)"
        :key="`lang-${i}`"
        :value="lang"
        @click="changeLanguage(lang[0])"
      >
        <v-list-item-title>{{ lang[1] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Cookie from '@/Cookie.js';

export default {
  name: 'SelectLocale',
  data() {
    return { langs : new Map( [
        ['de', "Deutsch"],
        ['en', "English"]
      ])
    }
  },

  methods:{
    changeLanguage(lang){
      this.$i18n.locale = lang;
      Cookie.setCookie("language", lang, 7)
    }
  }
}
</script>
