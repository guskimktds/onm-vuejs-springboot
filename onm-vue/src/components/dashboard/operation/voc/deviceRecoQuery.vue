<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="단말 인증 정보 조회"
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

                <v-col cols="3">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>

                <v-col cols="3">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹 해제`"
                        color="secondary"
                    ></v-switch>
                </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3">
                        <v-text-field
                        label="카메라 ID" 
                        v-model="param.onm_user_id" 
                        placeholder=" " >                        
                        </v-text-field>
                    </v-col>         
        
                    <v-col cols="3">
                        <v-text-field 
                        label="카메라명" 
                        v-model="param.auth_group_id" 
                        placeholder=" " >                        
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field 
                        label="MAC ID" 
                        v-model="param.auth_group_id" 
                        placeholder=" " >                        
                        </v-text-field>
                    </v-col>
                    <v-col cols="auto" >
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
        return{
            dialog: false,
            editedItem: {
                onm_user_id: '',     
                accept_ip: '',
                auth_group_id: '',
                cmd_type: 'I'
            },
            defaultItem: {
                onm_user_id: '',     
                accept_ip: '',
                auth_group_id: '',
                cmd_type: '' 
            }

        }
    },
    computed: {
      formTitle () {
        return '계정등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },

        searchToAuthMenu: function() {
            this.$emit('searchToAuthMenu', this.param)
        },

        handleRadio:function(value){
            if(value=='생성일'){
                this.param.order_category="R"
            }else if(value=='수정일'){
                this.param.order_category="M"
            }
        }
    },  
}
</script>

<style>
</style>