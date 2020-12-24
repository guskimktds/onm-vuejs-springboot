<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
       <th>등록일자 : </th>
        <td><input type="date" v-model="param.registerDateStart" placeholder="등록일자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.registerDateEnd" placeholder="등록일자"></td>
        <th>오더 번호 : </th>
        <td><input type="text" v-model="param.orderNumber" placeholder="오더번호"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrId" placeholder="사용자 ID"></td>   
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
                usrId: ''
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