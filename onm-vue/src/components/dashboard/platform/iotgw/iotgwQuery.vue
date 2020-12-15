<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr>
        <th>국사코드 : </th>
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