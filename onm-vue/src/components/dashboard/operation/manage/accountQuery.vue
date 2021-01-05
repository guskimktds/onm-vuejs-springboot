<template>
    <div>
        <!-- <div>
            <input type="text" v-model="param.id" placeholder="사번">
            <input type="text" v-model="param.name" placeholder="이름">
            <input type="text" v-model="param.auth" placeholder="권한">
            <button v-on:click="searchMethod">검색</button>
        </div>
        <button id="show-modal" @click="showModal = true">등록</button>
        <app-my-modal
            v-if="showModal" @close="showModal = false">            
            <h3 slot="header">{{ modalTitle }}</h3>
        </app-my-modal> -->
        <v-form>
            <v-container>
                <v-row >
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field dense label="사번" v-model="param.id" placeholder="Placeholder" solo>                        
                        </v-text-field>
                    </v-col>         
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field dense label="이름" v-model="param.name" placeholder="Placeholder" solo>                        
                        </v-text-field>
                    </v-col> 
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field dense label="권한" v-model="param.auth" placeholder="Placeholder" solo>                        
                        </v-text-field>
                    </v-col>
                    <v-col cols="auto" >
                        <v-btn 
                            v-on:click="searchMethod"
                            >
                            검색
                        </v-btn>
                    </v-col>  
                    <v-col cols="auto">
                        <v-btn 
                         id="show-modal" @click="showModal = true"
                         >
                            등록
                        </v-btn>
                    </v-col>                                    
                </v-row>
                <app-my-modal
                    v-if="showModal" @close="showModal = false">            
                    <h3 slot="header">{{ modalTitle }}</h3>
                </app-my-modal>
            </v-container>
        </v-form>
    </div>
</template>
<script>

import modalTemplate from './signUpModal'
// Vue.component('modal', {
//   template: '#modal-template'
// })

export default {
    components:{
        appMyModal: modalTemplate
    },
    data() {
        return{
            param: {
                id: '',
                name: '',
                auth: ''
            },
            showModal: false,
            //visible: false,
            modalTitle: '계정등록'

        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
        registUser: function() {
            console.log("사용자 등록 화면으로 이동한다. -> 완료 또는 취소되면 이전화면으로 이동")
        },
        handleClickButton(){
            this.visible = !this.visible
        } 
    },  
}
</script>
<style>
v-btn {
    margin: auto;
}
</style>