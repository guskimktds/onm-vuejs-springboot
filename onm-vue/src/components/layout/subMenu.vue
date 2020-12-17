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

<style>

</style>