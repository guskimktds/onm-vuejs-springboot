<template>
    <v-container fluid>
            
        <base-material-card
            color="orange"
            dark
            icon="mdi-keyboard"
            title="개통/해지 현황 대시보드"
            class="px-5 py-3">
            <v-row align="start" justify="space-between">         
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일(일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=dateOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date" @click:date="change()">
                    </v-date-picker>
                    </v-menu>

                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일(월)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=monthOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="month" @click:month="change()">
                    </v-date-picker>
                    </v-menu>

                </v-col>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일(일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=dateOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date" @click:date="change()">
                    </v-date-picker>
                    </v-menu>
                    
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일(월)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=monthOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="month" @click:month="change()">
                    </v-date-picker>
                    </v-menu>
                </v-col>
     



                <v-col cols="12" sm="6" md="3">
                    <v-radio-group
                        v-model="param.search_type"
                        row
                        v-on:change="handleRadio"
                    >
                        <v-radio
                            label="Day"
                            value="D"
                        ></v-radio>
                        <v-radio
                            label="Month"
                            value="M"
                        ></v-radio>                        
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-card>
                <platform-graph v-bind:param=param></platform-graph>
            </v-card>
        </base-material-card> 

    </v-container>
</template>

<script>
import PlatformGraph from '../dashboard/platformGraph'
import dateInfo from '../../../utils/common'

export default{
  components:{
    PlatformGraph
  },
    data() {
        return {
            dateOption: true,
            monthOption:false,
            param: {  
                search_type:'D',
                start_date: dateInfo().lastWeekDashFormat,
                end_date: dateInfo().currentDateDashFormat
            },
            datepick:{  
                search_type:'D',
                start_date: dateInfo().lastWeekDashFormat,
                end_date: dateInfo().currentDateDashFormat
            },
        }
    },
   
    methods: {
        handleRadio: function(value) {
            this.param.search_type = value
            if(value==='D'){
                this.dateOption=true
                this.monthOption=false
                this.param.start_date=dateInfo().lastWeekDashFormat
                this.param.end_date=dateInfo().currentDateDashFormat
            }
            if(value==='M'){
                this.dateOption=false
                this.monthOption=true
                this.param.start_date=dateInfo().lastMonthDefault
                this.param.end_date=dateInfo().currentMonthDefault
            }
            
            if(Number(this.param.start_date)-Number(this.param.end_date)>0){
                alert('형식에 맞는 날짜 검색값을 입력해주세요')
                
                if(value==='D'){
                this.dateOption=true
                this.monthOption=false
                this.param.start_date=dateInfo().lastWeekDashFormat
                this.param.end_date=dateInfo().currentDateDashFormat
                }
                
                if(value==='M'){
                this.dateOption=false
                this.monthOption=true
                this.param.start_date=dateInfo().lastMonthDefault
                this.param.end_date=dateInfo().currentMonthDefault
                }
               
            }
         
        },
        change:function(){
            this.$emit('datepick',this.param)
        }
    },

}
</script>