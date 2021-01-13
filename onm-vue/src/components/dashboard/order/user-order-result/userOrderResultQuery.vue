<template>
    <v-form>
        <v-container>
            <v-row>            
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시" 
                        v-model="param.guid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시 끝" 
                        v-model="param.guid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="계약ID" 
                        v-model="param.said"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>  
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
        </v-container>
    </v-form>
</template>
<script>
export default {
    data() {
        return{
            param: {
                start_date: '',
                end_date: '',
                said: '',
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