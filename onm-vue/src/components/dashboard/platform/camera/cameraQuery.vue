<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="카메라상태 현황 조회"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="국사코드" placeholder="Placeholder" v-model="param.local_gw_id">                        
                    </v-text-field>
                </v-col>         
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
    data() {
        return{
            param: {
                local_gw_id: ''
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