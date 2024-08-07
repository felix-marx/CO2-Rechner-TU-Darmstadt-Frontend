import { createI18n } from 'vue-i18n'
import Cookie from '../Cookie'
import messages from '@intlify/unplugin-vue-i18n/messages'


function loadLanguage() {
  if(Cookie.checkIfCookieAttributExists("language")) {
    return Cookie.getCookieAttribut("language")
  }
  else {
    let lang = navigator.language.split('-')[0] || import.meta.env.VITE_I18N_LOCALE
    Cookie.setCookie("language", lang, 7)
    return lang
  }
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

export default new createI18n({
  locale: loadLanguage(),
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  messages: messages,
  numberFormats: numberFormats
})

