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
                        item-text="text" 
                        item-value="value" 
                        :items="localGwOptions" 
                        v-model="param.local_gw_id" 
                        v-on:change="searchMethod"
                        ></v-select>
                </v-col>
            </v-row>

        </base-material-card>
    </v-container>
</template>


<script>
export default {
    props : ['param'],
    data() {
        return{       
            localGwOptions:[
                {text:'TB1',   value:'D'},
                {text:'TB2',   value:'E'},
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