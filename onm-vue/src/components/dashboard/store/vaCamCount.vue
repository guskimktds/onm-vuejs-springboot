<style src="../../../css/body.css"></style>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <vaCamCount-query v-on:search="searchToVaCamCount"></vaCamCount-query>
    <vaCamCount-list v-bind:pList=pList></vaCamCount-list>
  </div>

</template>

<script>
import VaCamCountList from './va-cam-count/vaCamCountList'
import VaCamCountQuery from './va-cam-count/vaCamCountQuery'

export default {
  components: {
    'vaCamCount-list': VaCamCountList,
    'vaCamCount-query': VaCamCountQuery
  },
  data () {
    return {
      title: 'VA상품 및 카메라 대수 확인',
      pList: [
        {usrId: "0009755665", productCode: "1", vaName:"VA 서비스 영상분석 6종", vaCount:1},
        {usrId: "0009755664", productCode: "5", vaName:"기본 VA 서비스 영상분석 6종", vaCount:1},
      ]
    }
  },
  methods: {
    searchToVaCamCount: function(param){
      console.log("부모 메소드 searchToVaCamCount 호출: "+JSON.stringify(param));
    }
  }
}
</script>

<style scoped>

</style>