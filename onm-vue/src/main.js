import Vue from 'vue'
import App from './App.vue'
import Header from './components/layout/header.vue'
import Contents from './components/layout/contents.vue'
import Sidebar from './components/layout/sidebar.vue'
import Footer from './components/layout/footer.vue'
import VueRouter from 'vue-router'
//import Routes from './components/route'
import PlatformMain from './components/dashboard/platformMain.vue'
import ServiceMain from './components/dashboard/serviceMain.vue'
import VocMain from './components/dashboard/vocMain.vue'
import BizMain from './components/dashboard/bizMain.vue'
import NotFound from './components/exceptions/NotFound.vue'

Vue.config.productionTip = false
Vue.component('app-header', Header)
Vue.component('app-contents', Contents)
Vue.component('app-sidebar', Sidebar)
Vue.component('app-footer', Footer)

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
        path: "/", 
        name: 'PlatformMainPage',
        component: PlatformMain
    },
    { 
        path: "/service", 
        name: 'ServiceMainPage',
        component: ServiceMain
    },
    { 
        path: "/voc", 
        name: 'VocMainPage',
        component: VocMain
    },
    { 
        path: "/biz", 
        name: 'BizMainPage',
        component: BizMain
    },
    { 
        path: "*", 
        name: 'NotFoundPage',
        component: NotFound
    }
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
