<template>   
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.startdate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>  
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="이전 일련번호" 
                        v-model="param.beforeseq"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>       
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="단말종류" 
                        v-model="param.devicetype"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="장치ID" 
                        v-model="param.deviceid"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="상태코드" 
                        v-model="param.status"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
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
                startdate: '',
                beforeseq: '',
                devicetype: '',
                deviceid: '',
                status: ''
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