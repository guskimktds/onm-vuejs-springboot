<template>
    <v-container fluid>
      <v-card>
        <cam-reg-chart></cam-reg-chart>
        <cam-reg-list :pList="pList"></cam-reg-list>
      </v-card>
    </v-container>
</template>

<script>
import List from './camRegList'
import Chart from './camRegChart'

export default {
  
  components: {
    CamRegList: List,
    CamRegChart: Chart
  },
  data () {
    return {
      title: '개통/해지 추이(대시보드)',
      pList: [
        {date:'2020-12-05', storeReg:'64', storeUnreg:'55', camReg:'64', camUnreg:'44', iotReg:'39', iotUnreg:'66'},
        {date:'2020-12-04', storeReg:'33', storeUnreg:'12', camReg:'34', camUnreg:'76', iotReg:'54', iotUnreg:'45'},
        {date:'2020-12-03', storeReg:'57', storeUnreg:'34', camReg:'87', camUnreg:'6', iotReg:'56', iotUnreg:'12'},
        {date:'2020-12-02', storeReg:'12', storeUnreg:'78', camReg:'13', camUnreg:'4', iotReg:'28', iotUnreg:'55'},
        {date:'2020-12-01', storeReg:'75', storeUnreg:'41', camReg:'85', camUnreg:'35', iotReg:'94', iotUnreg:'76'},
        {date:'2020-11-30', storeReg:'54', storeUnreg:'54', camReg:'34', camUnreg:'5', iotReg:'41', iotUnreg:'88'},
        {date:'2020-11-29', storeReg:'44', storeUnreg:'56', camReg:'12', camUnreg:'36', iotReg:'76', iotUnreg:'33'}
      ]
    }
  },
  methods: {
    search: function(){
      console.log("부모 메소드 search 호출");
    },

  }
}
</script>
