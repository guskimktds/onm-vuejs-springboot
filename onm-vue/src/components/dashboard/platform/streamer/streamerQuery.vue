<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols=auto>
                    <v-select item-text="text" item-value="value" :items="localGwOptions" outlined v-model="param.localGwId">></v-select>
                </v-col>
                <v-col cols="auto">
                    <v-btn 
                        id="show-modal" @click="showModal = true"
                        >
                        추가
                    </v-btn>
                </v-col>
                
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        수정
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        삭제
                    </v-btn>
                </v-col>
                
            </v-row>

            <app-my-modal
                v-if="showModal" @close="showModal = false">            
                <h3 slot="header">{{ modalTitle }}</h3>
            </app-my-modal>
        </v-container>
    </v-form>
</template>
<script>

import modalTemplate from './streamerModal'

export default {
    components:{
        appMyModal: modalTemplate
    },
    data() {
        return{
            param: {
                local_gw_id: '',
                process_status: '',
                process: ''
            },
            showModal: false,
            modalTitle: '스트리머 등록',
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