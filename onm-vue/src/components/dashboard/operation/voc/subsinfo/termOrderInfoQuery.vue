<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="SubsInfo [청약오더, 단말오더]정보 조회"
            class="px-5 py-3"
        >
        <v-row>
            <v-col cols="3">
                <v-text-field 
                    label="계약아이디" 
                    v-model="param.said"
                    placeholder=" " 
                >                        
                </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select 
                    label="보이는 페이지수" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="pgcnt" 
                >                        
                </v-select>
            </v-col>
            <v-col cols="2">
                <v-switch
                    v-model="param.is_masking"                    
                    :label="`마스킹 해제`"
                    color="secondary"
                ></v-switch>
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
            items:[
                {state: '10', pgcnt:'10'},
                {state: '30', pgcnt:'30'},
                {state: '50', pgcnt:'50'},
                {state: '100', pgcnt:'100'}
            ],
            selected:'50'
        }
    },
    methods: {
        searchMethod: function() {
            this.param.view_cnt=this.selected
            this.$emit('search', this.param)
        }
    }, 
}
</script>
<style>

</style>