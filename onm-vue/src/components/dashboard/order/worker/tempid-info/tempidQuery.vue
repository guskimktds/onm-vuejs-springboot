<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="TEMP ID 정보 조회"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field dense label="GUID" placeholder="Placeholder" v-model="param.guid">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" md="3">
                    <v-text-field dense label="서비스계약ID" placeholder="Placeholder" v-model="param.said">                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>        
                <v-col cols="12" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
                        color="secondary"
                    ></v-switch>
                </v-col>        
            </v-row>
   
        </base-material-card>
    </v-container>

</template>
<script>
export default {
    props: ['param'],
    data() {
        return {}
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