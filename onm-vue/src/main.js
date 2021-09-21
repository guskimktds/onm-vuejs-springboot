 import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import VueSimpleAlert from "vue-simple-alert"

import ('./assets/css/font-awesome.min.css')
import ('./assets/css/materialdesignicons.min.css')
import ('./assets/css/fonts.googleapis-Material+Icons.css')
import ('./assets/css/fonts.googleapis-Roboto.css')
//import 'expose-loader?$!expose-loader?jQuery!jquery'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueSimpleAlert, { reverseButtons: true } )

new Vue({
    render: h => h(App),
    router,
    vuetify,
    store
}).$mount('#app')