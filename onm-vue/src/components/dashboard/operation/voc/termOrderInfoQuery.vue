<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="청약오더 및 단말오더 정보조회"
            class="px-5 py-3"
        >
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-text-field 
                    label="계약아이디" 
                    v-model="param.said"
                    placeholder=" " 
                >                        
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <v-switch
                    v-model="param.is_masking"                    
                    :label="`마스킹 해제`"
                    color="secondary"
                ></v-switch>
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
    props:['param'],
       data() {
        return {
    
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