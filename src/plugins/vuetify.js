import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
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
  breakpoint: {
    mobileBreakpoint: 'sm'
  },
});
