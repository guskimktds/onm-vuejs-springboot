<template>
   <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="deviceList"
          class="elevation-1"
        >        
          
        </v-data-table>

      </div>
      
    </v-app>
  </div>
</template>

<script>

export default {
    props: ['deviceList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '이전일련번호',
            align: 'start',
            sortable: false,
            value: 'codeClass',
          },
          { 
            text: '이전 디바이스ID', 
            value: 'code',
          },
          { 
            text: '장치ID', 
            value: 'name',
          },
          { text: '단말종류', value: 'type' },
          { text: '진행상태코드', value: 'desc' },
          { text: '상태코드', value: 'orderby' },
          { text: '고객이전 전 상태코드', value: 'useYn' },
          { text: '등록일', value: 'createDate' },
          { text: '수정일', value: 'updateDate' }
        ]
      }
    }
    

}
</script>

<style scoped>
</style>>
