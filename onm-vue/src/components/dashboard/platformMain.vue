<template>
  <div>
    <p>{{ title }}</p>
    <div>
      <span>Sub component 화면을 추가한다.</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'VSaaS 플랫폼 현황 메인'
    }
  }
}
</script>

<style scoped>
p {
  height: 80px;
  /* margin: -25px -25px 25px -25px; */
  margin: 5px 5px 5px 5px;
  padding: 0 25px;
  line-height: 76px;
  font-size: 24px;
  font-weight: 400;
  background: #ddd;
}


</style>