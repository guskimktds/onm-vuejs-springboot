<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="고객이전 단말 상태 조회"
            class="px-5 py-3"
        >
            <v-row>
                <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.start_date"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>   -->
                <v-col cols="12" sm="6" md="4">
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
                        label="검색기간"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="param.searchDate"
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
                        @click="$refs.menu.save(date)"
                        >
                        OK
                        </v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="이전 일련번호" 
                        v-model="param.mig_seq"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>       
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="단말종류" 
                        v-model="param.device_type"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="장치ID" 
                        v-model="param.device_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="상태코드" 
                        v-model="param.status_code"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
                </v-col>
            </v-row>
       </base-material-card>       
    </v-container>
</template>
<script>

export default {
    props:['param'],
    data() {
        return {           
            searchDate: ["", ""],            
            date: false,
            menu: false
        };
    },
    // methods: {
    //     searchMethod: function() {
    //         this.$emit('search', this.param)
    //     }
    // },
    computed: {
        dateRangeText() {
            return this.searchDate.join(" ~ ");
        },
    }, 
    methods: {
        searchMethod: function() {
            var newParam = this.param
            var startDate, endDate
            console.log(this.searchDate.length)
            if(this.searchDate.length > 1)
            {
                if(this.searchDate[0] > this.searchDate[1]){
                    startDate = this.searchDate[1]
                    endDate = this.searchDate[0]
                }
                else{
                    startDate = this.searchDate[0]
                    endDate = this.searchDate[1]
                }
            }
            newParam.start_date = startDate.replace(/-/g,"")
            newParam.end_date = endDate.replace(/-/g,"")
            console.log(newParam)

            this.$emit('search', newParam)
        }
    }, 
}
</script>
<style>

</style>