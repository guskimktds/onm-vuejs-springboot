<template>
    <!-- <div>
        <div>
            <input type="text" v-model="param.id" placeholder="사번">
            <input type="text" v-model="param.name" placeholder="이름">
            <input type="text" v-model="param.auth" placeholder="권한">
            <button v-on:click="searchMethod">검색</button>
        </div>
        
    </div> -->
    <v-form>
        <v-container>
            <v-row>
                <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="사번">
                    </v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="사번" placeholder="Placeholder" outlined>                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="이름" placeholder="Placeholder" outlined>                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="권한" placeholder="Placeholder" outlined>                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium>
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