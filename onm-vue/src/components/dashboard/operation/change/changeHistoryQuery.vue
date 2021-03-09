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
                
              <v-col cols="12" sm="6" md="3">
                    <v-radio-group
                        row
                        v-on:change="handleRadio"
                        v-model="param.order_category"
                    >
                        <v-radio
                            label="등록일"
                            value="R"
                        ></v-radio>
                        <v-radio
                            label="수정일"
                            value="M"
                        ></v-radio>                        
                    </v-radio-group>
                </v-col>
                </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.user_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>   
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="전화번호" 
                        v-model="param.tel_no"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="관리자구분" 
                        v-model="param.admin_type"
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
        handleRadio:function(value){
            if(value=='등록일'){
                this.param.order_category="R"
            }else if(value=='mod_date'){
                this.param.order_category="M"
            }
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