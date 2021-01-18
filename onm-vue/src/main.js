import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'

//import 'expose-loader?$!expose-loader?jQuery!jquery'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
