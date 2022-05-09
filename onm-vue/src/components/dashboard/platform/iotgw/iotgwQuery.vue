<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="IoT GW 현황 조회 (Cloud LVSaaS만 조회 가능)"
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

        </base-material-card>
    </v-container>
</template>

<script>
export default {

    props: ['param','localGwOptions'],

    data() {
        return{
            
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