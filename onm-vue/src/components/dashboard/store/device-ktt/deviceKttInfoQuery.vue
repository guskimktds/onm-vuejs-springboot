<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="KTT 단말 조회"
        class="px-5 py-3"
        >
            <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>

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
                        label="카메라 ID" 
                        v-model="param.cam_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                 <v-col cols="2">
                    <v-text-field 
                        label="매장 ID" 
                        v-model="param.user_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field 
                        label="서비스번호" 
                        v-model="param.service_no"
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
 data(){
     return{
         selected:'All',
         items:[
             {state:'전체', abbr:'All'},
             {state:'정상', abbr:'S'},
             {state:'삭제', abbr:'D'},
         ]
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