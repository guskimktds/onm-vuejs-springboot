<template>
    <div>

    <!-- search -->
    <table class="search">
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>  
        <th>VA 명 : </th>
        <td><input type="text" v-model="param.vaName" placeholder="VA 명"></td>  
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
                usrID: '',
                vaName:''
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