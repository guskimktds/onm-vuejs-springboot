<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.registerDateStart" placeholder="등록일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.registerDateEnd" placeholder="등록일시"></td>
        <th>계약 ID : </th>
        <td><input type="text" v-model="param.contractId" placeholder="계약 ID"></td>
      </tr> 
      <tr> 
        <th>거래고유번호 : </th>
        <td><input type="text" v-model="param.tranId" placeholder="거래고유번호"></td>   
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
                registerDateStart: '',
                registerDateEnd: '',
                contractId: '',
                tranId: '',
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