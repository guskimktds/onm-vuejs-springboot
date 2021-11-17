<template>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        icon="mdi-magnify"
        title="카메라 정보 조회"
        class="px-5 py-3"
        >

        <v-row>
          <v-col cols="3">
                  <v-select 
                    label="단말 구분" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select> 
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="모델명"
              v-model="param.model_name"
              placeholder=" ">
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              label="제품코드"
              v-model="param.product_code"
              placeholder=" ">
            </v-text-field>
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
            items:[
                {state:'전체', abbr:'All'},
                {state:'CAM', abbr:'CAM'},
                {state:'GIB', abbr:'GIB'},
                {state:'IOT', abbr:'IOT'},
                {state:'SENSOR', abbr:'SENSOR'},
            ],
            selected:'All'
        }
    },

  methods: {
    searchMethod: function () {
      if(this.selected=='All'){
          this.param.dev_type=''
      }else{
          this.param.dev_type=this.selected
      }
      this.$emit("search", this.param);
    }
  },
};  
</script>
<style>
</style>