<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>희망처리일자 : </th>
        <td><input type="date" v-model="param.approveHopeDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.approveHopeDateEnd" placeholder="승인날자"></td>
        <th>사용자명 : </th>
        <td><input type="text" v-model="param.usrName" placeholder="사용자명"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>
        <th>상태 : </th>
        <td><input type="text" v-model="param.status" placeholder="상태"></td>      
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
                approveHopeDateStart: '',
                approveHopeDateEnd: '',
                usrName: '',
                usrID: '',
                status: ''
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