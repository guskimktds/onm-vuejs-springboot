<template>

    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="영상송출 이력조회"
        class="px-5 py-3"
        >
            <v-row>
                <v-col cols="3">
                    <v-text-field 
                        label="카메라ID" 
                        v-model="param.cam_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
               <v-select 
                        item-text="proc_name" 
                        item-value="proc_code" 
                        :items="procData"
                        label="처리구분" 
                        v-model="param.proc_type"
                        placeholder=" " 
                ></v-select>   
                </v-col>    
                <v-col cols="3">
                     <v-select 
                        item-text="request_name" 
                        item-value="request_code" 
                        :items="requestData"
                        label="요청구분" 
                        v-model="param.request_from"
                        placeholder=" " 
                    >                        
                        ></v-select>
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
            dialog: false,    
            requestData: [
                {request_name :'전체' , request_code : ''},
                {request_name :'신규' , request_code : 'N'},
                {request_name :'캠상태변경' , request_code : 'C'},
                {request_name :'프로세스 상태관리' , request_code : 'P'},
                {request_name :'재송출 요청' , request_code : 'R'},
                {request_name :'송출쉘 재호출' , request_code : 'S'},
                {request_name :'삭제요청' , request_code : 'D'},
                {request_name :'송출정보 관리배치' , request_code : 'M'},
                {request_name :'정지요청' , request_code : 'T'}
            ],
            procData: [
                {proc_name :'송출처리' , proc_code : 'S'},
                {proc_name :'송출삭제처리' , proc_code : 'X'},
                {proc_name :'송출정지처리' , proc_code : 'T'}
            ],
        }
            
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
    },
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    }
  },
};
</script>
<style>
    
</style>