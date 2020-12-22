<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>수정일시 : </th>
        <td><input type="date" v-model="param.modifiedDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.modifiedDateEnd" placeholder="승인날자"></td>
        <th>상품번호 : </th>
        <td><input type="text" v-model="param.productCode" placeholder="상품번호"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>  
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
                modifiedDateStart: '',
                modifiedDateEnd: '',
                productCode: '',
                usrID: '',
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