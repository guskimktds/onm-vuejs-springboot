<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>로그인 일시 : </th>
        <td><input type="date" v-model="param.loginDateStart" placeholder="로그인"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.loginDateEnd" placeholder="로그인"></td>
        <th>전화번호 ID : </th>
        <td><input type="text" v-model="param.phoneNumId" placeholder="전화번호 ID"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrId" placeholder="사용자 ID"></td>
        <th>OS 타입 : </th>
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
                phoneNumId: '',
                usrId: '',
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