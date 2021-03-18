<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="고객이전 단말 상태 조회"
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
                    <v-date-picker v-model="param.start_date" no-title scrollable>
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
                    <v-date-picker v-model="param.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
            <v-col cols="3">
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

            <v-col cols="3">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="이전 일련번호" 
                        v-model="param.mig_seq"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>       
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="단말종류" 
                        v-model="param.device_type"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="장치ID" 
                        v-model="param.device_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select 
                    label="상태코드" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select> 
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
    props:['param'],
    data() {
        return {
            items:[
                    {state:'전체', abbr:'All'},
                    {state:'진행', abbr: 'P'},
                    {state:'성공', abbr:'S'},
                    {state:'실패', abbr:'F'},
                    {state:'등록', abbr:'A'}],   
            selected:'All'        
        };
    },

    methods: {
        searchMethod: function() {
            if(this.selected=='All'){
            this.param.status_code=''
            }else{
            this.param.status_code=this.selected
            }
            this.$emit('search', this.param)
        },

        handleRadio:function(value){
            if(value=='등록일'){
                this.param.order_category="R"
            }else if(value=='mod_date'){
                this.param.order_category="M"
            }
        }
    }, 
}
</script>
<style>

</style>