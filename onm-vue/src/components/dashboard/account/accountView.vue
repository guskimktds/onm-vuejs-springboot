<template>
  <div>
      <p>{{ title }}</p>
      <ul class="white">
          <li><router-link to="/account/mypage">마이페이지</router-link></li>
          <li><router-link to="/account/signout">로그아웃</router-link></li>
      </ul>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title: '계정관리 메인 뷰'
        }
    }
}
</script>

<style scoped>
li {
    display: inline-block; padding: 5px;
}
li a {
    font-weight: bold;
    color: black;
}
</style>