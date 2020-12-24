<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.addDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.addDateEnd" placeholder="승인날자"></td>
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td> 
      </tr> 
      <tr> 
        <th>서비스 번호 : </th>
        <td><input type="text" v-model="param.serviceNum" placeholder="서비스 번호"></td>  
        <th>시스템 ID : </th>
        <td><input type="text" v-model="param.systemId" placeholder="시스템 ID"></td>  
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
                addDateEnd:'',
                usrID:'',
                serviceNum:'',
                systemId:''
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