<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>검색기간 : </th>
        <td><input> ~ <input></td>
        <th>국사코드 : </th>
        <td colspan="2"><input></td>
      </tr>
      <tr>
        <th>프로세스 : </th>
        <td><input></td>
        <th>상태 : </th>
        <td><input></td>
        <td class="buttons" style="" ><button v-on:click="this.$emit('search')">검색</button></td>
      </tr>
    </table>


    </div>
</template>
<script>
export default {
    // methods: {
    //     search: function() {
    //         this.$emit('search')
    //     }
    // },  
}
</script>
<style>
    
</style>