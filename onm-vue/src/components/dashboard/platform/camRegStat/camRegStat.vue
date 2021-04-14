<template>
    <v-container fluid>
      <v-card>
        <cam-reg-chart
        @datepick="getDataFromApi"></cam-reg-chart>
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

import EventBus from '../../../../EventBus'
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

      axios.post(url, datepick, headers)
      .then((response) => {
        var resCode = response.data.res_code;
        var resMsg = response.data.res_msg;
        if(resCode == 200){
          this.pList = response.data.data.date_list;
        }else if(resCode==410){
          alert(resCode + " / " + resMsg);
          EventBus.$emit('top-path-logout');
            this.$store
            .dispatch("LOGOUT")
            .then( res => { 
            console.log(res.status)}).catch(({ message }) => (this.msg = message))
            this.$router.replace('/signin')
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
    getDataFromApi(values) {
        if(values==undefined){
          this.datepick=this.startpick
        }else if(values.search_type=='D'){
          this.datepick.start_date=values.start_date.replace(/-/g,"")
          this.datepick.end_date=values.end_date.replace(/-/g,"")
        }else if(values.search_type=='M'){
          var ey=values.end_date.replace(/-/g,"").substring(0,4)
          var em=values.end_date.replace(/-/g,"").substring(4,6)
          var last=new Date(ey,em,0)
          var lastdate=last.toString().substring(8,10)
         
          this.datepick.start_date=values.start_date.replace(/-/g,"")+'01'
          this.datepick.end_date=values.end_date.replace(/-/g,"")+lastdate
        }
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
