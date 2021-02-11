<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="[매장]관리자 변경(등록/수정/삭제) 이력 조회"
        class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.user_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>   
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="전화번호" 
                        v-model="param.tel_no"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="관리자구분" 
                        v-model="param.admin_type"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>       
                
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium
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
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>

</style>