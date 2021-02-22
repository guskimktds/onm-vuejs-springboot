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

                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="오더번호" 
                        v-model="param.oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="MAC ID" 
                        v-model="param.mac_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="개통 오더번호" 
                        v-model="param.open_oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
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

                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
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
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
    
</style>