<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section">

        <base-material-card
            icon="mdi-magnify"
            title="단말 인증 정보 조회"
            class="px-5 py-3">
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        label="mac id" 
                        v-model="param.mac_id"
                        placeholder=" ">                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>
            </v-row>
       </base-material-card>       
    </v-container>
</template>

<script>
export default {
    props:['param'],
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
    }, 
}
</script>
<style>

</style>