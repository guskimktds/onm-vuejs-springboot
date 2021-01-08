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

// import EventBus from '../../../../../EventBus';

export default {
    props: ['pList'],
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
          { text: '계약ID', value: 'said'},
          { text: '상품코드', value: 'pprodcd'},
          { text: '기가아이즈 모상품명', value: 'pprodnm'},
          { text: '사업자명', value: 'bizpnm'},
        //   { text: '오더유형', value: 'type' },
          { text: '오더번호', value: 'oderno' },
          { text: '오더순번', value: 'oderseq' },
        //   { text: '변경유형코드', value: 'useYn' },
          { text: '처리희망일자', value: 'appointdate' },
          { text: '사용여부', value: 'use_yn' },
          { text: '생성일시', value: 'cdate' }
        ]
      }
    }

}


</script>
<style>
    
</style>