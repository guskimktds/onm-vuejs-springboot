<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="고객 청약 오더 처리 결과 조회"
            class="px-5 py-3"
        >
            <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field  label="거래고유번호" placeholder="" v-model="param.guid">                        
                    </v-text-field>
                </v-col>         
  

                <v-col cols="3">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹 해제`"
                        color="secondary"
                    ></v-switch>
                </v-col>
                
                <v-col cols="2">
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