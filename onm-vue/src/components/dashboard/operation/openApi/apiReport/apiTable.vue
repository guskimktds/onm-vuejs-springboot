<template>
<v-container fluid>
    <div class="row">
        <div class="col">
                <div class="grid-board">
                    
                    <div style="font-size:20px; font-weight:bold; text-align:left;">API별 호출 수</div>
                            <v-row>
        <v-col>

      <v-text-field 
      label="search"
      v-model="api_no"
      ></v-text-field>
        </v-col>
        <v-col>

      <v-btn
     v-on:click="processList"
      >검색</v-btn>
        </v-col>
      </v-row>
                        <v-data-table
                        :headers="pHeaders"
                        :items="pList"
                        :options.sync="options"
                        :server-items-length="resPagingInfo.total_cnt"
                        class="elevation-1"
                        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                        :header-props="{ sortIcon: null }"
                        >
                        </v-data-table>
                    </div>
        </div>
            
        <div class="col">
        <service-table></service-table>
        </div>

    </div>


</v-container>

</template>

<script>
import axios from "axios"
import EventBus from '../../../../../EventBus'
import ServiceTable from './serviceTable.vue'

const headers={
  'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
  'Content-Type': 'application/json'
}

export default {
    data() {
      return {
        pHeaders:[
            { text: '사이트ID', value: 'site_id' },
            { text: '인터페이스 번호', value: 'api_no' },
            { text: '접속량', value: 'access_cnt' },
            { text: '날짜', value: 'access_date' },
        ],
         reqPagingInfo: {
        page_no: 1,
        view_cnt: 10
        },
        api_no:'',
        dialog:false,
        dialogDelete:false,
        editedIndex:-1,
        options:{},
        options2:{},
        totalList: 0,
        loading: true,
        pList: [],
        resPagingInfo:{}
      }
    },
    components: {
      ServiceTable  
    },
    methods: {
        processList:function(options) {
            var url=`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_13047/get_site_open_api_access/api`
            
            var reqParams=this.setParams(options)
            console.log(reqParams)

            axios
                .post(url,reqParams,headers)
                .then((response)=>{
                    console.log(response.data)
                    var resCode = response.data.res_code;
                    var resMsg = response.data.res_msg;
                    if(resCode == 200){
                    this.pList = response.data.data.access_api_list;
                    this.resPagingInfo=response.data.data.paging_info;
                    }else if(resCode==410){
                    alert("로그인 세션이 만료되었습니다.");
                    EventBus.$emit('top-path-logout');
                    this.$store
                    .dispatch("LOGOUT")
                    .then( res => { 
                    console.log(res.status)}).catch(({ message }) => (this.msg = message))
                    this.$router.replace('/signin')
                    }else{
                    this.pList = [];
                    this.resPagingInfo = {};
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
                api_no:this.api_no
            }
            return values;
        },
        
        getProcessApi() {
            this.loading = true;
            this.processList(this.options)
        },

        
    },

    watch: {
        options: {
            handler() {
                this.getProcessApi();
            },
            deep: true,
            },
     
    },
    mounted() {
    
          
            this.getProcessApi();

            console.log('갱신')
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