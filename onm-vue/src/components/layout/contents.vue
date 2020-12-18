<template>
  <content>
    <p>{{ contents }}</p>
     <router-view></router-view>     
  </content>
</template>

<script>
export default {
  data () {
    return {
      contents: 'ONM contents'
    }
  }
}
</script>

<style scoped>
/* content {
  background: #222;
  padding: 6px;
}
p{
  color: lightgreen;
  text-align: center;
} */
</style>