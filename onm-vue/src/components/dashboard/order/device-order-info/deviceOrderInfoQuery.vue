<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>처리희망일자 : </th>
        <td><input type="date" v-model="param.hopeDateStart" placeholder="처리희망일자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.hopeDateEnd" placeholder="처리희망일자"></td>
        <th>오더번호 : </th>
        <td><input type="text" v-model="param.orderNumber" placeholder="오더번호"></td>
      </tr> 
      <tr> 
        <th>거래고유번호 : </th>
        <td><input type="text" v-model="param.tranId" placeholder="거래고유번호"></td>   
        <th>계약ID : </th>
        <td><input type="text" v-model="param.contractId" placeholder="계약ID"></td>   
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
                hopeDateStart: '',
                hopeDateEnd: '',
                orderNumber: '',
                tranId: '',
                contractId: ''
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