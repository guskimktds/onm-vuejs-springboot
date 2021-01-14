<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="단말 오더 정보 조회"
        class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="1">
                    <v-text-field 
                        dense 
                        label="처리희망일자" 
                        v-model="param.startdate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>                    
                </v-col> 
                ~        
                <v-col cols="12" sm="6" md="1">
                    <v-text-field 
                        dense 
                        label="처리희망일자" 
                        v-model="param.enddate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="오더번호" 
                        v-model="param.order_no"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="계약 ID" 
                        v-model="param.said"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
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
                hopeDateStart: '',
                hopeDateEnd: '',
                orderNumber: '',
                tranId: '',
                contractId: ''
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