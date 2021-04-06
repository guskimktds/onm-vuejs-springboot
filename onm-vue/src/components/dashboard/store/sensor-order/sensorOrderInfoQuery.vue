<template>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        icon="mdi-magnify"
        title="센서 신청 현황 조회"
        class="px-5 py-3"
        >
        <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              
              label="센서 ID"
              v-model="param.sensor_prod_id"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              
              label="센서 제품명"
              v-model="param.sensor_prod_name"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" md="2">
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
                    {state:'정상', abbr: 'S'},
                    {state:'장애', abbr:'F'},
                    {state:'삭제', abbr:'D'}],
        }
    },
    methods: {
        searchMethod: function() {
           if(this.selected=='All'){
            this.param.status_code=''
            }else{
            this.param.status_code=this.selected
            }
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
</style>