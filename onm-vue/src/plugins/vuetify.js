import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

// export default new Vuetify({
// });

export default new Vuetify({ // option을 지정한 Vuetify instance 생성해서 export
    icons: {
        iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
    theme: {
        dark: false,
    },
    themes: {
        light: {
            primary: '#4682b4',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
        },
        dark: {
            primary: colors.blue.lighten3,
        },
    },
});