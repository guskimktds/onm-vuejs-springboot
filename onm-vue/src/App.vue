<template> 
    
  <div id='app'>
    <div id='navContainer'>
      <app-sidebar v-bind:subMenus="subMenus"></app-sidebar>
    </div>  
    <div id='mainContainer'>
      <app-topHeader></app-topHeader>
      <app-header></app-header>    
      <router-view></router-view>     
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>

import TopMenu from './components/layout/topMenu.vue'
import Header from './components/layout/header.vue'
//import Contents from './components/layout/contents.vue'
import Sidebar from './components/layout/sidebar.vue'
import Footer from './components/layout/footer.vue'

// import PlatformMain from './components/dashboard/platformMain.vue'
// import ServiceMain from './components/dashboard/serviceMain.vue'
// import VocMain from './components/dashboard/vocMain.vue'
// import BizMain from './components/dashboard/bizMain.vue'
//import Header from './components/layout/header.vue'

// const menuObject = {
//   platfrom: [
//     {name: 'process 현황', path: 'process'},
//     {name: '카메라상태 현황', path: 'camera'},
//     {name: 'va 설정 현황', path: 'va'},
//     {name: '스트리머 관리 현황', path: 'streamer'},
//   ],
//   service: [
//     {name: '사용자정보', path: 'userinfo'},
//     {name: '사용자 상품정보', path: 'user-productinfo'},
//     {name: '사용자 요약정보', path: 'user-summary'},
//     {name: 'VA 상품 및 카메라 대수 확인', path: 'va-product-camera-count'},
//   ]
// }

export default {
  name: 'App',
  components: {
    // 'platform-main': PlatformMain,
    // 'service-main': ServiceMain,
    // 'voc-main': VocMain,
    // 'biz-main': BizMain,
    'app-sidebar': Sidebar,
    'app-topHeader': TopMenu,
    'app-header': Header,
    'app-footer': Footer
  },
  data(){
    return {
      title : 'Root components',
      subMenus: {
        platform: [
          {name: 'process 현황', path: 'process'},
          {name: '카메라상태 현황', path: 'camera'},
          {name: 'va 설정 현황', path: 'va'},
          {name: '스트리머 관리 현황', path: 'streamer'},
        ],
        service: [
          {name: '사용자정보', path: 'userinfo'},
          {name: '사용자 상품정보', path: 'user-productinfo'},
          {name: '사용자 요약정보', path: 'user-summary'},
          {name: 'VA 상품 및 카메라 대수 확인', path: 'va-product-camera-count'},
        ]
      }
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100%;
}

#navContainer {
  width: 250px;
  height: 700px;
  background: #404040;
}

#mainContainer {
  flex: 1;
  padding: 0 3px;
  background: #f5f5f5;
}

/* .flex-grid {
  display: flex;
}

.flex-grid > div {
  flex: 1;
  margin: 0 20px 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
} */

/* .flex-grid > div:last-child {
  margin-right: 0;
} */

/* .flex-grid h2 {
  margin: -15px -15px 15px -15px;
  padding: 12px 15px;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid #ddd;
} */

/* .flex-grid li {
  position: relative;
  margin: 0 0 10px;
  padding: 0 0 0 25px;
}

.flex-grid li:before {
  content: '\f00c';
  font: normal 16px fontawesome;
  top: 0;
  left: 0;
  color: #999;
} */

</style>
