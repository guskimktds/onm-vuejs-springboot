<template>   
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.startdate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                    
                    <!-- <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.enddate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field> -->
                </v-col> 
                ~        
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.enddate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="상태코드" 
                        v-model="param.status"
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
            <!-- <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium
                    v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
                </v-col>   
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium
                    v-on:click="searchMethod"
                    >
                        등록
                    </v-btn>
                </v-col> 
                              
            </v-row> -->
        </v-container>
    </v-form>
</template>
<script>

export default {
    data() {
        return{
            param: {
                codeClass: '',
                code: '',
                name: '',
                type: ''
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