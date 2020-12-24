<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>계약 ID : </th>
        <td><input type="text" v-model="param.contractId" placeholder="계약 ID"></td>
        <th>사용자명 : </th>
        <td><input type="text" v-model="param.usrName" placeholder="사용자명"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>
        <th>사용자 전화번호 : </th>
        <td><input type="text" v-model="param.usrNumber" placeholder="전화번호"></td>      
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
                contractId: '',
                usrName: '',
                usrID: '',
                usrNumber: '',
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