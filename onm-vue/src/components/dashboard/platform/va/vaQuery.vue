<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="VA설정 현황 조회"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols=auto>
                    <v-select 
                        item-text="server_name" 
                        item-value="local_gw_id" 
                        :items="filteredData" 
                        v-model="param.local_gw_id" 
                        v-on:change="searchMethod"
                        label="국사코드"
                        ></v-select>
                </v-col>
            </v-row>

        </base-material-card>
    </v-container>
</template>


<script>
export default {
    props : ['param', 'localGwOptions'],
    data() {
        return{       

        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },
    // select box => version_code가 1302이상인 국사정보만 노출하도록 추가(21.06.03)
    computed: {
        filteredData(){
            return this.localGwOptions.filter(function(param){
                return Number(param.version_code) > 1301;
            });
        }
    }
}
</script>
<style>
    
</style>