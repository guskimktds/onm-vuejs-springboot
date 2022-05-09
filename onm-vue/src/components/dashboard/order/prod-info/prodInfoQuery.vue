<template>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        icon="mdi-magnify"
        title="청약 상품 리스트 조회"
        class="px-5 py-3"
        >
        <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
              
              label="상품번호"
              v-model="param.prod_info_id"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select 
                label="상품출시회사" 
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
                    {state:'KTT', abbr: 'T'},
                ]
        }
    },
    methods: {
        searchMethod: function() {
           if(this.selected=='All'){
            this.param.prod_from=''
            }else{
            this.param.prod_from=this.selected
            }
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
</style>