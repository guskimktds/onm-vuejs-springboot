<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="국사코드" placeholder="Placeholder" outlined v-model="param.local_gw_id">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="프로세스" placeholder="Placeholder" outlined v-model="param.process">                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="상태" placeholder="Placeholder" outlined v-model="param.process_status">                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>                
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    data() {
        return{
            param: {
                local_gw_id: '',
                process_status: '',
                process: ''
            }
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
    
</style>