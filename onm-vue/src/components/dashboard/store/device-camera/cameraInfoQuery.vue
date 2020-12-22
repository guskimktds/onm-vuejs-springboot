<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>개통일시 : </th>
        <td><input type="date" v-model="param.openDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.openDateEnd" placeholder="승인날자"></td>
        <th>카메라 ID : </th>
        <td><input type="text" v-model="param.camId" placeholder="카메라 ID"></td>
      </tr> 
      <tr> 
        <th>카메라명 : </th>
        <td><input type="text" v-model="param.camName" placeholder="카메라명"></td>
        <th>MAC ID : </th>
        <td><input type="text" v-model="param.macId" placeholder="MAC ID"></td>      
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
                openDateStart: '',
                openDateEnd: '',
                camId: '',
                camName: '',
                macId: ''
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