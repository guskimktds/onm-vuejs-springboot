<template>   
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
        icon="mdi-magnify"
        title="영상송출 PROCESS 조회"
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
                    <v-text-field  
                        label="송출제목" 
                        v-model="param.srs_title"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field  
                        label="송출지명" 
                        v-model="param.target_name"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                   <v-select 
                        item-text="status_name" 
                        item-value="status_code" 
                        :items="statusData"
                        label="관리상태" 
                        v-model="param.status_code"
                        ></v-select>
                </v-col> 
                </v-row>             
            <v-row>
                <v-col cols="4">
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
                            <v-date-picker v-model="param.start_date" no-title scrollable >
                            </v-date-picker>
                            </v-menu>

                </v-col>
                <v-col cols="4">
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
                <v-col cols="2">
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
             dialog: false,    
            editedItem: {
                user_id: '',
                cam_id: '',
                target_stream_key: '',
                target_stream_url : '',
                srs_title : '',
                start_date: '',
                end_date : '',
                paging : false
            },
            statusData: [
                {status_name :'등록' , status_code : 'A'},
                {status_name :'전송중' , status_code : 'S'},
                {status_name :'전송 실패' , status_code : 'F'},
                {status_name :'전송 중지' , status_code : 'Z'}
            ],
        }
    },
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>

</style>