import Vue from 'vue'
// import Vuetify from 'vuetify/lib/framework'
import Vuetify from 'vuetify/lib'
// import colors from 'vuetify/lib/util/colors'
import '@/sass/overrides.sass'

Vue.use(Vuetify);

// export default new Vuetify({
// });

const theme = {
    primary: '#4CAF50',
    secondary: '#9C27b0',
    accent: '#9C27b0',
    info: '#00CAE3',
}

export default new Vuetify({ // option을 지정한 Vuetify instance 생성해서 export
    icons: {
        iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
        // iconfont: 'mdiSvg'
    },
    // theme: {
    //     dark: false,
    // },
    // themes: {
    //     light: {
    //         primary: '#4682b4',
    //         secondary: '#b0bec5',
    //         accent: '#8c9eff',
    //         error: '#b71c1c',
    //     },
    //     dark: {
    //         primary: colors.blue.lighten3,
    //     },
    // },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    },
});