<template>
   <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
        >          
        </v-data-table>
      </div>      
    </v-app>
  </div>
</template>

<script>
export default {
    props: ['pList'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '계약자구분', value: 'contdivcd' },
          { text: '전화번호', value: 'telno' },
          { text: '생성일시', value: 'cdate'}
        ]
      }
   },
   created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>