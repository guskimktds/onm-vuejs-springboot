<template>
  <footer>
    <p>{{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      copyright: 'Copyright 2020 GiGAeyes O&M Admin page'
    }
  }
}
</script>

<style scoped>
footer{
  background: #222;
  padding: 8px 2px 2px 2px;
}
p{
  color: lightgreen;
  text-align: center;
}
</style>