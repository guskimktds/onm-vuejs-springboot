<template>
  <div id='sidebar'>
    <header>
      <span></span>
        {{ menu }}
      <a></a>
    </header>
    <ul>
      <!-- <li><span>Navigation</span></li> -->
      <li v-for="subMenu in newMenus" :key="subMenu.name">
        <router-link v-bind:to="subMenu.path">
          {{ subMenu.name }}
          
        </router-link>
        <sub-menu :menus="subMenu.children"></sub-menu>

      </li>
    </ul>
  </div>
</template>

<script>

import EventBus from '../../EventBus';
import subMenu from './subMenu.vue';

export default {
  //props:['subMenus'],
  components: {
    'sub-menu': subMenu
  },
  data () {
    return {
      menu: 'GiGAeyes O&M',
      newMenus: [] 
    }
  },
  created(){
      EventBus.$on('top-path', (payload)=>{          
        //console.log(payload)
        this.newMenus = payload
      });
  },
  methods: {
    openSubMenu: function(){
      console.log("open sub");
    }
  }
}
</script>

<style scoped>

#sidebar {
  background: #222;
  padding: 6px;
  height: 100%;
}


*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before, *:after {
  content: '';
  display: block;
  position: absolute;
}

html, body {
  height: 100%;
}

body {
  font: 15px/1 'Open Sans', sans-serif;
  color: #777;
}

a {
  cursor: pointer;
}

ul {
  list-style: none;
}


header {
  position: relative;
  height: 80px;
  padding: 20px 0 0 15px;
  font-size: 14px;
  color: #fff;
  background: darken(#404040, 5%);
}
header span {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 0 10px 0 0;
  vertical-align: middle;
  border: 1px solid #fff;
}

header span:before {
  content: '\f007';
  font: normal 20px fontawesome;
  top: 7px;
  left: 9px;
}

header a:before {
  content: '\f08b';
  font: normal 20px fontawesome;
  top: 28px;
  right: 15px;
}

ul span {
  display: block;
  padding: 15px;
  color: rgba(255,255,255,.5);
  text-transform: uppercase;
  border-bottom: 1px solid darken(#404040, 5%);;
}

ul a {
  position: relative;
  display: block;
  /* padding: 15px 15px 17px 50px; */
  padding: 15px 15px 15px 50px;
  color: #fff;
  border-bottom: 1px solid darken(#404040, 5%);
  font-size: 13px;
}

ul a:hover,
ul a.active {
  background: lighten(#404040, 7.5%);
}

ul a:before {
  font: normal 14px fontawesome;
  top: 15px;
  left: 18px;
}

/* ul li:nth-child(1) a:before { content: '\f08b'; } */
ul li:nth-child(1) a:before { content: '\f00a'; }
ul li:nth-child(2) a:before { content: '\f012'; }
ul li:nth-child(3) a:before { content: '\f018'; }
ul li:nth-child(4) a:before { content: '\f024'; }
ul li:nth-child(5) a:before { content: '\f0c3'; }
ul li:nth-child(6) a:before { content: '\f09b'; }
ul li:nth-child(7) a:before { content: '\f0fa'; }
ul li:nth-child(8) a:before { content: '\f002'; }
ul li:nth-child(9) a:before { content: '\f085'; }
ul li:nth-child(10) a:before { content: '\f08b'; }


</style>