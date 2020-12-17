<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>승인날짜 : </th>
        <td><input type="date" v-model="param.approveDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.approveDateEnd" placeholder="승인날자"></td>
        <th>사용자명 : </th>
        <td><input type="text" v-model="param.userName" placeholder="사용자명"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.userID" placeholder="사용자 ID"></td>
        <th>전화번호 : </th>
        <td><input type="text" v-model="param.phoneNum" placeholder="전화번호"></td>      
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
                approveDateStart: '',
                approveDateEnd: '',
                userName: '',
                userID: '',
                phoneNum: ''
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