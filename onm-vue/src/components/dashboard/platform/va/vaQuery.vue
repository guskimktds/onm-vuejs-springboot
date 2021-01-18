<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="VA IP" placeholder="Placeholder" outlined v-model="param.va_ip">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="VA 상태" placeholder="Placeholder" outlined v-model="param.va_status">                        
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
                va_ip: '',
                va_status: ''
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