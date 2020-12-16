<template>
    <div>
        <p>검색 화면</p>
        <div>
            <input type="text" v-model="param.vscode" placeholder="국사코드">
            <input type="text" v-model="param.processType" placeholder="프로세스타입">
            <input type="text" v-model="param.processName" placeholder="프로세스명">
            <button v-on:click="searchMethod">검색</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            param: {
                vscode: '',
                processType: '',
                processName: ''
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