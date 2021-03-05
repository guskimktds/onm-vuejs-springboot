<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="Process 현황 조회"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols="12" sm="6" md="3">
                 <v-select 
                  item-text="server_name" 
                  item-value="local_gw_id" 
                  :items="localGwOptions"
                  label="국사코드" 
                  v-model="param.local_gw_id" 
                  v-on:change="searchMethod"
                  ></v-select>
                </v-col>
                
            </v-row>

            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="프로세스 타입" placeholder=" " v-model="param.process_type">                        
                    </v-text-field>
                </v-col> 
                <v-radio-group
                    v-model="status"
                    row>
                <v-radio
                    label="전체"
                    value="All"
                ></v-radio>
                <v-radio
                    label="정상"
                    value="D"
                    ></v-radio>
                <v-radio
                    label="미가동"
                    value="U">
                </v-radio>
                </v-radio-group>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>                
            </v-row>
   
        </base-material-card>
    </v-container>

</template>
<script>
export default {
    props: ['param','localGwOptions'],
    data() {
        return {
            status: 'All'
        }
    },
    methods: {
        searchMethod: function() {
            if(this.status=="All"){
                this.param.process_status=''
            }else{
                this.param.process_status=this.status
            }
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
    
</style>