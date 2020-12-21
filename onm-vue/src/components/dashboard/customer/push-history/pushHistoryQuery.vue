<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>알림시간 : </th>
        <td><input type="date" v-model="param.alarmStartTime" placeholder="로그인"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.alarmEndTime" placeholder="로그인"></td>
        <th>알림 ID : </th>
        <td><input type="text" v-model="param.alarmId" placeholder="전화번호 ID"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrId" placeholder="사용자 ID"></td>
        <th>카메라 ID : </th>
        <td><input type="text" v-model="param.camId" placeholder="사용자 ID"></td>   
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
                alarmStartTime: '',
                alarmEndTime: '',
                alarmId: '',
                usrId: '',
                camId: ''
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