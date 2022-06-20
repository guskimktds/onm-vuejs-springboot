<template>
  <v-container id="regular-tables" fluid tag="section">
        <base-material-card icon="mdi-magnify" title="단말인증결과 조회" class="px-5 py-3">            
            <v-row>      
                <v-col cols="12" sm="3" md="3">
                 <v-select 
                  item-text="text" 
                  item-value="value" 
                  :items="authResultItem"
                  label="인증결과" 
                  v-model="param.termauthcode" 
                  ></v-select>
                </v-col>  

                <v-col cols="12" sm="3" md="3">
                    <v-text-field 
                        label="청약SAID" 
                        v-model="param.said"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field 
                        label="회선SAID" 
                        v-model="param.psaid"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field 
                        label="바코드" 
                        v-model="param.termbarcode"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field 
                        label="단말MAC" 
                        v-model="param.mac_id"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3">
                    <v-text-field 
                        label="IP" 
                        v-model="param.ip_addr"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.disp_start_date"
                        label="조회 시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_start_date" no-title scrollable>
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
                        v-model="param.disp_end_date"
                        label="조회 종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.disp_end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
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
// import dateInfo from '../../../utils/common';
export default {
    
    props:['param'],
    data() {
        return{
            status_text:'',       
            dialog: false,    
            authResultItem: [
                {text:'성공', value:'success'},
                {text:'실패', value:'fail'},
                {text:'플랫폼마스터키전달실패', value:'sendFail'}
            ]
        }
    },
    computed: {
      formTitle () {
        return '단말인증결과 조회'
      },
    },

    methods: {
        showAuth(){
            var auth=this.$store.state.authGroupId
            if(auth=='G100'){
              return true;
            }else{
            alert('접근권한이 없습니다.')
              return false;
            }
        },

        searchMethod: function() {
            this.$emit('search', this.param)
            console.log(this.param.disp_start_date)
        },

      
    }
}
</script>

<style>

</style>