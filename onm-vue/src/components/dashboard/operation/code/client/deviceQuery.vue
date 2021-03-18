<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="APP(Client) 단말 정보 관리"
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
                        v-model="search.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="search.start_date" no-title scrollable type="date">
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
                        v-model="search.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="search.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                    
                </v-col>
                
              <v-col cols="3">
                    <v-radio-group
                        row
                        v-on:change="handleRadio"
                        v-model="search.order_category"
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
                        v-model="search.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                        v-on:change="handleSwitch"
                    ></v-switch>
                </v-col>

            </v-row>

            <v-row>
                <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="앱버전" 
                        v-model="param.appversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="OS타입" 
                        v-model="param.ostype"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="업데이터버전" 
                        v-model="param.updateversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>                
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                        color="primary"
                    >
                        검색
                    </v-btn>
                </v-col> -->
                <v-col cols="12" sm="6" md="8"></v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-btn
                    class="mb-2"
                    v-on:click="searchMethod">
                    검색
                    </v-btn>
                </v-col>
            
            </v-row>
            
      </base-material-card>       
    </v-container>
</template>
<script>
import dateInfo from '../../../../utils/common'

export default {
    data() {
        return{
            // param: {
            //     appversion: '',
            //     ostype: '',
            //     updateversion: ''
            // },
            dialog: false,
            search:{
                start_date:dateInfo().lastWeekDashFormat,
                end_date:dateInfo().currentDateDashFormat,
                order_category:'R',
                date_yn: true
            },

        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.search)
        },
        handleRadio(values){
            if(values=="등록일"){
                this.search.order_category="R"
            }else if(values=="수정일"){
                this.search.order_category="M"
            }   
        },
        handleSwitch(values){
            this.date_yn=values
        }

    },  
}
</script>
<style>

</style>