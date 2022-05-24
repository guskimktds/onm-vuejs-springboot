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
                        item-text="state" 
                        item-value="abbr" 
                        :items="targetData"  
                        label="송출지명" 
                        v-model="param.target_name"
                     ></v-text-field>
                </v-col>
                <v-col cols="3">
                   <v-select 
                        label="관리상태" 
                        v-model="statusSelect"
                        :items="statusData"
                        item-text="state" 
                        item-value="abbr" 
                        ></v-select>
                </v-col> 
                </v-row>             
            <v-row>
                <v-col cols="3">
                   <v-text-field  
                        label="프로세스 ID"
                        v-model="param.send_pid"
                        placeholder=" "
                        ></v-text-field>
                </v-col>  
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
                            <v-date-picker v-model="param.start_date" no-title scrollable >
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
            statusData: [
                        {state :'전체' , abbr : 'All'},
                        {state :'등록' , abbr : 'A'},
                        {state :'전송중' , abbr : 'S'},
                        {state :'전송 실패' , abbr : 'F'},
                        {state :'전송 중지' , abbr : 'Z'}],
            statusSelect:'All'
        }
    },
  methods: {
    searchMethod: function () {
        if(this.statusSelect=='All'){
        this.param.status_code=''
        }else{
        this.param.status_code=this.statusSelect
        }
        this.$emit("search", this.param);
    }
  },
};
</script>
<style>

</style>