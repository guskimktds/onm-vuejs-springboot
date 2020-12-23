<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.registerDateStart" placeholder="등록일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.registerDateEnd" placeholder="등록일시"></td>
        <th>오더번호 : </th>
        <td><input type="text" v-model="param.orderNumber" placeholder="오더번호"></td>
      </tr> 
      <tr> 
        <th>MAC ID : </th>
        <td><input type="text" v-model="param.macId" placeholder="MAC ID"></td>
        <th>개통 오더번호 : </th>
        <td><input type="text" v-model="param.openOrderNum" placeholder="개통 오더번호"></td>     
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
                orderNumber: '',
                macId: '',
                openOrderNum: ''
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