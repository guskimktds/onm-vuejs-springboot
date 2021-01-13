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
            text: '계약ID', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '오더유형', value: 'pprodcd' },
          { text: '처리코드', value: 'pprodnm' },
          { text: '처리메세지', value: 'ordertype' },
          { text: '등록일시', value: 'cdate'},
          { text: '청약상태 통보여부', value: 'bizpnm'},
          { text: '청약상태 통보일시', value: 'oderno' },
          { text: '청약상태 통보결과', value: 'oderseq' }
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