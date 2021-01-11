<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-select item-text="text" item-value="value" :items="localGwOptions" v-model="param.local_gw_id" v-on:change="searchMethod">></v-select>
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
                local_gw_id: '1',
            },

            localGwOptions:[
                {text:'혜화',   value:'1'},
                {text:'헤화-2', value:'2'},
                {text:'혜화-3', value:'5'},
                {text:'혜화-4', value:'6'},
                {text:'헤화-5', value:'9'},
                {text:'헤화-6', value:'A'},
                {text:'헤화-7', value:'B'},
                {text:'구로-1', value:'3'},
                {text:'구로-2', value:'4'},
                {text:'구로-3', value:'7'},
                {text:'구로-4', value:'8'}
            ]
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