<template>
    <div>


    <!-- search -->
    <table class="search">
        <colgroup>
            <col width="10%"><col width="40%"><col width="10%"><col width="40%">
        </colgroup>
      <tr>
        <th>국사코드 : </th>
        <td><input type="text" v-model="param.local_gw_id" placeholder="국사코드"></td>
        <th>거래고유번호 : </th>
        <td><input type="text" v-model="param.process_status" placeholder="거래고유번호"></td>   
      </tr> 
      <tr> 

        <th>프로세스명 : </th>
        <td colspan="3"><input type="text" v-model="param.process" placeholder="프로세스명"></td>   
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
                local_gw_id: '',
                process_status: '',
                process: ''
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