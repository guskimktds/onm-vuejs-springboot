<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>만료일 : </th>
        <td><input type="date" v-model="param.expireDateStart" placeholder="만료일"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.expireDateEnd" placeholder="만료일"></td>
        <th>전화변호 : </th>
        <td><input type="text" v-model="param.phoneNum" placeholder="전화변호"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.userID" placeholder="사용자 ID"></td>
        <th>장치타입 : </th>
        <select v-model="param.deviceType">
            <option disabled value="">선택해주세요</option>
            <option>PC</option>
            <option>iPhone</option>
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
                expireDateStart: '',
                expireDateEnd: '',
                phoneNum: '',
                userID: '',
                deviceType: ''
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