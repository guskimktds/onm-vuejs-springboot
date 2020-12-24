<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.addDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.addDateEnd" placeholder="승인날자"></td>
        <th>단말 GWID : </th>
        <td><input type="text" v-model="param.deviceGWID" placeholder="단말 GWID"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrId" placeholder="사용자 ID"></td>
        <th>센서 이름 : </th>
        <td><input type="text" v-model="param.sensorName" placeholder="센서 이름"></td>      
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
                addDateStart: '',
                addDateEnd: '',
                deviceGWID: '',
                usrId: '',
                sensorName: ''
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