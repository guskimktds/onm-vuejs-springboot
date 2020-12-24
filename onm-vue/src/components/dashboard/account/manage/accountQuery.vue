<template>
    <div>
        <div>
            <input type="text" v-model="param.id" placeholder="사번">
            <input type="text" v-model="param.name" placeholder="이름">
            <input type="text" v-model="param.auth" placeholder="권한">
            <button v-on:click="searchMethod">검색</button>
        </div>
        <!-- <button v-on:click="registUser">등록</button> -->
        <button id="show-modal" @click="showModal = true">등록</button>
        <app-my-modal
            v-if="showModal" @close="showModal = false">
            <!-- <div>
                This is modal body
            </div> -->
            <h3 slot="header">{{ modalTitle }}</h3>
        </app-my-modal>
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

</style>