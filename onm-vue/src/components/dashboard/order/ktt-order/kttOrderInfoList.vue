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
          { text: '서비스번호', value: 'service_no' },
          { text: '시스템ID', value: 'system_id' },
          { text: '계약ID', value: 'said' },
          { text: 'KTT계약ID', value: 'contract_id'}
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