<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="단말 오더 정보 조회"
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
                        label="시작일(처리희망일시)"
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
                        label="종료일(처리희망일시)"
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

                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2">
                    <v-text-field
                        label="오더번호" 
                        v-model="param.oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                        label="계약 ID" 
                        v-model="param.said"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                        label="거래고유번호" 
                        v-model="param.guid"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>

                <v-col cols="2">
                <v-select 
                        label="상태코드" 
                        v-model="selected"
                        :items="items"
                        item-text="state"
                        item-value="abbr"
                    ></v-select>
                </v-col>
                
            <v-col cols="auto">
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
    props: ['param'],
    data() {
        return {
          selected:'All',
          items:[
                    {state:'전체', abbr:'All'},
                    {state:'청약취소', abbr: 'T'},
                    {state:'통보완료', abbr:'Y'},
                    {state:'미통보', abbr:'N'}]
        }
    },

  methods: {
    searchMethod: function () {
      if(this.selected=='All'){
        this.param.status_code=''
      }else{
      this.param.status_code=this.selected
      }
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
    
</style>