<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="사용자 청약 오더 상세 검색"
        class="px-5 py-3"
        >
            <v-row>            
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="거래고유번호" 
                        v-model="param.guid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>                
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                    >
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
                guid: ''
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