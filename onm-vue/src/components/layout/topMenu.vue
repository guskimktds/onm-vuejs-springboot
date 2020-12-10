<template>
  <nav>
      <ul>
        <li><router-link to="/mypage">마이페이지</router-link></li>
        <li><router-link to="/login">로그인</router-link></li>
      </ul>
  </nav>
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

<style>
/* ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
nav {
  background: #444;
  padding: 14px 0;
  margin-bottom: 40px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 14px 0;
  margin-bottom: 40px;
} */
</style>