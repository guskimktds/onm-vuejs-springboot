<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>계약ID : </th>
        <td><input type="text" v-model="param.contractId" placeholder="계약ID"></td>   
        <th>거래고유번호 : </th>
        <td><input type="text" v-model="param.tranId" placeholder="거래고유번호"></td>   
      </tr> 
      <tr> 
        <th>서비스번호 : </th>
        <td><input type="text" v-model="param.servicNum" placeholder="서비스번호"></td>   
        <th>KTT계약ID : </th>
        <td><input type="text" v-model="param.kttContractId" placeholder="KTT계약ID"></td> 
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
                tranId: '',
                servicNum: '',
                kttContractId: '',
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