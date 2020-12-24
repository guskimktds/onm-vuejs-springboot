<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>개통일시 : </th>
        <td><input type="date" v-model="param.openDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.openDateEnd" placeholder="승인날자"></td>
        <th>단말 GWID : </th>
        <td><input type="text" v-model="param.deviceGWID" placeholder="단말 GWID"></td>
      </tr> 
      <tr> 
        <th>단말GW명 : </th>
        <td><input type="text" v-model="param.gwName" placeholder="단말GW명"></td>
        <th>단말모델코드 : </th>
        <td><input type="text" v-model="param.modelCode" placeholder="단말모델코드"></td>      
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
                deviceGWID: '',
                gwName: '',
                modelCode: ''
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