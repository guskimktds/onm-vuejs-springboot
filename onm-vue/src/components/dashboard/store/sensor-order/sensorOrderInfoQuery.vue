<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr> 
        <th>센서 ID : </th>
        <td><input type="text" v-model="param.sensorId" placeholder="센서 ID "></td>  
        <th>상태 코드 : </th>
        <td><input type="text" v-model="param.statusCode" placeholder="상태 코드"></td>  
      </tr>
      <tr>
        <th>센서 제품명 : </th>
        <td><input type="text" v-model="param.sensorName" placeholder="센서 제품명"></td>  
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table>


    </div>
</template>
<script>
export default {
    data() {
        return{
            param: {
                sensorId: '',
                statusCode:'',
                sensorName:''
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