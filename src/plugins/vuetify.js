import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#009d81',
            // TODO different colors for theme
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
            
          },
        },
      },
});
