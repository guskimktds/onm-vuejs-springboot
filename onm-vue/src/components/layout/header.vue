<template>
  <nav>
      <ul> 
        <li v-for="menu in menuArray" :key="menu.name" v-on:click="changeTap(menu.children)">
          <router-link to="menu.path">{{menu.name}}</router-link>
        </li>
      </ul>
  </nav>
</template>

<script>


import EventBus from '../../EventBus';

//로그인 시 서버에서 불러오면 수정해야함
import menuArray from '../../mock/menuMock.json';

export default {
  data () {
    return {
      menuArray: menuArray      
    }
  },
  methods: {
    changeTap(childern){
      console.log(childern);
      EventBus.$emit('top-path', childern);
    }
  }
}
</script>

<style scoped>
nav {
  background: #666;
  padding: 14px 0;
  /* margin-bottom: 40px; */
}
a {
  color: #fff;
  text-decoration: none;
  padding: 14px 0;
  margin-bottom: 40px;
  cursor: pointer;
}
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 15px;
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

</style>