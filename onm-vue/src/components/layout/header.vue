<template>
  <nav>
      <ul>
        <li v-on:click="changeTap('platform')"><router-link to="/platform" >VSaaS플랫폼현황</router-link></li>
        <li v-on:click="changeTap('service')"><router-link to="/service">서비스관리</router-link></li>
        <li v-on:click="changeTap('voc')"><router-link to="/voc">VOC 관리</router-link></li>
        <li v-on:click="changeTap('biz')"><router-link to="/biz">사업부서SR처리</router-link></li>
      </ul>
  </nav>
</template>

<script>
import EventBus from '../../EventBus';

export default {
  data () {
    return {
      platform: [
        {name: 'process 현황', path: '/platform/process'},
        {name: '카메라상태 현황', path: '/platform/camera'},
        {name: 'IoT GW 상태현황', path: '/platform/iotgw'},
        {name: 'va 설정 현황', path: '/platform/va'},
        {name: '스트리머 관리 현황', path: '/platform/streamer'},
      ],
      service: [
        {name: '계정조회', path: '/service/account-inquiry'},
        {name: '처리이력관리', path: 'processinglog'},
        {name: '관리자등록이력', path: 'admin-registlog'},
        {name: '관리자접속이력', path: 'admin-accesslog'},
      ],
      voc: [
        {name: '사용자정보', path: 'userinfo'},
        {name: '사용자 상품정보', path: 'user-productinfo'},
        {name: '사용자 요약정보', path: 'user-summary'},
        {name: 'VA 상품 및 카메라 대수 확인', path: 'va-product-camera-count'},
      ],
      biz: [
        {name: '고객이전 실행관리', path: 'transfer-execution'},
        {name: '고객이전 단말상태', path: 'transfer-device-status'},
      ]
    }
  },
  methods: {
    changeTap(path){
      console.log(path);
      if(path === 'platform'){
        console.log(this.platform)
        EventBus.$emit('top-path', this.platform);
      }else if(path === 'service'){
        console.log(this.service)
        EventBus.$emit('top-path', this.service);
      }
      else if(path === 'voc'){
        console.log(this.voc)
        EventBus.$emit('top-path', this.voc);
      }
      else if(path === 'biz'){
        console.log(this.biz)
        EventBus.$emit('top-path', this.biz);
      }
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
nav {
  background: #444;
  padding: 14px 0;
  margin-bottom: 40px;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 14px 0;
  margin-bottom: 40px;
}
</style>