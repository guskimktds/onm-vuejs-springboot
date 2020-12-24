<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.modifiedDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.modifiedDateEnd" placeholder="승인날자"></td>
        <th>상품이름 : </th>
        <td><input type="text" v-model="param.productName" placeholder="상품이름"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>  
        <th>상품코드 : </th>
        <td><input type="text" v-model="param.productCode" placeholder="상품코드"></td>  
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
                productName: '',
                usrID: '',
                productCode:''
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