<template> 
    
  <!-- <div id='app'>
    <div v-show="isShowMenu" id='navContainer'>
      <app-sidebar></app-sidebar>
    </div>  
    <div id='mainContainer'>
      <div id='contentBody'>
        <app-topMenu></app-topMenu>
        <div v-show="isShowMenu">
          <app-header></app-header> 
        </div> 
        <app-contents></app-contents> 
        <router-view></router-view> 
      </div>
      <div id='contentFooter'>    
        <div v-show="isShowMenu">
          <app-footer></app-footer>
        </div>
      </div>
    </div>
  </div> -->
  <v-app>
    <!-- <app-topMenu></app-topMenu> -->
    <app-header></app-header> 
    <app-sidebar></app-sidebar>
    <app-contents></app-contents> 

  </v-app>
</template>

<script>

// import TopMenu from './components/layout/topMenu.vue'
import Sidebar from './components/layout/sidebar.vue'
import Header from './components/layout/header.vue'
import Contents from './components/layout/contents.vue'
// import Footer from './components/layout/footer.vue'

//import store from './store'

export default {
  name: 'App',
  components: {
    'app-sidebar': Sidebar,
    // 'app-topMenu': TopMenu,
    'app-header': Header,
    'app-contents':Contents
    // 'app-footer': Footer
  },
  data(){
    return {
      //title : 'Root components',
      isShowMenu : true, 
      expandOnHover: false
    }
  },
  created() {
    console.log("App.vue store 에서 state 읽기");
    //console.log(store.state.isAuthenticated);
    //console.log(store.state.menu);
    //this.isShowMenu = store.state.isAuthenticated
    console.log(this.$store.state.menu)
    console.log(this.$store.state.isAuthenticated)
  },
  updated() {
    console.log('App.vue updated');
    console.log(this.$store.getters.getMenus);
  },
  mounted() {
    console.log('App.vue mounted')
  },
}
</script>

<style scoped>
/* #app {
  display: flex;
  min-height: 100%;
  min-width: 100%;
}

#navContainer {
  width: 250px;
  height: 100vh;
  background: #404040;
}

#mainContainer {
  flex: 1;
  padding: 0 3px;
  background: #f5f5f5;
}

#contentFooter {
  position:absolute;
  bottom:0;
  width:100%;
  height:50px;   
    background:#ccc;
} */

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
