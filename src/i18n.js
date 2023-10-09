import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from './Cookie'

Vue.use(VueI18n)

function loadLanguage() {
  if(Cookie.checkIfCookieAttributExists("language")) {
    return Cookie.getCookieAttribut("language")
  }
  else {
    let lang = navigator.language.split('-')[0] || process.env.VUE_APP_I18N_LOCALE
    Cookie.setCookie("language", lang, 7)
    return lang
  }
}

function loadLocaleMessages () {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const numberFormats = {
  'de': {
    currency: {
      style: 'currency', currency: 'EUR'
    },
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    }
  },
  'en': {
    currency: {
      style: 'currency', currency: 'USD'
    },
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0
    }
  }
}

export default new VueI18n({
  locale: loadLanguage(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages(),
  numberFormats: numberFormats
})

