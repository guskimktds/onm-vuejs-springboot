<template>
  <div>
    <nav class="teal">
        <router-link to="/account">마이페이지</router-link> |
        <router-link to="/signin">로그인</router-link> |
        <router-link to="/signout">로그아웃</router-link>
        <!-- <router-link to="/signup">계정생성</router-link> -->
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //title: 'onm-header'
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
nav {
  background: #000;
  padding: 14px 0;
  padding-right: 20px;
  margin-bottom: 1px;
  text-align: right;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 14px 0;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 12px;
}
/* nav {
  text-align: right;
  padding-right: 20px;
} */
/* nav a {
  font-weight: bold; 
  color: white;
} */
</style>