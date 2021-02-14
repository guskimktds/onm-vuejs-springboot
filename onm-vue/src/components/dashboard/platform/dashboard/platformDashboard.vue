<template>
    <v-container fluid>
            
        <base-material-card
            color="orange"
            dark
            icon="mdi-keyboard"
            title="플랫폼현황 대시보드"
            class="px-5 py-3">
            <v-row align="start" justify="space-between">         
                <v-col cols="12" sm="6" md="3">
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    attach
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="dateRangeText"
                        label="기간(디폴트: 최근일주일)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="stat_period"
                        no-title
                        scrollable
                        range
                    >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        color="primary"
                        @click="handleDate(date)"
                        >
                        OK
                        </v-btn>
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
                <platform-result></platform-result>
                <platform-table></platform-table>
            </v-card>
        </base-material-card> 

    </v-container>
</template>

<script>

import PlatformGraph from './platformGraph';
import PlatformResult from './platformResult';
import PlatformTable from './platformTable';
import dateInfo from '../../../utils/common'

export default {

    components: {
        PlatformGraph,
        PlatformResult,
        PlatformTable,

    },

    data() {
        return {
            date:false,
            menu:false,
            stat_period:["", ""],
            param: {  
                search_type:'D',
                start_date: dateInfo().lastWeek,  //lastWeek: 1주일전, lastMonth: 1달전
                end_date: dateInfo().currentDate
            }
        }
    },
    computed: {
        dateRangeText() {
            if (this.stat_period.length == 0) {
                return "";
            } 
            else return this.stat_period.join(" ~ ");
        }
    },
    methods: {
        handleDate: function (date) {
            // this.$emit("search", this.param);
            this.$refs.menu.save(date)
            console.log("검색 시작 : ",date)
            //날짜 검색조건 바인딩
            // var newParam = this.param
            var startDate, endDate
            console.log(this.stat_period.length)
            if(this.stat_period.length > 1)
            {
                if(this.stat_period[0] > this.stat_period[1]){
                    startDate = this.stat_period[1]
                    endDate = this.stat_period[0]
                }
                else{
                    startDate = this.stat_period[0]
                    endDate = this.stat_period[1]
                }
            }
            this.param.start_date = startDate.replace(/-/g,"")
            this.param.end_date = endDate.replace(/-/g,"")
            console.log(this.param)
        },

        handleRadio: function(value) {
            console.log(value)
            this.param.search_type = value
            console.log(this.param)
        }
    },

}
</script>

<style scoped>

</style>