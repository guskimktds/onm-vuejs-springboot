<template>
  <!-- <div>
    <nav class="teal">
        <router-link to="/account">마이페이지</router-link>
        <router-link to="/signin">로그인</router-link>
        <router-link @click.native="signOutClicked" to="/signout">로그아웃</router-link>
        <router-link to="/signup">계정생성</router-link>
    </nav>
  </div> -->
  <div>
    <v-toolbar dense dark>
      <v-app-bar-nav-icon @click="nav_drawer = !nav_drawer" v-if="$vuetify.breakpoint.xsOnly"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">{{title}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
        <!-- <v-btn router :to="account">마이페이지</v-btn>
        <v-btn text><router-link to="/signin">로그인</router-link></v-btn>
        <v-btn text><router-link @click.native="signOutClicked" to="/signout">로그아웃</router-link></v-btn> -->
        <v-btn text v-for="link in links" :key="link.icon" :to="link.route">
          {{ link.text }}
        </v-btn>
        <v-btn text @click.native="signOutClicked">로그아웃</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>



<script>
export default {
  data () {
    return {
      title: 'GiGAeyes O&M',
      links: [
        {icon: 'home', text:'마이페이지', name:'mypage', route: '/account'},
        {icon: 'account_circle', text:'로그인', name:'signin', route: '/signin'},
        // {icon: 'account_circle2', text:'로그아웃', name:'signout', route: '/signout'},
      ]
    }
  },
  methods: {
    signOutClicked: function() {
      console.log("signOutClicked :"+this.$store.state.id)
      console.log(this.$store.state)
      this.$store
          .dispatch("LOGOUT", this.$store.state.id)
          .then( res => { console.log(res.status)})
          //.then(this.$router.replace('/signout'))
          .catch(({ message }) => (this.msg = message))
    }
  }
}
</script>

<style scoped>
/* ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
} */
/* nav {
  background: #000;
  padding: 14px 0;
  padding-right: 20px;
  margin-bottom: 1px;
  text-align: right;
} */
/* a {
  color: #fff;
  text-decoration: none;
  padding: 14px 0;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 12px;
} */
/* nav {
  text-align: right;
  padding-right: 20px;
} */
/* nav a {
  font-weight: bold; 
  color: white;
} */
</style>