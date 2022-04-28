<template>

    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="SRS 카메라 히스토리 조회"
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
                 <v-col cols="2">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>

            </v-row>

            <v-row>
                <v-col cols="3">
                    <v-text-field 
                        label="카메라 ID" 
                        v-model="param.cam_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">                   
                    <v-select 
                    label="처리결과" 
                    v-model="useSelect"
                    :items="useItem"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>    
                </v-col>
                <v-col cols="3">                   
                    <v-select 
                    label="상태코드" 
                    v-model="statSelect"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>    
                </v-col>

                <v-col cols="2">
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
            useItem:[
                    {state:'전체', abbr:'All'},
                    {state:'처리완료', abbr: 'Y'},
                    {state:'처리안함', abbr:'N'},
                    {state:'처리실패', abbr:'F'}],
            items:[
                    {state:'전체', abbr:'All'},
                    {state:'등록', abbr: 'A'},
                    {state:'송출준비', abbr:'P'},
                    {state:'송출중', abbr:'S'}], 
        useSelect:'All',       
        statSelect:'All'
        }
    },
  methods: {
    searchMethod: function () {
            if(this.useSelect=='All'){
            this.param.use_yn=''
            }else{
            this.param.use_yn=this.useSelect
            }
            if(this.statSelect=='All'){
            this.param.status_code=''
            }else{
            this.param.status_code=this.statSelect
            }

            this.$emit('search', this.param)
    },
  },
};
</script>
<style>
    
</style>