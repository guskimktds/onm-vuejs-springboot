<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="사용자 청약 오더 처리 결과 조회"
        class="px-5 py-3"
        >
            <v-row>            
                <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시" 
                        v-model="param.guid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시 끝" 
                        v-model="param.guid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>  -->

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
                        label="승인날짜"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="registDate" no-title scrollable range>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                        Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                        OK
                        </v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="계약ID" 
                        v-model="param.said"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>  
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="거래고유번호" 
                        v-model="param.guid"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>                
                <v-col cols="12" sm="6" md="2">
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
    props: ['param'],
    data() {
        return{
            // param: {
            //     start_date: '',
            //     end_date: '',
            //     said: '',
            //     guid: ''
            // }
            registDate: ["", ""],            
            date: false,
            menu: false
        }
    },
    computed: {
        dateRangeText() {
            return this.registDate.join(" ~ ");
        },
    },
    methods: {
        searchMethod: function() {
            var newParam = this.param
            var startDate, endDate
            console.log(this.registDate.length)
            if(this.registDate.length > 1)
            {
                if(this.registDate[0] > this.registDate[1]){
                    startDate = this.registDate[1]
                    endDate = this.registDate[0]
                }
                else{
                    startDate = this.registDate[0]
                    endDate = this.registDate[1]
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