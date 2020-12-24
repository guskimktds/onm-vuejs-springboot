<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>생성일시 : </th>
        <td><input type="date" v-model="param.createDateStart" placeholder="생성일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.createDateEnd" placeholder="생성일시"></td>
        <th>전화번호 : </th>
        <td><input type="text" v-model="param.phoneNumber" placeholder="전화번호"></td>
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
                createDateStart: '',
                createDateEnd: '',
                phoneNumber: '',
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