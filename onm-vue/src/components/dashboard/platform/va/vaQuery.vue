<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>VA IP : </th>
        <td><input></td>
        <th>VA 상태 : </th>
        <td><input></td>
        <td class="buttons"><button v-on:click="this.$emit('search')">검색</button></td>
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