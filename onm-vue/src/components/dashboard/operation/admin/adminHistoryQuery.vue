<template>   
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="[매장]관리자 접속 이력 조회"
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
                        label="시작일(로그인)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=loginOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>

                     <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일(로그아웃)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=logoutOption
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
                        label="종료일(로그인)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=loginOption
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable type="date">
                    </v-date-picker>
                    </v-menu>
                    
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일(로그아웃)"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-show=logoutOption
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
                        v-model="optionType"
                    >
                        <v-radio
                            label="로그인"
                            value="login"
                        ></v-radio>
                        <v-radio
                            label="로그아웃"
                            value="logout"
                        ></v-radio>                        
                    </v-radio-group>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
                        color="secondary"
                    ></v-switch>
                </v-col>   
                
                </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="관리자ID" 
                        v-model="param.admin_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.user_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                </v-row> 
                <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="전화번호" 
                        v-model="param.tel_no"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
            
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="로그인키" 
                        v-model="param.login_key"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-btn elevation="2" medium
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
            loginOption:true,
            logoutOption:false,
            optionType:'login'
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
        handleRadio:function(value){
            this.optionType=value
            if(value=='login'){
                this.loginOption=true
                this.logoutOption=false
            }else if(value=='logout'){
                this.loginOption=false
                this.logoutOption=true
            }
        }
    },  
}
</script>
<style>

</style>