<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>로그인 일시 : </th>
        <td><input type="date" v-model="param.expireDateStart" placeholder="로그인 일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.expireDateEnd" placeholder="로그인 일시"></td>
        <th>로그인 ID : </th>
        <td><input type="text" v-model="param.loginID" placeholder="로그인 ID"></td>
      </tr> 
      <tr> 
        <th>로그아웃 일시 : </th>
        <td><input type="date" v-model="param.logoutDateStart" placeholder="로그아웃 일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.logoutDateEnd" placeholder="로그아웃 일시"></td>
        <th>OS타입 : </th>
        <select v-model="param.osType">
            <option disabled value="">선택해주세요</option>
            <option>PC</option>
            <option>iOS</option>
            <option>Android</option>
        </select>
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
                loginDateStart: '',
                loginDateEnd: '',
                loginID: '',
                logoutDateStart: '',
                logoutDateEnd: '',
                osType: ''
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