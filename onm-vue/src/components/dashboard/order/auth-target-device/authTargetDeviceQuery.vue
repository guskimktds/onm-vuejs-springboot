<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="인증 대상 단말 조회"
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
                        label="계약 ID" 
                        v-model="param.said"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        label="오더번호" 
                        v-model="param.oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                </v-col>
                <v-col cols="3">
                    <v-text-field 
                        label="MAC ID" 
                        v-model="param.mac_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        label="개통 오더번호" 
                        v-model="param.open_oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>

                <v-col cols="1">
                </v-col>

                <v-col cols="3">
                    <v-select
                            label="관리상태코드" 
                            v-model="selected"
                            :items="items"
                            item-text="state"
                            item-value="abbr"
                    ></v-select>
                </v-col>
                
                <v-col cols="1">
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
                <!-- <v-col cols="1">
                </v-col> -->

                <v-col cols="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹 해제`"
                        color="secondary"
                    ></v-switch>
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
          selected:'All',
          items:[
              {state: '전체'     , abbr: 'All'},
              {state: '정상'     , abbr: 'S'},
              {state: '삭제'     , abbr: 'D'},
              {state: '삭제대기' , abbr: 'X'},
              {state: '등록'     , abbr: 'A'}]
      }
  },
  methods: {
      searchMethod: function () {
      if(this.selected=='All'){
        this.param.mgt_status=''
      }else{
      this.param.mgt_status=this.selected
      }
      this.$emit("search", this.param);
    },
  },
};
//     searchMethod: function () {
//       this.$emit("search", this.param);
//     },
//   },
// };
</script>
<style>
    
</style>