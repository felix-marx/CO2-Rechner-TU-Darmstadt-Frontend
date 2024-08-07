import { createVuetify } from "vuetify";
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default new createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#008877',
          secondary: '#358576',
          accent: '#8c9eff',
          error: '#b71c1c',
          add: '#999999',
          add_text: '#FFFFFF',
          delete: '#ee6363',
          delete_text: '#FFFFFF',
          blue: "#42A5F5",
          background: "#F0F0F0",
        }, 
      },
    },
  },
  breakpoint: {
    mobileBreakpoint: 'sm'
  },
});
