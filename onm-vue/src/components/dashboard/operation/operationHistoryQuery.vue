<template>
    <div>
        <div>
            <input type="text" v-model="param.id" placeholder="사번">
            <input type="text" v-model="param.name" placeholder="이름">
            <input type="text" v-model="param.auth" placeholder="권한">
            <button v-on:click="searchMethod">검색</button>
        </div>
        
    </div>
</template>
<script>

export default {
    data() {
        return{
            param: {
                id: '',
                name: '',
                auth: ''
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