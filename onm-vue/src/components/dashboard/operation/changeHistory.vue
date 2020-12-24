<template>
  <div>
    <p>{{ title }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '관리자 변경 이력'
    }
  }
}
</script>

<style scoped>

</style>