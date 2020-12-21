<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>요청시간 : </th>
        <td><input type="date" v-model="param.requestTimeStart" placeholder="요청시간"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.requestTimeEnd" placeholder="요청시간"></td>
        <th>발송 전화번호 : </th>
        <td><input type="text" v-model="param.phoneNum" placeholder="전화번호"></td>
      </tr> 
      <tr> 
        <th>OTP 번호 : </th>
        <td><input type="text" v-model="param.otpNum" placeholder="OTP 번호"></td>
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
                requestTimeStart: '',
                requestTimeEnd: '',
                phoneNum: '',
                otpNum: ''
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