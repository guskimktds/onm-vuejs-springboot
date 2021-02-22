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
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field dense label="거래고유번호" placeholder="" v-model="param.guid">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="4">
                    <v-text-field dense label="계약 ID" placeholder="" v-model="param.said">                        
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field dense label="서비스번호" placeholder="" v-model="param.service_no">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="4">
                    <v-text-field dense label="KTT계약ID" placeholder="" v-model="param.contract_id">                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
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