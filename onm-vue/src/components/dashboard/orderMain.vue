<template>
  <div>
      <p>{{ title }}</p>
      <router-view></router-view>
  </div>  
</template>

<script>
export default {
    data(){        
        return {
            title: '청약정보메인 page'
        }
    }
}
</script>

<style>

</style>