<template>
  <!-- <div>
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn text v-for="menu in menuArray" :key="menu.name" v-on:click="changeTap(menu.children)" :to="menu.path">
          {{ menu.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div> -->
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-toolbar dense>
      <v-toolbar-items>
        <v-btn text v-for="menu in menuArray" :key="menu.name" v-on:click="changeTap(menu.children)" :to="menu.path">
          {{ menu.name }}
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon @click="nav_drawer = !nav_drawer" v-if="$vuetify.breakpoint.xsOnly"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>
        <span class="font-weight-light">{{title}}</span>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
        <v-btn text v-for="link in links" :key="link.icon" :to="link.route">
          <v-icon>
            {{ link.icon }}
          </v-icon>
          {{ link.text }}
        </v-btn>
        <v-btn text @click.native="signOutClicked">
          <v-icon>mdi-logout</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

  </v-app-bar>
</template>

<script>


import EventBus from '../../EventBus';

//로그인 시 서버에서 불러오면 수정해야함
//import menuArray from '../../mock/menuMock.json';
import {mapState} from 'vuex'

export default {
  data () {
    return {
      //menuArray: menuArray   
      //menuArray: []
      title: 'GiGAeyes O&M',
      links: [
        {icon: 'mdi-account', text:'My Page', name:'mypage', route: '/account'},
        {icon: 'mdi-login', text:'logIn', name:'signin', route: '/signin'},
        // {icon: 'account_circle2', text:'로그아웃', name:'signout', route: '/signout'},
      ]
    }
  },
  methods: {
    changeTap(childern){
      console.log(childern);
      EventBus.$emit('top-path', childern);
    },
    signOutClicked: function() {
      console.log("signOutClicked :"+this.$store.state.id)
      console.log(this.$store.state)
      this.$store
          .dispatch("LOGOUT", this.$store.state.id)
          .then( res => { console.log(res.status)})
          //.then(this.$router.replace('/signout'))
          .catch(({ message }) => (this.msg = message))
    }
  },
  computed: {
    ...mapState({ 
        menuArray: 'menu', 
      }),
  },
  created(){
    console.log("header.vue created load");
    console.log(this.$store.getters.getMenus);
    console.log("env : ",process.env);
    console.log(process.env);
    //this.menuArray = this.$store.state.menu;
    //this.menuArray = this.$store.getters.getMenus;
  }
  // beforeRouteEnter(to,from,next){
  //   console.log('beforeRouteEnter : '+'to : ',to,'from: ', from );
  //   next();
  // }
  ,
  updated() {
    console.log('header.vue updated')
  },
  mounted() {
    //let res = this.menuArray.filters(it => it.name.includes('/platform'))
    console.log('header.vue mounted : ')
  },
}
</script>

<style scoped>
/* nav {
  background: #666;
  padding: 14px 0;
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
} */

</style>