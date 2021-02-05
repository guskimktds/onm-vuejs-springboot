<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="KTT 청약 정보 조회"
        class="px-5 py-3"
        >
            <v-row>            
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시" 
                        v-model="param.start_date"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="등록일시 끝" 
                        v-model="param.end_date"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="계약ID" 
                        v-model="param.said"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>  
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="거래고유번호" 
                        v-model="param.guid"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>    
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="서비스번호" 
                        v-model="param.service_no"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="KTT계약ID"
                        v-model="param.contract_id"
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
                said: '',
                guid: '',
                service_no: '',
                contract_id: ''
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