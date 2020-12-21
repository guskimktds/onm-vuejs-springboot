<template>
  <div>
      <ul>
        <li v-for="menu in menus" :key="menu.name">
            <router-link v-bind:to="menu.path">
            {{ menu.name }}            
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: ['menus'],
    data(){
        return {
            title: "submenu 화면"
        }
    }
}
</script>

<style scoped>

a {
  cursor: pointer;
}

ul {
  list-style: none;
}

ul a {
  position: relative;
  display: block;
  /* padding: 15px 15px 17px 50px; */
  padding: 10px 10px 10px 18px;
  color: #fff;
  border-bottom: 1px solid darken(#404040, 5%);
  font-size: 13px;
}


</style>