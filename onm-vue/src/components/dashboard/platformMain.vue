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
      title: 'VSaaS 플랫폼 현황 메인',
      // menus:[
      //   {
      //     name:'프로세스 현황', path: '/'
      //   },
      //   {
      //     name:'카메라상태 현황', path: 'camera'
      //   },
      //   {
      //     name:'VA 설정 현황', path: 'va'
      //   },
      //   {
      //     name:'스트리머 관리 현황', path: 'streamer'
      //   }
      // ]
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