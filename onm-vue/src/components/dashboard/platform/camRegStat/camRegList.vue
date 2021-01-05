
<!--
<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th rowspan="2">일자</th>
                    <th colspan="2">매장</th>                    
                    <th colspan="2">개통대기</th>                    
                    <th colspan="2">개통실패</th>
                </tr>
                <tr>
                    <th>가입</th>
                    <th>해지</th>
                    <th>개통</th>
                    <th>해지</th>
                    <th>개통</th>
                    <th>해지</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item">
                    <td>{{item.date}}</td>
                    <td>{{item.storeReg}}</td>
                    <td>{{item.storeUnreg}}</td>
                    <td>{{item.camReg}}</td>
                    <td>{{item.camUnreg}}</td>
                    <td>{{item.iotReg}}</td>
                    <td>{{item.iotUnreg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['pList'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    created() {
        console.log(this.props)
    }
}
</script>
-->


<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="pList"
        :items-per-page="5"
        item-key="id"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
      >
      </v-data-table>
    </v-app>
  </div>
</template>


<script>
export default {
    props: ['pList'],
    data() {
      return {
        headers: [
          { text: '일자', value: 'date' },
          { text: '가입', value: 'storeReg' },
          { text: '해지', value: 'storeUnreg' },
          { text: '개통', value: 'camReg' },
          { text: '해지', value: 'camUnreg' },
          { text: '개통', value: 'iotReg' },
          { text: '해지', value: 'iotUnreg' },
        ]
      }
    },

    methods: {
        mounted() {
            var table = document.getElementsByClassName("v-data-table-header");
            
            // 일자
            var element1 = document.createElement('<th>');
            element1.value('일자');
            
            // 매장
            var element2 = document.createElement('<th>');
            element2.setAttribute('','')

            // 개통대기
            var element3 = document.createElement('<th>');

            // 개통실패
            var element4 = document.createElement('<th>');

            table.prepend("<tr><th></th></tr>");



        },
    },
}
</script>


<style>
    
</style>