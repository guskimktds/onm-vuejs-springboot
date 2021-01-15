<template>   
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="관리자 접속 이력 조회"
        class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="사번" placeholder="Placeholder" >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="이름" placeholder="Placeholder" >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="권한" placeholder="Placeholder" >                        
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
    data() {
        return{
            param: {
                id: '',
                name: '',
                auth: ''
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