<template>
<v-container fluid

>
                    <base-material-card  dark>
                        <div style="font-size:20px; font-weight:bold; text-align:left;">{{ formTitle }}</div>
                                 <v-row>
        <v-col>

      <v-text-field 
      
      label="매장 ID"
      v-model="user_id"
      ></v-text-field>
        </v-col>
        <v-col>

      <v-btn
     v-on:click="cameraList"
      >검색</v-btn>
        </v-col>
      </v-row>
                            <v-data-table
                            
                            :headers="cHeaders"
                            :items="cList"
                            :options.sync="options2"
                            :server-items-length="resPagingInfo.total_cnt"
                            class="elevation-1"
                            :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                            :header-props="{ sortIcon: null }"
                            ></v-data-table>
                    </base-material-card>
</v-container>

</template>

<script>
import axios from "axios"
// import EventBus from '../../../../../EventBus'

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    props:['param'],
    data() {
      return {
        cHeaders: [
            { text: '사이트ID', value: 'site_id' },
            { text: '매장ID', value: 'user_id' },
            { text: '접속량', value: 'access_cnt' },
            { text: '날짜', value: 'access_date' },
        ],
         reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
        },
        user_id:'',
        dialog:false,
        dialogDelete:false,
        editedIndex:-1,
        options:{},
        options2:{},
        totalList: 0,
        loading: true,
        cList: [],
        resPagingInfo:{},
        title: '서비스 업체별 호출 수'
      }
    },
    methods: {
        cameraList:function(options) {
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/user`
            
            var reqParams=this.setParams(options)
            axios
                .post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.cList = response.data.data.access_user_list;
                    this.resPagingInfo=response.data.data.paging_info;
                    }else if(resCode==204){
                    console.log(resCode + " / " + resMsg);
                    this.cList =[];
                    }else{
                    console.log(resCode + " / " + resMsg);
                    }
                })
                .catch((ex)=>{
                    console.log('조회 실패',ex)
                })
        },
        setParams:function(options){
            var values={
                page_no: options.page,
                view_cnt: options.itemsPerPage,
                user_id:this.user_id,
                start_date:this.param.start_date.replace(/-/g,""),
                end_date:this.param.end_date.replace(/-/g,"")

            }
            return values;
        },
        
        getProcessApi() {
            this.loading = true;
            this.processList(this.options)
        },
        getCameraApi(){
            this.loading=true;
            this.cameraList(this.options2)
        }
        
    },

    watch: {

        options2:{
            handler(){
                this.getCameraApi();
            },
            deep:true
        }
    },
    mounted() {
            this.getCameraApi();
            console.log('갱신')
            },  
    computed: {
        formTitle(){
            this.getCameraApi();
            return this.title
        }
    
        },  
}
</script>

<style scoped>
.chart-area {
    /* border: 1px solid red; */
    height: 251px;
}

.count-board, .chart-board, .grid-board {
    border: 1px solid #AAAAAA;
}

.board-footer{
    font-size: 9px;
    color: #777777;
    border-top: 1px solid #AAAAAA;
}

.dashboard-icon{
    position: relative; top:-10px; left:10px
}

.count-board-text div{
    text-align: right;
    padding-right: 15px;
}
</style>