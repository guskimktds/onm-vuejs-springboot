<template>
    <div>
        <p>검색 화면</p>
        <div>
            <input type="text" v-model="param.number" placeholder="사번">
            <input type="text" v-model="param.name" placeholder="이름">
            <input type="text" v-model="param.permission" placeholder="권한">
            <button v-on:click="searchMethod">검색</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            param: {
                number: '',
                name: '',
                permission: ''
            }
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