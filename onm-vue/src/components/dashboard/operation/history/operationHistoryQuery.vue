<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="[O&M]처리 이력 조회"
        class="px-5 py-3"
        >
            <v-row>
                <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="사번">
                    </v-text-field>
                </v-col> -->     

                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                </v-col>

                 <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                 </v-col>
                   
                <v-col cols="12" sm="6" md="12">
                    <v-radio-group
                        v-model="param.cmd_type"
                        row
                    >
                        <v-radio
                            label="전체"
                            value="All"
                            
                        ></v-radio>
                        <v-radio
                            label="입력"
                            value="I"
                        ></v-radio>
                        <v-radio
                            label="조회"
                            value="R"
                        ></v-radio>
                        <v-radio
                            label="수정"
                            value="U"
                        ></v-radio>
                        <v-radio
                            label="삭제"
                            value="D"
                        ></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="ONM 처리자ID(사번)" 
                        v-model="param.onm_user_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="호출 URI" 
                        v-model="param.uri"
                        placeholder=" " 
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
                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
                        color="secondary"
                        v-show="showMasking()"
                    ></v-switch>
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
        },
        showMasking(){
        var auth=this.$store.state.authGroupId
        if(auth=='G100'||auth=='G200'){
            return true;
        }else{
            return false;
        }
    }
    },  
}
</script>
<style>

</style>