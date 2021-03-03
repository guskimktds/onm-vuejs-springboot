<template>
    <v-container fluid>
      <v-card>
        <cam-reg-chart
        v-on:datepick="searchCamRegStat"></cam-reg-chart>
        <cam-reg-list 
        v-bind:pList="pList"
        ></cam-reg-list>
      </v-card>
    </v-container>
</template>

<script>
import List from './camRegList'
import Chart from './camRegChart'
import dateInfo from '../../../utils/common'

import axios from "axios";

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
  components: {
    CamRegList: List,
    CamRegChart: Chart
  },
  data () {
    return {
      title: '개통/해지 추이(대시보드)',
      pList: [],
      datepick:{
        start_date:'',
        end_date:'',
        search_type:''
      },
      startpick:{
        search_type:'D',
        start_date: dateInfo().lastWeek,
        end_date: dateInfo().currentDate
      }
    }
  },
  methods: {
    searchCamRegStat: function(datepick){
    var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/V110/ONM_11014/get_transition`
    let params={}
    console.log('데이트픽')
    console.log(datepick)
    if(datepick.end_date===''||datepick.start_date===''){
      params=this.startpick
      console.log('파라미터 값')
      console.log(params)
    }else{
      params=datepick
    }

      axios.post(url, params, headers)
      .then((response) => {
        console.log(response)
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.date_list;
          console.log('전달된 개통 해지추이 리스트')
          console.log(this.pList)
        }else{
          this.pList = [];
          alert(resCode + " / " + resMsg);
        }
      })
      .catch((ex) => {
        console.log('조회 실패',ex)
      })
      .finally(function(){})
    },
    getDataFromApi() {
        this.loading = true;
        this.searchCamRegStat(this.datepick)
    },
  },
        watch: {
        options: {
        handler() {
        this.getDataFromApi();
        },
        deep: true,
        },
    },
    mounted() {
        this.getDataFromApi();
    },
}
</script>
