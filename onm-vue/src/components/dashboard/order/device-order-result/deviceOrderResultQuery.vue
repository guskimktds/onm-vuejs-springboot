<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>오더처리 통보일시 : </th>
        <td><input type="date" v-model="param.orderAlarmDateStart" placeholder="처리희망일자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.orderAlarmDateEnd" placeholder="처리희망일자"></td>
        <th>오더번호 : </th>
        <td><input type="text" v-model="param.orderNumber" placeholder="오더번호"></td>
      </tr> 
      <tr> 
        <th>거래고유번호 : </th>
        <td><input type="text" v-model="param.tranId" placeholder="거래고유번호"></td>   
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
                orderAlarmDateStart: '',
                orderAlarmDateEnd: '',
                orderNumber: '',
                tranId: '',
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