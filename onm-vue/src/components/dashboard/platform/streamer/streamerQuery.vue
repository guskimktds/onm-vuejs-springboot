<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="스트리머 설정현황 조회"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols=auto>
                    <v-select 
                        item-text="text" 
                        item-value="value" 
                        :items="localGwOptions" 
                        v-model="param.local_gw_id" 
                        v-on:change="searchMethod"
                        ></v-select>
                </v-col>
            </v-row>

        </base-material-card>
    </v-container>
</template>

<script>

export default {
    
    data() {
        return{
            param: {
                local_gw_id: 'D', 
                page_no:1,
                view_cnt:50
            },
            showModal: false,
            modalTitle: '스트리머 등록',
            /*
            localGwOptions:[
                {text:'혜화',   value:'1'},
                {text:'헤화-2', value:'2'},
                {text:'혜화-3', value:'5'},
                {text:'혜화-4', value:'6'},
                {text:'헤화-5', value:'9'},
                {text:'헤화-6', value:'A'},
                {text:'헤화-7', value:'B'},
                {text:'구로-1', value:'3'},
                {text:'구로-2', value:'4'},
                {text:'구로-3', value:'7'},
                {text:'구로-4', value:'8'}
            ]
            */
           localGwOptions:[
                {text:'TB1',   value:'D'},
                {text:'TB2',   value:'E'},
            ]
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
    
</style>